const axios = require('axios');
const {roundToNearestQuarter} = require('../helpers/helpers.js');

const fetchCategoryNameAndFeatures = async (id, options) => {

  try {
    const response = await axios(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}`, options);
    const partalData = {
      id : response.data.id,
      category : response.data.category,
      name : response.data.name,
      features : response.data.features
    }
    return partalData;
  } catch (err) {
    console.log('Fetch Category, Name And Features ERROR', err);
  }
}

 //getDefault function: find the default parameter which is the required image and price
 const getDefaultPirceAndImage = (arr) => {
  // in case no default parameter
  var priceAndImgObj = {
    default_price : arr[0]['original_price'],
    discount_price : arr[0]['sale_price'],
    img : arr[0]['photos'][0]['url'] ? arr[0]['photos'][0]['url'] : 'https://cdn.pixabay.com/photo/2015/01/21/13/21/sale-606687__340.png'
  };
  for (var i = 0; i < arr.length; i ++) {
    if (arr[i]['default?'] === true) {
      priceAndImgObj = {
        default_price : arr[i]['original_price'],
        discount_price : arr[i]['sale_price'],
        img : arr[i]['photos'][0]['url'] ? arr[i]['photos'][0]['url'] : 'https://cdn.pixabay.com/photo/2015/01/21/13/21/sale-606687__340.png'
      };
      break;
    }
  }
  return priceAndImgObj;
};

const fetchPriceAndImage = async (id, options)=> {
  try {
    const response = await axios(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}/styles`, options);
    const results = response.data.results;
    const priceAndImage = getDefaultPirceAndImage(results);
    return priceAndImage;
  } catch (err) {
    console.log('Fetch Price And Image ERROR', err);
  };
}
var getAvgRate = (rates) => {
  var totalRates = 0;
  var totalCounts = 0;
  var avgRealRate = 0;
  for (var key in rates) {
    totalRates += key * rates[key];
    totalCounts += rates[key] * 1;
  }
  if (totalCounts === 0) {
    avgRealRate = 0;
  } else {
    avgRealRate = totalRates / totalCounts;
  }
 return avgRealRate;
};

const fetchRates = async (id, options) => {
  try {
    const response = await axios(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta?product_id=${id}`, options);
    var rates = response.data.ratings;
    var avgRate = getAvgRate(rates);
    //use helper function roundToNearestQuarter make QuarterNumber
    var rate = roundToNearestQuarter(avgRate);
    return {rate};
  } catch (err) {
    console.log('Fetch Rates And Change to use ERROR', err);
  };
}

const relatedItems = async (req, res) => {
  const options = {
    method: req.method,
    headers: { Authorization: req.headers.Authorization }
  };
  //related products array
  let relatedProductsId = JSON.parse(req.url.split('=').pop());


  const relatedProducts = await Promise.all(relatedProductsId.map(async (id) => {
    const product = await Promise.all(
      [
        fetchCategoryNameAndFeatures(id, options),
        fetchPriceAndImage(id, options),
        fetchRates(id, options)
      ]
    );
    var singleCard = {
      id: 0,
      category : 'CATEGORY',
      name : 'NAME',
      features: [],
      default_price: 0,
      //if discount_price is null or zero means there's no discount
      discount_price: null,
      //default url image used to test
      img: 'https://cdn.pixabay.com/photo/2015/01/21/13/21/sale-606687__340.png',
      rate: 0
    }

    product.forEach((item) => {
      singleCard = {...singleCard, ...item};
    });

    return singleCard;
  }));
  res.send(relatedProducts);
}
module.exports = relatedItems;