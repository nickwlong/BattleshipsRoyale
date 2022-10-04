import React from 'react';
import ReactDOM from 'react-dom';

export class Square extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
      status: 'empty'
    }
    this.handleClick = this.handleClick.bind(this)
  }

  // this.props.index => the index within the grid array

  // this.state.status => status of the square in the array

  // 
  

  handleClick() {
    console.log(this.props.square.shipStatus)
    console.log(this.props.index)
    this.setState(prevState => ({
      status: 'ship'
    }))
  }

  render(){
    return(
      <div className={`square ${this.state.status}`} id={`square_${this.props.index}`} key={`square_${this.props.index}`} onClick={() => {this.handleClick()}}> </div>
  )
}}