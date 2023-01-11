// THIS FILE IS FOR HELPER FUNCTIONS

const roundToNearestQuarter = (rating) => {
  const intRating = Math.round(rating * 100) // Integer rating from 0 - 500
  const quarters = Math.floor(intRating / 25);
  const remainder = intRating % 25;
  return remainder >= 13 ? (quarters + 1) * 0.25 : quarters * 0.25;
}
const getOutfitListInCookie = () => {
  //cookie name is 'outfitList' which is defined in addOutfitListToCookie function
  const strCookie = "; " + document.cookie;
  const searchPart = strCookie.split("; outfitList=");
  // if has cookie_name
  try {
    if (searchPart.length === 2) {
      // return the first found of cookie_name 's value and parse it to JS
      return JSON.parse(searchPart.pop().split(';').shift());
    } else {
      return undefined;
    }
  } catch (err) {
    console.log("cookie error", err);
  }
}
const addOutfitListToCookie = (id) => {
  //this is the case when customer delete 1 product and want to set new array into cookie
  if (Array.isArray(id)) {
    var idList = id;
  } else {
    const outfitList = getOutfitListInCookie('outfitList');
    //not exist, create a list
    if (outfitList === undefined) {
      var idList = [id];
    } else {
      //if duplicated, do not add this id
      for (var i = 0; i < outfitList.length; i ++) {
        if (outfitList[i] === id) {
          //for testing
          console.log('product has already existed');
          return;
        }
      }
      // new id, add it into outfitList
      var idList = [...outfitList, id];
    }
  }
  let strList = JSON.stringify(idList);
  //set expire date from now to 30days later
  let date = new Date();
  date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
  const expireDate = date.toUTCString();
  //save outfitList into cookie, now it is an empty array
  document.cookie = `outfitList=${strList}; expires=${expireDate};`;

}

const deleteOutfitIdInCookie = (id) => {
  console.log('deleteid', id)
  let outfitList = getOutfitListInCookie();
  let index = outfitList.indexOf(id);
  outfitList.splice(index, 1);
  addOutfitListToCookie(outfitList);
  return outfitList;
}

const getSizeInfoForStyle = (style) => {
  let sizeInfo = {};
  for (const sku in style.skus) {
    const skuInfo = style.skus[sku];
    sizeInfo[skuInfo.size] = { sku, quantity: skuInfo.quantity }
  }
  return sizeInfo;
}

module.exports = {
  roundToNearestQuarter,
  getOutfitListInCookie,
  addOutfitListToCookie,
  deleteOutfitIdInCookie,
  getSizeInfoForStyle
};