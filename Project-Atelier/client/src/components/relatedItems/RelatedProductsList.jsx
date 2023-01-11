import React from 'react';
import axios from 'axios';
import SingleCard from './SingleCard.jsx';

export default class RelatedProductsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: 'star',
      arrowLeft: false,
      arrowRight:true
    };
    this.keyCount = 0;
    this.getKey = this.getKey.bind(this);

    this.slider = React.createRef();
    this.goLeft = this.goLeft.bind(this);
    this.goRight = this.goRight.bind(this);

  }

  getKey () {
    return this.keyCount++;
  }

  goLeft() {
    //each card width is 208px, each time move 1 card
    this.slider.current.scrollLeft += 0.25 * this.slider.current.offsetWidth;
    this.setState({arrowLeft: true});
  }
  goRight() {
    this.slider.current.scrollLeft -= 0.25 * this.slider.current.offsetWidth;
    if (this.slider.current.scrollLeft === 0) {
      this.setState({arrowLeft: false})
    }

  }

  render() {

    return (
      <div className= "products-list">
        <h2>RELATED PRODUCTS</h2>
        <div className="related-carousel">
          <button style={this.state.arrowLeft ? {"visibility":"visible"} : {"visibility":"hidden"}} onClick={this.goRight}>
            <h1>&#8249;</h1>
          </button >
          <div className="related-container" ref={this.slider} >
            {this.props.relatedProductsData.map((product) => (
              <SingleCard key={this.getKey()}
              id= {product.id}
              productData={product}
              icon={this.state.icon}
              currentProductFeature={this.props.currentProductFeature}
              currentProductName={this.props.currentProductName} />
            ))}
          </div>
          <button style={this.state.arrowRight ? {"visibility":"visible"} : {"visibility":"hidden"}} onClick={this.goLeft}>
            <h1>&#8250;</h1>
          </button>
        </div>

        {/* this div is used to contain Modal component. By default, it's empty, when customer click star icon, it will wrap modal component into it */}
        <div className="modal-container"></div>

      </div>
    )
  }
}