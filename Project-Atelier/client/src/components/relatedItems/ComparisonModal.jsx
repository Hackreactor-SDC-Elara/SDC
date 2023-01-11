import React from 'react';

export default class ComparisonModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     isRender: false
    }
    this.feature = [];
    this.closeModal = this.closeModal.bind(this);
    this.preCompare = this.preCompare.bind(this);
  }
  preCompare () {
    this.props.currentProductFeature.forEach((item) => {
      // deal feature value is null, then do not count into array
      if (item.value !== null) {
        this.feature.push([item.value, item.feature, false]);
      }
    })
    // only compare current product feature exist in related product or not
    var loop = this.feature.length;

    this.props.relatedProductFeature.forEach((item) => {
      var hasCharacter = false;
      for (var i = 0; i < loop; i ++) {
        if (this.feature[i][1] === item.feature) {
          this.feature[i][2] = item.value;
          hasCharacter = true;
          break;
        }
      }
      // current product doesn't cover related product feature and it's value exists at the same time
      if (!hasCharacter && item.value !== null) {
        this.feature.push([false, item.feature, item.value]);
      }
    })
    // console.log(this.feature);
  }
  closeModal() {
    this.props.onCompare(false);
  }
  componentDidMount() {
    // this.state.isRender is used to render after this.feature has data
    // whether it can be optimized(?)
    this.preCompare();
    this.setState({isRender: true});
  }
  render() {
    return (
      <div className="comparison-modal">
        <span>COMPARISON</span>
        <table className="modal-table" >
          <thead>
            <tr>
            <th scope="col" className="left-side">{this.props.currentProductName}</th>
            <th scope="col" className="middle">feature</th>
            <th scope="col" className="right-side">{this.props.relatedProductName}</th>
            </tr>
          </thead>
          <tbody >
            {this.state.isRender ? (this.feature.map((item, index) => (
              <tr key={index}>
                {/* if feature is true, then display checkmark */}
                {item[0] === true ? <td className="left-side">&#x2713;</td> : <td className="left-side">{item[0]}</td>}
                <td className="middle">{item[1]}</td>
                {item[2] === true ? <td className="right-side">&#x2713;</td> : <td className="right-side">{item[2]}</td>}
              </tr>
              ))) : null
            }
          </tbody>
        </table>
        <button onClick={this.closeModal}>close</button>
      </div>

    )
  }
}

