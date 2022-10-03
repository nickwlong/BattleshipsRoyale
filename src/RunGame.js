import React from 'react';
import ReactDOM from 'react-dom';

export class RunGame extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
      status: 'empty'
    }
    this.handleClick = this.handleClick.bind(this)
  }
  

  handleClick() {
    this.setState(prevState => ({
      status: 'ship'
    }))
  }

  render(){
    return(
      <div className={`square ${this.state.status}`} id={`square_${this.props.index}`} key={`square_${this.props.index}`} onClick={() => {this.handleClick()}}> </div>
  )
}}