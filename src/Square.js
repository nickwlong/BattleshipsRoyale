import { toHaveStyle } from '@testing-library/jest-dom/dist/matchers';
import React from 'react';
import ReactDOM from 'react-dom';

export class Square extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
      hitStatus: this.props.square.hitStatus,
      index: this.props.index
    }
    this.handleClick = this.handleClick.bind(this)
  }

  // this.props.index => the index within the grid array

  // this.state.status => status of the square in the array

  // 
  

  handleClick () {
    console.log(this.props.gridArray)

    let newGridArray = this.props.gridArray.map((square, i) => {
      console.log(i)
      if(this.props.index === i){
        const newSquare = square
        newSquare.shipStatus = 'ship'
        console.log(newSquare)
        return newSquare
      } else {
        console.log(square)
        return square
      }
    })
    console.log(newGridArray)
    this.props.setGridArray(newGridArray)
  
  }

  render(){
    return(
      <div className={`square ${this.props.square.shipStatus}`} id={`square_${this.props.index}`} key={`square_${this.props.index}`} onClick={() => {this.handleClick()}}> </div>
  )
}}