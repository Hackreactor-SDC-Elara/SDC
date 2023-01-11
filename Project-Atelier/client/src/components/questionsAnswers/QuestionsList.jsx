import React from 'react';

import Questions from './Questions.jsx';
import PostQuestions from './PostQuestions.jsx';

export default class QuestionsList extends React.Component {
  constructor(props) {
    super(props);
  }





  render () {
    return (
      <div>
        <div>
          {this.props.qList.map(q => (
            <Questions key={q.question_id} body={q.question_body} date= {q.question_date}
              asker={q.asker_name} helped={q.question_helpfulness} reported={q.reported}
              answerList={q.answers}/>
          ))}
        </div>
        <div className="qa-flexbox">
          <button className="question-button" onClick={this.props.moreQuestions}>MORE ANSWERED QUESTIONS</button>
          <PostQuestions />
        </div>

      </div>
    )
  }
}