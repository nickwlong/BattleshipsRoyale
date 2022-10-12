
import React from "react";

export class SquareOpponent extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }
  
// this async function is working with the 'let wait' variable to ensure that React doesnt move on to the next bit of code until 'handleClick' is done! -E
  async handleClick (event) {
    if (this.props.turnState === 'game-over') {return null} // prevents play if it is 'game-over'
    if (event.target.parentElement.classList[0] === ('player1')) {return null} // prevents play if this board belongs to local player

    if (this.props.turnState === 'Computer 1' || this.props.turnState === 'Computer 2') {alert("its not your turn yet!"); return null} // if it is the computer's don't, can't play
    if (this.props.playState === 'Multiplayer' && this.props.turnState !== this.props.username) {alert("its not your turn yet!"); return null} // if it is not the player's turn in MP, can't play
    if (this.props.square.hitStatus === 'hit' || this.props.square.hitStatus === 'hitfull' || this.props.square.hitStatus === 'miss') {alert('This square has already been hit, choose another');return null} // if the square is already hit or missed, can't play on it. 

    // on click, checks for the ship status and assigns hit or miss:
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

    // updates the gridState with the outcome.
    await this.props.setGridArray(newGridArray)

    // checks for a winner and sends the updated data
    this.props.checkGameWinner()
    this.props.sendData()
    if(this.props.playState === 'Singleplayer'){this.props.setTurnState('Computer 1')} // changes turn from Player 1 to Computer 1 if singleplayer

  }


  render(){
    return(
      <div className={`${this.props.player} square ${this.props.square.hitStatus} ${this.props.square.shipStatus}`} id={`play2_square_${this.props.index}`} key={`square_${this.props.index}`} onClick={this.handleClick}> </div>
  )
}}
