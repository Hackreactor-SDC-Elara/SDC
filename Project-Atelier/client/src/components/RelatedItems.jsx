import React from 'react';
import axios from 'axios';

import RelatedProductsList from './relatedItems/RelatedProductsList.jsx';
import OutfitList from './relatedItems/OutfitList.jsx';

export default class RelatedItems extends React.Component {
  constructor(props) {
    //suppose each product will be loaded with `?id=${givenNumber}` in the url
    super(props);
    this.state = {
      currentProductFeature : [],
      currentProductName: '',
      relatedProductsData :[],
      outfitProductsData: []
    }

    this.getRelatedItemsId = this.getRelatedItemsId.bind(this);
    this.getCurrentProductFeature = this.getCurrentProductFeature.bind(this);
    this. getOutfitProductsData = this. getOutfitProductsData.bind(this);

  }
  componentDidMount() {
    this.getRelatedItemsId();
    this.getCurrentProductFeature();
    this.getOutfitProductsData();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.outfit !== this.props.outfit) {
      console.log('outfit', this.props.outfit)
      this.getOutfitProductsData();
    }
  }
  getRelatedItemsId() {
    axios({
      method : 'get',
      url : `/products/${this.props.productId}/related`,
    })
    .then((response) => {
      //fetch related products data
      let parameter = JSON.stringify(response.data);
      axios({
        method: 'get',
        url : `/related?relatedProductsId=${parameter}`
      })
      .then((res) => {
        this.setState({
          relatedProductsData: res.data
        });
      })
    })
    .catch((err) => {
      console.log('Get Related Items ID ERROR', err);
    });
  }
  getOutfitProductsData() {

    let parameter = this.props.outfit.map((str) => {
      return parseInt(str);
    })
    parameter = JSON.stringify(parameter);
    axios({
      method: 'get',
      url : `/related?relatedProductsId=${parameter}`
    })
    .then((res) => {
      this.setState({
        outfitProductsData: res.data
      });
    })
    .catch((err) => {
      console.log('Get Outfit Items ERROR', err);
    })

  }
  getCurrentProductFeature() {
    axios({
      method: 'get',
      url: `/products/${this.props.productId}`,
    })
    .then((response) => {
      this.setState({
        currentProductFeature : response.data.features,
        currentProductName: response.data.name
      });
    })
    .catch((err) => {
      console.log('Get Current Product Feature ERROR', err);
    });
  }
  render() {
    return (
      <>
        <RelatedProductsList
        currentProductFeature={this.state.currentProductFeature}
        currentProductName={this.state.currentProductName}
        relatedProductsData={this.state.relatedProductsData}/>

        <OutfitList
        productId={this.props.productId}
        outfitProductsData={this.state.outfitProductsData}
        addToOutfit={this.props.addToOutfit}
        removeFromOutfit={this.props.removeFromOutfit}/>
      </>

    )
  }
}