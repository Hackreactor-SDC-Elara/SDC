import React from 'react';
import StarRating from './StarRating.jsx';

export default function AverageRating(props) {

  return (
    <div className="rating"><StarRating rating={props.averageRating}/></div>
  )
}