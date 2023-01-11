import React from 'react';
import ReviewsTile from './ReviewsTile.jsx'

export default function ReviewsList(props) {

    return (
      <div className="scroller">
        {props.visibleReviews.map( (reviewObj, index) => <ReviewsTile
        key ={index}
        review={reviewObj}
        // helpfulness={props.helpfulness}
        filter={props.filter}
        increaseHelpfulnessCount={props.increaseHelpfulnessCount}
        />)}
      </div>
    )
  }




