import React from 'react';

import Answers from './Answers.jsx';

export default class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answerEnd: 2
    }
    this.showMoreAnswers = this.showMoreAnswers.bind(this);
  }

  showMoreAnswers () {
    this.setState ({
      answerEnd: this.state.answerEnd + 2
    });
  }

  render () {
    var hide = false;
    if (Object.keys(this.props.answerList).length === 0) {
      hide = true;
    }
    var hideMore = false;
    if (Object.keys(this.props.answerList).length <= this.state.answerEnd) {
      hideMore = true;
    }
    return (
      <div>
        <span className="question">Q: {this.props.body}</span>
        <span className="question-details">Helpful? Yes &#40;{this.props.helped}&#41;  |  Report</span>
        <div className="break-big"></div>
        <span className="question answer" hidden={hide}> A:  </span>
        <div>
          {Object.keys(this.props.answerList).slice(0, this.state.answerEnd).map(key => (
            <Answers key={key}
              user={this.props.answerList[key].answerer_name}
              body={this.props.answerList[key].body}
              date={this.props.answerList[key].date}
              helpfulness={this.props.answerList[key].helpfulness}/>
          ))}
        </div>
        <span className="more-answers" hidden={hideMore} onClick={this.showMoreAnswers}>LOAD MORE ANSWERS</span>

      </div>
    )
  }
}