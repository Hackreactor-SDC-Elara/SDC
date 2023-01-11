import React from 'react';
import ReviewsImages from './ReviewsImages.jsx';
import StarRating from './StarRating.jsx';

//maps through all the reviews and formats them into 'tiles'
export default function ReviewsTile (props) {
  // console.log(props.filter, 'line 7 ReviewsTile')


  let imagesArr = props.review.photos

  let formattedDate = new Date(props.review.date)
  let month = formattedDate.getMonth()
  let formattedDateString = formattedDate.toDateString()
  let dateArr = formattedDateString.split(' ');
  let newDateArr = dateArr.splice(1);
  let date = newDateArr.join(' ');

  return (
    <div className="tile">
      <h3 className="summary">{props.review.summary}</h3>
      <p className="reviews-stars"><StarRating rating={props.review.rating}/></p>
      <p className="date">{date}</p>
      <p className="review-body">{props.review.body}</p>
      {imagesArr.map( (imagesObj, index) => <ReviewsImages key={index} images ={imagesObj}/>)}
      <p className="name">{props.review.reviewer_name}</p>
      <p className="recommend">Recommend {props.review.recommend}</p>
      <p className="helpfulness">Helpful?
        <span style={{textDecorationLine: 'underline'}} onClick={() => props.increaseHelpfulnessCount(props.review.review_id, props.review.helpfulness, props.filter)} >Yes </span>
          ({props.review.helpfulness})
      </p>
    </div>
  )
}


