import { toHaveStyle } from "@testing-library/jest-dom/dist/matchers";
import React from "react";
import ReactDOM from "react-dom";
import { Computer } from "./Computer";
import { checkGameWinner } from "./GameFlow";

export class SquareOpponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hitStatus: this.props.square.hitStatus,
      index: this.props.index,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  // this.props.index => the index within the grid array

  // this.state.status => status of the square in the array

  // 
  
// this async function is working with the 'let wait' variable to ensure that React doesnt move on to the next bit of code until 'handleClick' is done! -E
  async handleClick () {
    if (this.props.turnState === 'Computer 1' || this.props.turnState === 'Computer 2') {alert("its not your turn yet!"); return null}
    console.log(this.props.turnState)
    if (this.props.playState === 'Multiplayer' && this.props.turnState !== this.props.username) {alert("its not your turn yet!"); return null}
    if (this.props.square.hitStatus === 'hit' || this.props.square.hitStatus === 'hitfull' || this.props.square.hitStatus === 'miss') {
      alert('This square has already been hit, choose another')
      return null}
    if (this.props.turnState === 'game-over') {return null}
    let newGridArray = this.props.gridArray.map((square, i) => {
      if (
        this.props.index === i &&
        ["ship2","ship31","ship32","ship4","ship5","ship2C","ship31C","ship32C","ship4C","ship5C"].includes(
          this.props.square.shipStatus
        )
      ) {
        return { ...square, hitStatus: "hit" };
      } else if (
        this.props.index === i &&
        this.props.square.shipStatus === "0"
      ) {
        return { ...square, hitStatus: "miss" };
      } else {
        return square;
      }
    });


    const wait = await this.props.setGridArray(newGridArray)
    var countship2 = this.props.gridArray.filter((obj) => obj.shipStatus === "ship2C" && obj.hitStatus === "hit").length;
    if(countship2 === 2){
      newGridArray = this.props.gridArray.map((square, index)=>square.shipStatus === "ship2C" ? { ...square, hitStatus: 'hitfull' } : square)
      const wait = await this.props.setGridArray(newGridArray)
    }
    var countship31 = this.props.gridArray.filter((obj) => obj.shipStatus === "ship31C" && obj.hitStatus === "hit").length;
    if(countship31 === 3){
      newGridArray = this.props.gridArray.map((square, index)=>square.shipStatus === "ship31C" ? { ...square, hitStatus: 'hitfull' } : square)
      const wait = await this.props.setGridArray(newGridArray)
    }
    var countship32 = this.props.gridArray.filter((obj) => obj.shipStatus === "ship32C" && obj.hitStatus === "hit").length;
    if(countship32 === 3){
      newGridArray = this.props.gridArray.map((square, index)=>square.shipStatus === "ship32C" ? { ...square, hitStatus: 'hitfull' } : square)
      const wait = await this.props.setGridArray(newGridArray)
    }
    var countship4 = this.props.gridArray.filter((obj) => obj.shipStatus === "ship4C" && obj.hitStatus === "hit").length;
    if(countship4 === 4){
      newGridArray = this.props.gridArray.map((square, index)=>square.shipStatus === "ship4C" ? { ...square, hitStatus: 'hitfull' } : square)
      const wait = await this.props.setGridArray(newGridArray)
    }
    var countship5 = this.props.gridArray.filter((obj) => obj.shipStatus === "ship5C" && obj.hitStatus === "hit").length;
    if(countship5 === 5){
      newGridArray = this.props.gridArray.map((square, index)=>square.shipStatus === "ship5C" ? { ...square, hitStatus: 'hitfull' } : square)
      const wait = await this.props.setGridArray(newGridArray)
    }

    this.props.checkGameWinner()
    this.props.sendData()
    if(this.props.playState === 'Singleplayer'){this.props.setTurnState('Computer 1')}

    
    
  }

  // This handleClick can be used in the player2/3 board. On clicking the square, it would need to:
  // Check to see if this square in the player's array has a ship, if so, change hitStatus to hit
  // If it does NOT have a ship, change hitStatus to miss

  render(){
    return(
      <div className={`opponent square ${this.props.square.hitStatus} ${this.props.square.shipStatus}`} id={`play2_square_${this.props.index}`} key={`square_${this.props.index}`} onClick={() => {this.handleClick()}}> </div>
  )
}}
