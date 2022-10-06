import { toHaveStyle } from '@testing-library/jest-dom/dist/matchers';
import React from 'react';
import ReactDOM from 'react-dom';
import {shipSelected} from './ShipPlacement';
import {shipOrient} from './ShipPlacement';

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
    if (this.props.readyState) {return null} // if player is ready, they CANNOT place ships.
    if (
      //checks if button pressed is inside the array given with ship selected and orientation(if button is not then ship will not go out of bounds if placed there, quic maffs)
        (shipSelected === 'ship2' && shipOrient === 'horizontal' && [3,7,11,15].includes(this.props.index)) ||
        (shipSelected === 'ship3' && shipOrient === 'horizontal' && [2,3,6,7,10,11,14,15].includes(this.props.index)) ||
        (shipSelected === 'ship4' && shipOrient === 'horizontal' && [1,2,3,5,6,7,9,10,11,13,14,15].includes(this.props.index)) ||
        (shipSelected === 'ship2' && shipOrient === 'vertical' && [12,13,14,15].includes(this.props.index)) ||
        (shipSelected === 'ship3' && shipOrient === 'vertical' && [8,9,10,11,12,13,14,15].includes(this.props.index)) ||
        (shipSelected === 'ship4' && shipOrient === 'vertical' && [4,5,6,7,8,9,10,11,12,13,14,15].includes(this.props.index))
        ){
      console.log("out of boundaries")
    } else if (
      //slices the array with the boxes to check depending on ship selected and orientation, then checks elements for property shipStatus to not include ship (prevents ship overlap)
      (shipSelected === 'ship1' && shipOrient === 'horizontal' && this.props.play1Grid.slice(this.props.index,this.props.index+1).filter(square => square.shipPresent === 'ship').length > 0) ||
      (shipSelected === 'ship2' && shipOrient === 'horizontal' && this.props.play1Grid.slice(this.props.index,this.props.index+2).filter(square => square.shipPresent === 'ship').length > 0) ||
      (shipSelected === 'ship3' && shipOrient === 'horizontal' && this.props.play1Grid.slice(this.props.index,this.props.index+3).filter(square => square.shipPresent === 'ship').length > 0) ||
      (shipSelected === 'ship4' && shipOrient === 'horizontal' && this.props.play1Grid.slice(this.props.index,this.props.index+4).filter(square => square.shipPresent === 'ship').length > 0) ||
      (shipSelected === 'ship1' && shipOrient === 'vertical' && (this.props.play1Grid.slice(this.props.index,this.props.index+1).filter(square => square.shipPresent === 'ship').length > 0)) ||
      (shipSelected === 'ship2' && shipOrient === 'vertical' && (this.props.play1Grid.slice(this.props.index,this.props.index+1).filter(square => square.shipPresent === 'ship').length > 0 || this.props.play1Grid.slice(this.props.index+4, this.props.index+5).filter(square => square.shipPresent === 'ship').length > 0)) || 
      (shipSelected === 'ship3' && shipOrient === 'vertical' && (this.props.play1Grid.slice(this.props.index,this.props.index+1).filter(square => square.shipPresent === 'ship').length > 0 || this.props.play1Grid.slice(this.props.index+4, this.props.index+5).filter(square => square.shipPresent === 'ship').length > 0 || this.props.play1Grid.slice(this.props.index+8,this.props.index+9).filter(square => square.shipPresent === 'ship').length > 0)) ||
      (shipSelected === 'ship4' && shipOrient === 'vertical' && (this.props.play1Grid.slice(this.props.index,this.props.index+1).filter(square => square.shipPresent === 'ship').length > 0 || this.props.play1Grid.slice(this.props.index+4, this.props.index+5).filter(square => square.shipPresent === 'ship').length > 0 || this.props.play1Grid.slice(this.props.index+8,this.props.index+9).filter(square => square.shipPresent === 'ship').length > 0 || this.props.play1Grid.slice(this.props.index+12,this.props.index+13).filter(square => square.shipPresent === 'ship').length > 0))
      ){
      console.log("overlaps another ship")
    } else {

      //places horizontal ships
      //if ship is size 2, the next .map iteration selects the square property as ship too
      // ~so on for size 3 and 4 and their iterations respectively
      if (shipOrient === 'horizontal'){
        var newPlay1Grid = this.props.play1Grid.map((square, i) => {
          if(this.props.index === i && (shipSelected === 'ship1'|| shipSelected === 'ship2' || shipSelected === 'ship3'|| shipSelected === 'ship4')){
            return {
              ...square,
              shipStatus: `${shipSelected}`,
              shipPresent: 'ship'
            };
          } else if (this.props.index + 1 === i && (shipSelected === 'ship2' || shipSelected === 'ship3' || shipSelected === 'ship4')){
            return {
              ...square,
              shipStatus: `${shipSelected}`,
              shipPresent: 'ship'
            };
          } else if (this.props.index + 2 === i && (shipSelected === 'ship3' || shipSelected === 'ship4')){
            return {
              ...square,
              shipStatus: `${shipSelected}`,
              shipPresent: 'ship'
            };

          } else if (this.props.index + 3 === i && (shipSelected === 'ship4')){
            return {
              ...square,
              shipStatus: `${shipSelected}`,
              shipPresent: 'ship'
            };
          } else {
            return square
          }

        })
        this.props.setPlay1Grid(newPlay1Grid)
      }

      //places vertical ships similar to horizontal, but instead of index +1, it goes down (index+4 since row is 4)
      if (shipOrient === 'vertical'){
        var newPlay1Grid = this.props.play1Grid.map((square, i) => {
          if(this.props.index === i && (shipSelected === 'ship1'|| shipSelected === 'ship2' || shipSelected === 'ship3'|| shipSelected === 'ship4')){
            return {
              ...square,
              shipStatus: `${shipSelected}`,
            };
          } else if (this.props.index + 4 === i && (shipSelected === 'ship2' || shipSelected === 'ship3' || shipSelected === 'ship4')){
            return {
              ...square,
              shipStatus: `${shipSelected}`,};
          } else if (this.props.index + 8 === i && (shipSelected === 'ship3' || shipSelected === 'ship4')){
            return {
              ...square,
              shipStatus: `${shipSelected}`,};
          } else if (this.props.index + 12 === i && (shipSelected === 'ship4')){
            return {
              ...square,
              shipStatus: `${shipSelected}`,};
          } else {
            return square
          }

        })

        this.props.setPlay1Grid(newPlay1Grid)
        
        
      }
    }
  }

  // This handleClick can be used in the player2/3 board. On clicking the square, it would need to:
  // Check to see if this square in the player's array has a ship, if so, change hitStatus to hit
  // If it does NOT have a ship, change hitStatus to miss

  render(){
    return(
      <div className={`player square ${this.props.square.shipStatus} ${this.props.square.hitStatus}`} id={`play1_square_${this.props.index}`} key={`square_${this.props.index}`} onClick={() => {this.handleClick()}}> </div>
  )
}}