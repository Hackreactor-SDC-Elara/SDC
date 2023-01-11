import React from 'react';



export default class Questions extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    let options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };

    let readableDate = new Date(this.props.date);
    let date = readableDate.toLocaleDateString("en-US", options);
    return (
      <div className="answer-card">
        <span className="answer-body">{this.props.body}</span>
        <div className="break-small"></div>
        <span className="answer-detail">by {this.props.user}, {date}  |  Helpful? Yes &#40;{this.props.helpfulness}&#41;  |  Report</span>
      </div>
    )
  }
}