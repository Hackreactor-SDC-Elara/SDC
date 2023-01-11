import React from 'react';
import SingleCard from './SingleCard.jsx';

export default class OutfitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: 'delete',
      // need to optimize(both list use carousel)
      arrowLeft: false,
      arrowRight: true
    }
    this.keyCount = 0;
    this.getKey = this.getKey.bind(this);

    // need to optimize(both list use carousel)
    this.slider = React.createRef();
    this.goLeft = this.goLeft.bind(this);
    this.goRight = this.goRight.bind(this);
  }
  getKey () {
    return this.keyCount++;
  }
   // need to optimize(both list use carousel)
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
      <div className="products-list">
        <h2>YOUR OUTFIT</h2>
        <div className="related-carousel">

          <button style={this.state.arrowLeft ? {"visibility":"visible"} : {"visibility":"hidden"}} onClick={this.goRight}>
            <h1>&#8249;</h1>
          </button >
            <div className="add-outfit" onClick={() => {this.props.addToOutfit(this.props.productId)}}>
             <h1>Add to Outfit</h1>
             <button className="add-button" ><span>&#43;</span></button>
            </div>
          <div className="related-container" ref={this.slider}>


              {(this.props.outfitProductsData !== undefined) ?
              this.props.outfitProductsData.map((product) => (
                <SingleCard icon={this.state.icon} productData={product} key={this.getKey()} handleDelete={(clickedId) =>{this.props.removeFromOutfit(clickedId)}}/>
              ))
              : null}

          </div>
          <button style={this.state.arrowRight ? {"visibility":"visible"} : {"visibility":"hidden"}} onClick={this.goLeft}>
            <h1>&#8250;</h1>
          </button>
        </div>
      </div>
    )
  }
}