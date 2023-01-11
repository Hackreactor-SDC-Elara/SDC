import React from 'react';


export default class QuestionSearch extends React.Component {
  constructor(props) {
    super(props);
  }



  render () {
    return (
      <div className="questions-search-bar">
        <input type="text" className="ui-input-text" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." onChange={(e)=>(this.props.filter(e))}/>
        <span className="img-magnify-glass img-icon" tabindex="0">&#x1F50E;&#xFE0E;</span>
      </div>
    )
  }

}