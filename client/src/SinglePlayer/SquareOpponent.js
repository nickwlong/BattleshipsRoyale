import { toHaveStyle } from '@testing-library/jest-dom/dist/matchers';
import React from 'react';
import ReactDOM from 'react-dom';
import {Computer} from './Computer';

export var {setTurnState} = true;
export var {turnState} = true;

export class SquareOpponent extends React.Component {  
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
    if (this.props.turnState === 'Computer1' || this.props.turnState === 'Computer2') {return null}
    let newGridArray = this.props.gridArray.map((square, i) => {
      if(this.props.index === i && ["ship","ship1","ship2","ship3","ship4"].includes(this.props.square.shipStatus)){
        return { ...square, hitStatus: 'hit'}
      } else if (this.props.index === i && this.props.square.shipStatus === '0') {
        return { ...square, hitStatus: 'miss'}
      } else { return square }
    })
    this.props.setGridArray(newGridArray)
    console.log(this.props.turnState)
    this.props.setTurnState('Computer1')
  }

  // This handleClick can be used in the player2/3 board. On clicking the square, it would need to:
  // Check to see if this square in the player's array has a ship, if so, change hitStatus to hit
  // If it does NOT have a ship, change hitStatus to miss

  render(){
    return(
      <div className={`opponent square ${this.props.square.hitStatus}`} id={`play2_square_${this.props.index}`} key={`square_${this.props.index}`} onClick={() => {this.handleClick()}}> </div>
  )
}}