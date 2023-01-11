import React from 'react';
import axios from 'axios';

import ReviewsList from './list/ReviewsList.jsx';
import ReviewsTile from './list/ReviewsTile.jsx';
import ReviewsSort from './list/ReviewsSort.jsx';
import NewReviewForm from './form/NewReviewForm.jsx';
import AverageRating from './list/AverageRating.jsx';


export default class RatingsReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      visibleReviews: [],
      averageRating: 0,
      end: 2,
      filter: 'relevant',
      helpfulnessClickedCount: 0,
    };
    this.getRatingsReviews = this.getRatingsReviews.bind(this);
    this.increaseHelpfulnessCount = this.increaseHelpfulnessCount.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleListMoreReviews = this.handleListMoreReviews.bind(this);
  }

  componentDidMount () {
    this.getRatingsReviews(this.props.productId, this.state.filter);
    console.log(this.state.filter, 'line 31')
  }

  getRatingsReviews(id, filter) {
    console.log(filter, 'line 34')
    let config = {
      url: `/reviews?product_id=${id}&sort=${filter}`,
      method: 'get'
    };
    axios(config)
      .then ( (reviews) => {
        var totalRating = 0;
        //calculating average rating
        for (var i = 0; i < reviews.data.results.length; i++) {
          totalRating = totalRating + reviews.data.results[i].rating
        }
        this.setState({
          reviews: reviews.data.results,
          visibleReviews: reviews.data.results.slice(0,this.state.end),
          averageRating: totalRating/reviews.data.results.length
        });
      })
        .catch( (err) => {
        console.log(err);
      });
  }

  increaseHelpfulnessCount(reviewId, helpfulnessCount, filter) {
    console.log(filter, 'line 59')
    let config = {
      url: `/reviews/${reviewId}/helpful`,
      method: 'put',
      data: {
        helpfulnessCount: helpfulnessCount + 1
      }
    };
    axios(config)
      .then (
        this.getRatingsReviews(this.props.productId, filter)
      )
      .catch( (err) => {
        console.log(err);
      });
  }

  handleSort(event) {
    this.setState({filter: event.target.value}); //setState is asynch
    this.getRatingsReviews(this.props.productId, event.target.value)
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleListMoreReviews(event) {
    event.preventDefault();
    //rendering 2 additional reviews
    this.state.end = this.state.end + 2;
    this.setState({
      visibleReviews: this.state.reviews.slice(0,this.state.end)
    });
  }

  render() {
    // if (this.state.helpfulnessClickedCount <= 1) {
      return (
        <div className='reviews-section-container'>
          <div className='reviews-header'>
            <h3>RATINGS & REVIEWS</h3>
          </div>
          <div className='ratings-container'>
            <h1>{Math.round(this.state.averageRating) * 10/10}</h1>
            <AverageRating averageRating={this.state.averageRating}/>
          </div>
          <div className='reviews-container'>
            <form onSubmit={this.handleSubmit}>
              <label>
                {this.state.reviews.length} reviews, sorted by
                <select value={this.state.value} onChange={this.handleSort}>
                  <option value="relevant">relevant</option>
                  <option value="newest">newest</option>
                  <option value="helpful">helpful</option>
                </select>
              </label>
            </form>
            <ReviewsList
              review={this.state.reviews}
              visibleReviews={this.state.visibleReviews}
              helpfulness={this.state.helpfulness}
              increaseHelpfulnessCount={this.increaseHelpfulnessCount}
              filter={this.state.filter}
            />
          </div>
          <NewReviewForm />
          <div>
            <button onClick={this.handleListMoreReviews}>
              More Reviews
            </button>
          </div>
        </div>
      )
    // }
  }
}