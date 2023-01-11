import React from 'react';
import axios from 'axios';

import QuestionsList from './questionsAnswers/QuestionsList.jsx';
import QuestionSearch from './questionsAnswers/QuestionSearch.jsx';

export default class QuestionsAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: '',
      questionsAndAnswers: [],
      filteredQuestions: [],
      visibleQuestions: [],
      listEnd: 2
    };
    this.getQuestionsAndAnswers = this.getQuestionsAndAnswers.bind(this);
    this.filterQuestions = this.filterQuestions.bind(this);
    this.updateVisibleQuestions = this.updateVisibleQuestions.bind(this);
    this.increaseQuestionView = this.increaseQuestionView.bind(this);
  }

  getQuestionsAndAnswers(id) {
    axios.get(`/qa/questions?product_id=${id}&count=10`)
    .then(response => {
      this.setState({
        questionsAndAnswers: response.data.results,
        visibleQuestions: response.data.results.slice(0, this.state.listEnd)
      });
    });
  }

  filterQuestions (filter) {
    console.log(filter.target.value);
    var filterHold = []
    for(var x = 0; x < this.state.questionsAndAnswers.length; x++) {
      var lowerBody = this.state.questionsAndAnswers[x].question_body.toLowerCase();
      var lowerFilter = filter.target.value.toLowerCase();
      if (lowerBody.includes(lowerFilter)) {
        filterHold.push(this.state.questionsAndAnswers[x]);
      }
    };
    this.setState({
      filteredQuestions: filterHold
    }, () => {this.updateVisibleQuestions()});
  }

  updateVisibleQuestions () {
    if(this.state.filteredQuestions.length === 0) {
      this.setState({
        visibleQuestions: this.state.questionsAndAnswers.slice(0, this.state.listEnd)
      });
    } else {
      this.setState({
        visibleQuestions: this.state.filteredQuestions.slice(0, this.state.listEnd)
      });
    }
  }

  increaseQuestionView () {
    this.setState({
      listEnd: (this.state.listEnd + 2)
    }, () => {this.updateVisibleQuestions()});
  }

  componentDidMount() {
    this.getQuestionsAndAnswers(this.props.productId);
  }

  render() {
    return (
      <div className={`questions-container`}>
        <h5 className="questions-title">QUESTIONS & ANSWERS</h5>
        <QuestionSearch filter={this.filterQuestions}/>
        <QuestionsList qList={ this.state.visibleQuestions } moreQuestions={this.increaseQuestionView}/>
      </div>
    );
  }
}