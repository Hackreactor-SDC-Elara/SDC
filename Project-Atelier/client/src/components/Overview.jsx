import React from 'react';
import axios from 'axios';

import AddToCart from './overview/AddToCart.jsx';
import ImageGallery from './overview/ImageGallery.jsx';
import ProductInfo from './overview/ProductInfo.jsx';
import StyleSelector from './overview/StyleSelector.jsx';
import ProductOverview from './overview/ProductOverview.jsx';

import { getSizeInfoForStyle } from '../../../helpers/helpers.js'

export default class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_info: {},
      product_styles: [],
      currentStyle: {},
      product_rating: 0,
      imageGalleryView: 'default', // 'default' or 'expanded'
      currentImageIndex: 0
    };
    this.getProductInfo = this.getProductInfo.bind(this);
    this.getProductStyles = this.getProductStyles.bind(this);
    this.changeCurrentStyle = this.changeCurrentStyle.bind(this);
    this.getProductRating = this.getProductRating.bind(this);
    // this._getSizeInfoForStyle = this._getSizeInfoForStyle.bind(this);
    this.toggleImageGalleryView = this.toggleImageGalleryView.bind(this);
    this.changeCurrentImageIndex = this.changeCurrentImageIndex.bind(this);
  }

  getProductInfo(id) {
    axios.get(`/products/${id}`)
    .then(response => this.setState({ product_info: response.data }))
    .catch(err => console.log(`unable to retrieve product info for product with id ${id}`, err));
  }

  getProductStyles(id) {
    axios.get(`/products/${id}/styles`)
    .then(response => {
      let currentStyle = response.data.results.find(style => style['default?'] === true) || response.data.results[0];
      this.setState({ product_styles: response.data.results, currentStyle });
    })
    .catch(err => console.log(`unable to retrieve product styles for product with id ${id}`, err));
  }

  getProductRating(id) {
    axios.get(`/reviews/meta?product_id=${id}`)
    .then(response => {
      let total = 0;
      let count = 0;
      for (const [key, value] of Object.entries(response.data.ratings)) {
        count += parseInt(value);
        total += parseInt(key) * parseInt(value);
      }
      const average = total / count;
      this.setState({ product_rating: average });
    })
    .catch(err => console.log(`unable to retrieve rating for product with id ${id}`, err));
  }

  changeCurrentStyle(style) {
    this.setState({ currentStyle: style, currentImageIndex: 0 });
  }

  changeCurrentImageIndex(index) {
    this.setState({ currentImageIndex: index });
  }

  componentDidMount() {
    this.getProductInfo(parseInt(this.props.productId));
    this.getProductStyles(this.props.productId);
    this.getProductRating(this.props.productId);
  }

  toggleImageGalleryView() {
    let imageGalleryView = this.state.imageGalleryView === 'default' ? 'expanded' : 'default';
    this.setState({ imageGalleryView });
  }

  // _getSizeInfoForStyle(style) {
  //   let sizeInfo = {};
  //   for (const sku in style.skus) {
  //     const skuInfo = style.skus[sku];
  //     sizeInfo[skuInfo.size] = { sku, quantity: skuInfo.quantity }
  //   }
  //   return sizeInfo;
  // }

  render() {
    const sizeInfo = getSizeInfoForStyle(this.state.currentStyle);
    let expandedView = this.state.imageGalleryView === 'default' ? '' : ' expanded-view';
    let collapsedSideBar = this.state.imageGalleryView === 'default' ? '' : ' collapsed-sidebar';
    return (
      <div className={`overview-container${expandedView}`}>
        <ImageGallery
          currentStyle={this.state.currentStyle}
          toggleView={this.toggleImageGalleryView}
          currentImageIndex={this.state.currentImageIndex}
          changeCurrentImageIndex={this.changeCurrentImageIndex}
        />
        <div className={`user-selection-bar${collapsedSideBar}`}>
          <ProductInfo product_info={this.state.product_info} rating={this.state.product_rating} />
          <StyleSelector
            styles={this.state.product_styles}
            currentStyle={this.state.currentStyle}
            changeCurrentStyle={this.changeCurrentStyle}
          />
          <AddToCart
            currentStyle={this.state.currentStyle}
            sizeInfo={sizeInfo}
            addToCart={this.props.addToCart}
            inOutfit={this.props.inOutfit}
            addToCart={this.props.addToCart}
            addToOutfit={() => this.props.addToOutfit(this.props.productId)}
            removeFromOutfit={() => this.props.removeFromOutfit(this.props.productId)}
          />
        </div>
        <ProductOverview product_info={this.state.product_info} />
      </div>
    );
  }
}