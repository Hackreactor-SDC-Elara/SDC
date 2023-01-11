import React from "react";
import ReactDOM from "react-dom";


// Portal method in React is used to wrap a child component and to render it outside Parent component, https://reactjs.org/docs/portals.html
//Here, Modal is used to pop up comparison modal seperately to the single card component. However the control logic is still in single card component.
export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    // this.el = document.createElement('div');
    this.modal = document.createElement('div');
  }
  componentDidMount() {
    const modalRoot = document.querySelector('.modal-container');
    modalRoot.appendChild(this.modal);

  }
  componentWillUnmount() {
    const modalRoot = document.querySelector('.modal-container');
    modalRoot.removeChild(this.modal);

  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.modal
    );
  }
}