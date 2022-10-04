import { toHaveStyle } from '@testing-library/jest-dom/dist/matchers';
import React from 'react';
import ReactDOM from 'react-dom';
import {shipSelected} from './RunGame.js';
import {shipOrient} from './RunGame.js';

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
    if (shipOrient === 'horizontal'){
      var newGridArray = this.props.gridArray.map((square, i) => {
        if(this.props.index === i && (shipSelected === 'ship1'|| shipSelected === 'ship2' || shipSelected === 'ship3'|| shipSelected === 'ship4')){
          return {
            ...square,
            shipStatus: 'ship',
          };
        } else if (this.props.index + 1 === i && (shipSelected === 'ship2' || shipSelected === 'ship3' || shipSelected === 'ship4')){
          return {
            ...square,
            shipStatus: 'ship',};
        } else if (this.props.index + 2 === i && (shipSelected === 'ship3' || shipSelected === 'ship4')){
          return {
            ...square,
            shipStatus: 'ship',};
        } else if (this.props.index + 3 === i && (shipSelected === 'ship4')){
          return {
            ...square,
            shipStatus: 'ship',};
        } else {
          return square
        }

      })
      console.log(newGridArray)
      this.props.setGridArray(newGridArray)
    }

    if (shipOrient === 'vertical'){
      var newGridArray = this.props.gridArray.map((square, i) => {
        if(this.props.index === i && (shipSelected === 'ship1'|| shipSelected === 'ship2' || shipSelected === 'ship3'|| shipSelected === 'ship4')){
          return {
            ...square,
            shipStatus: 'ship',
          };
        } else if (this.props.index + 4 === i && (shipSelected === 'ship2' || shipSelected === 'ship3' || shipSelected === 'ship4')){
          return {
            ...square,
            shipStatus: 'ship',};
        } else if (this.props.index + 8 === i && (shipSelected === 'ship3' || shipSelected === 'ship4')){
          return {
            ...square,
            shipStatus: 'ship',};
        } else if (this.props.index + 12 === i && (shipSelected === 'ship4')){
          return {
            ...square,
            shipStatus: 'ship',};
        } else {
          return square
        }

      })
      console.log(newGridArray)
      this.props.setGridArray(newGridArray)
    }
  }

  // This handleClick can be used in the player2/3 board. On clicking the square, it would need to:
  // Check to see if this square in the player's array has a ship, if so, change hitStatus to hit
  // If it does NOT have a ship, change hitStatus to miss

  render(){
    return(
      <div className={`player square ${this.props.square.shipStatus}`} id={`square_${this.props.index}`} key={`square_${this.props.index}`} onClick={() => {this.handleClick()}}> </div>
  )
}}