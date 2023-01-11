import React from 'react';

import ComparisonModal from './ComparisonModal.jsx';
import Modal from './Modal.jsx'

import StarRating from './StarRating.jsx'
export default class SingleCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCompareOn: false
    };
    this.onCompare = this.onCompare.bind(this);
  }

  onCompare (input) {
    this.setState({isCompareOn : input});
  }


  render() {
    //productData.id is a number
    var url =  window.location.href.split('?').shift() + `?id=${this.props.productData.id}`;
    return (
      <div className="card" >

        <div className="img-container">
        {/* when client click card image, it will redirect page to detail product page */}
          <img className="card-img" src={this.props.productData.img} alt="Product image" onClick={()=> {window.location.href = url}}
          // onError={ event => {
          //   event.target.src= "https://cdn.pixabay.com/photo/2015/01/21/13/21/sale-606687__340.png"
          //   event.onerror = null
          // }}
          />

          {/* icon is star or delete */}
          {this.props.icon === 'star' ?
            (<div className="icon-star" >
              {/* click on star then comparsion modal will appear */}
              <button onClick={() => {this.setState({isCompareOn : true})}}><span className="star">&#9733;</span></button>

              {/* comparisonMedal appear or not */}
              {this.state.isCompareOn ?
                <Modal className="modal">
                  <div className="overlay"></div>
                  < ComparisonModal onCompare={this.onCompare} currentProductFeature={this.props.currentProductFeature} relatedProductFeature={this.props.productData.features} relatedProductName={this.props.productData.name} currentProductName={this.props.currentProductName} />
                </Modal> : null}
              </div>)
            : (<div className="icon-delete" >
                <button onClick={() => {this.props.handleDelete(this.props.productData.id.toString())}}><span className="delete">&#215;</span></button>
              </div>)
          }


        </div>




        <div className="product-info">

          <span>{this.props.productData.category}</span>
          <br></br>
          <span className="product-name">{this.props.productData.name}</span>

          {/* origin price or discount price */}
          {(this.props.productData.discount_price) ? <p className="discount-price">${this.props.productData.discount_price}</p> : null}
          <p style={(this.props.productData.discount_price) ? {"text-decoration": "line-through"} : null}>${this.props.productData.default_price}</p>

          {/* rate is not designed */}
          {(this.props.productData.rate) ? <><StarRating rating={this.props.productData.rate}/></> : null}

        </div>
      </div>
    )
  }
}