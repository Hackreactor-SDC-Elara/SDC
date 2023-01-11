import React from 'react';

import SizeSelector from './SizeSelector.jsx';
import QuantitySelector from './QuantitySelector.jsx';
import ClickableStar from './ClickableStar.jsx';

export default class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_sku: '',
      current_size: '',
      current_quantity: 0
    }
    this.selectSize = this.selectSize.bind(this);
    this.selectQuantity = this.selectQuantity.bind(this);
  }

  selectSize(size) {
    console.log(`selecting size: ${size}`);
    if (size === 'Select Size') {
      this.setState({
        current_sku: '',
        current_size: '',
        current_quantity: 0
      });
    } else {
      let current_quantity = this.state.current_quantity || 1;
      if (current_quantity > this.props.sizeInfo[size].quantity) {
        current_quantity = this.props.sizeInfo[size].quantity;
      }
      this.setState({
        current_sku: this.props.sizeInfo[size].sku,
        current_size: size,
        current_quantity
      });
    }
  }

  selectQuantity(qty) {
    if (this.state.current_size) {
      console.log(`selecting quantity: ${qty}`);
      this.setState({ current_quantity: qty })
    }
  }

  render() {
    const sizeOptions = Object.keys(this.props.sizeInfo);
    let maxQuantity = this.state.current_sku ? this.props.currentStyle.skus[this.state.current_sku].quantity : 0;
    maxQuantity = maxQuantity <= 15 ? maxQuantity : 15;
    let disableCart = !(this.state.current_sku && this.state.current_size);
    return (
      <div className="add-to-cart">
        <SizeSelector sizeOptions={sizeOptions} selectSize={this.selectSize} />
        <QuantitySelector
          maxQuantity={maxQuantity}
          currentQuantity={this.state.current_quantity}
          selectQuantity={this.selectQuantity}
        />
        <button
          className="add-to-cart-button"
          onClick={() => this.props.addToCart(this.state.current_sku, this.state.current_quantity)}
          disabled={disableCart}>ADD TO CART
          </button>
        <ClickableStar
          inOutfit={this.props.inOutfit}
          addToOutfit={this.props.addToOutfit}
          removeFromOutfit={this.props.removeFromOutfit}
        />
      </div>
    );
  }
}