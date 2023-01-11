import React from 'react';

export default function ReviewsImages (props) {

  return (
    <div className="review-images">
      <img src={props.images.url} width="80px" height="80px"/>
    </div>
  )
}