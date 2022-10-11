import { useEffect, useState } from "react";
import { Square } from "./Square";
import { setTurnState, SquareOpponent } from "./SquareOpponent";
import { Computer } from "./Computer";
import Confetti from "react-confetti";
import './ModalPopUp.css';
import { socket } from "./RunGame";

// variable to make confetti go off when Player 1 wins
var winnerConfetti 

export function GameFlow(props) {

  function checkGameWinner() {
    let player1Hits = props.play1Grid.filter(
      (square) => square.hitStatus === "hit"
    ).length;
    let player2Hits = props.play2Grid.filter(
      (square) => square.hitStatus === "hit"
    ).length;
    let player3Hits = props.play3Grid.filter(
      (square) => square.hitStatus === "hit"
    ).length;
    console.log("Num Player 1 ships hit:" + player1Hits);
    console.log("Num Comp 1 ships hit:" + player2Hits);
    console.log("Num Comp 2 ships hit:" + player3Hits);

    if (
      (player1Hits >= 3 && player2Hits >= 3) ||
      (player2Hits >= 3 && player3Hits >= 3) ||
      (player3Hits >= 3 && player1Hits >= 3)
    ) {
      props.setTurnState("game-over");
      socket.emit('gameIsOver', props.roomId)
      
      let turnHeader = document.getElementById('turnHeader')
      turnHeader.style.display = 'none'

      if (player1Hits < 3) {
        // set the variable 'winnerConfetti' so confetti can go off when Player 1 wins!
        winnerConfetti = 'Player 1'
        CallsWinner("Player 1")
        console.log(props.turnState)
      }
      if (player2Hits < 3) {
        winnerConfetti = 'Player 2'
        CallsWinner("Player 2")
      }
      if (player3Hits < 3) {
        winnerConfetti = 'Player 3'
        CallsWinner("Player 3")
      }
      return true;
    }

    return false;
  }

  socket.on('gameOver', () => {
    console.log('Game finished on another players turn')
    props.setTurnState('game-over')
    checkGameWinner()
  })

  return(
  <div id='BoardsContainer'>
    {props.turnState !== "game-over" ? <h1 id='turnHeader'>It's {props.turnState}'s turn</h1> : ""}
          {/* if the 'winnerConfetti is equal to 'Player 1' the CallsWinner function is called*/}
          {winnerConfetti === 'Player 1' ? CallsWinner("Player 1"): ""}
          {winnerConfetti === 'Player 2' ? CallsWinner("Player 2"): ""}
          {winnerConfetti === 'Player 3' ? CallsWinner("Player 3"): ""}

    {props.playState === 'Singleplayer' ? <Computer turnState={props.turnState} checkGameWinner={checkGameWinner} setTurnState={props.setTurnState} grid1Array={props.play1Grid} setGrid1Array={props.setPlay1Grid} grid2Array={props.play2Grid} setGrid2Array={props.setPlay2Grid} grid3Array={props.play3Grid} setGrid3Array={props.setPlay3Grid}/> : ""}
    {/* computer function imports grids and turns state, and functions of setting grids and turn state */}
    <row>
      <column>
        {props.playState === 'Singleplayer' ? <h1>Computer 1's Board</h1> : <h1>{props.opponentNames[0]}'s board</h1>}
        <div className="player2 board" id="GameContainer2">
          {props.play2Grid.map(
            (square, index) => (<SquareOpponent square={square} key={`player2Board_${index}`} index={index} gridArray={props.play2Grid} setGridArray={props.setPlay2Grid} setTurnState={props.setTurnState} turnState={props.turnState} sendGrids={props.sendGrids} checkGameWinner={checkGameWinner}  playState={props.playState} sendData={props.sendData} username={props.username} setUsername={props.setUsername}/>)
            )}
        </div>
      </column>
      <column>
        {props.playState === 'Singleplayer' ? <h1>Computer 2's Board</h1> : <h1>{props.opponentNames[1]}'s board</h1>}
        <div className="player3 board" id="GameContainer3">
          {props.play3Grid.map(
            (square, index) => (<SquareOpponent square={square} key={`player3Board_${index}`} index={index} gridArray={props.play3Grid} setGridArray={props.setPlay3Grid} setTurnState={props.setTurnState} turnState={props.turnState} sendGrids={props.sendGrids} checkGameWinner={checkGameWinner} playState={props.playState} sendData={props.sendData} username={props.username} setUsername={props.setUsername}/>)
            )}
        </div>
      </column>
    </row>
    <row>
      <column>

        <h1>Your Board</h1>
        <div className="player1 board" id="GameContainer1">
          {props.play1Grid.map( // maps through the array and makes a square for each of the elements in the array.
          (square, index) => (<SquareOpponent square={square} key={`player3Board_${index}`} index={index} gridArray={props.play3Grid} setGridArray={props.setPlay3Grid} setTurnState={props.setTurnState} turnState={props.turnState} sendGrids={props.sendGrids} checkGameWinner={checkGameWinner} playState={props.playState} sendData={props.sendData} username={props.username} setUsername={props.setUsername}

          />)
            )}
          </div>
        </column>
      </row>
    </div>
  );
}
// This function returns confetti with the modal popup that shows who the winner is.
function CallsWinner (player) {
  return (
  <div>  
    <Confetti/>
      <div className='modalContainer'>
        <div className='modalRight'>
          <div className='content'>
            <h1>  Winner is  {player}  🎉</h1>
            <br></br>
            <br></br>
          </div>
        </div>
      </div>
  </div>
);
}