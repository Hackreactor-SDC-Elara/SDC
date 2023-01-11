import React from 'react';
import axios from 'axios';

export default class NewReviewForm extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        showForm: false,
        name: "",
        date: "",
        summary: "",
        body: ""
      }

      this.handleClickForm = this.handleClickForm.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.renderReviewForm = this.renderReviewForm.bind(this);
  }

  handleClickForm() {
    this.setState({showForm: true});
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
   }

  handleSubmit() {
    event.preventDefault();
    console.log(this.state.name)
    console.log(this.state.date)
    console.log(this.state.summary)
    console.log(this.state.body)

    let config = {
      url: `/reviews?product_id=71697`,
      method: 'post',
      data: {
        name: this.state.name,
        date: new Date,
        summary: this.state.summary,
        body: this.state.body
      }
    };

    axios(config)
      .then ( (review) => {
        console.log('post successful')
      })
      .catch( (err) => {
        console.log(err);
      });
  }

  renderReviewForm () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input name="name" type="text" placeholder="input name" value={this.state.name} onChange={(e) => {this.handleChange(e)}}/>
            <br />
            Date:
            <input name="date" type="text" placeholder="input date" value={this.state.date} onChange={this.handleChange}/>
            <br />
            Review Summary:
            <input name="summary" type="text" placeholder="input summary" value={this.state.summary} onChange={this.handleChange}/>
            <br />
            Review Body:
            <input name="body" type="text" placeholder="input review" value={this.state.body} onChange={this.handleChange}/>
            <br />
          </label>
          <button type="submit">Submit</button>
        </form>

      </div>
    )
  }

  render () {
    return (
      <div>
        <button type="button" onClick={this.handleClickForm}>Add Review</button>
        {this.state.showForm && this.renderReviewForm()}
      </div>
    )
  }
}

