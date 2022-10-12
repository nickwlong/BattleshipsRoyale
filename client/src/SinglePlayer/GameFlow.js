import {SquareOpponent } from "./SquareOpponent";
import { Computer } from "./Computer";
import Confetti from "react-confetti";
import './ModalPopUp.css';
import { socket } from "./RunGame";

// variable to make confetti go off when Player 1 wins
var winnerConfetti

export function GameFlow(props) {
        //checks for ships hit and destroys them (Set property to hitfull)

        var newplay1Grid;

        var countship2 = props.play1Grid.filter((obj) => obj.shipStatus === "ship2" && obj.hitStatus === "hit").length;
        if(countship2 === 2){
          newplay1Grid = props.play1Grid.map((square, index)=>square.shipStatus === "ship2" ? { ...square, hitStatus: 'hitfull' } : square)
          props.setPlay1Grid(newplay1Grid)
        }
        var countship31 = props.play1Grid.filter((obj) => obj.shipStatus === "ship31" && obj.hitStatus === "hit").length;
        if(countship31 === 3){
          newplay1Grid = props.play1Grid.map((square, index)=>square.shipStatus === "ship31" ? { ...square, hitStatus: 'hitfull' } : square)
          props.setPlay1Grid(newplay1Grid)
        }
        var countship32 = props.play1Grid.filter((obj) => obj.shipStatus === "ship32" && obj.hitStatus === "hit").length;
        if(countship32 === 3){
          newplay1Grid = props.play1Grid.map((square, index)=>square.shipStatus === "ship32" ? { ...square, hitStatus: 'hitfull' } : square)
          props.setPlay1Grid(newplay1Grid)
        }
        var countship4 = props.play1Grid.filter((obj) => obj.shipStatus === "ship4" && obj.hitStatus === "hit").length;
        if(countship4 === 4){
          newplay1Grid = props.play1Grid.map((square, index)=>square.shipStatus === "ship4" ? { ...square, hitStatus: 'hitfull' } : square)
          props.setPlay1Grid(newplay1Grid)
        }
        var countship5 = props.play1Grid.filter((obj) => obj.shipStatus === "ship5" && obj.hitStatus === "hit").length;
        if(countship5 === 5){
          newplay1Grid = props.play1Grid.map((square, index)=>square.shipStatus === "ship5" ? { ...square, hitStatus: 'hitfull' } : square)
          props.setPlay1Grid(newplay1Grid)
        }
    
        var newplay2Grid;
    
         countship2 = props.play2Grid.filter((obj) => (obj.shipStatus === "ship2C" || obj.shipStatus === "ship2") && obj.hitStatus === "hit").length;
        if(countship2 === 2){
          newplay2Grid = props.play2Grid.map((square, index)=>(square.shipStatus === "ship2C" || square.shipStatus === "ship2") ? { ...square, hitStatus: 'hitfull' } : square)
          props.setPlay2Grid(newplay2Grid)
        }
         countship31 = props.play2Grid.filter((obj) => (obj.shipStatus === "ship31C" || obj.shipStatus === "ship31") && obj.hitStatus === "hit").length;
        if(countship31 === 3){
          newplay2Grid = props.play2Grid.map((square, index)=>(square.shipStatus === "ship31C" || square.shipStatus === "ship31") ? { ...square, hitStatus: 'hitfull' } : square)
          props.setPlay2Grid(newplay2Grid)
        }
         countship32 = props.play2Grid.filter((obj) => (obj.shipStatus === "ship32C" || obj.shipStatus === "ship32") && obj.hitStatus === "hit").length;
        if(countship32 === 3){
          newplay2Grid = props.play2Grid.map((square, index)=>(square.shipStatus === "ship32C" || square.shipStatus === "ship32") ? { ...square, hitStatus: 'hitfull' } : square)
          props.setPlay2Grid(newplay2Grid)
        }
         countship4 = props.play2Grid.filter((obj) => (obj.shipStatus === "ship4C" || obj.shipStatus === "ship4") && obj.hitStatus === "hit").length;
        if(countship4 === 4){
          newplay2Grid = props.play2Grid.map((square, index)=>(square.shipStatus === "ship4C" || square.shipStatus === "ship4") ? { ...square, hitStatus: 'hitfull' } : square)
          props.setPlay2Grid(newplay2Grid)
        }
         countship5 = props.play2Grid.filter((obj) => (obj.shipStatus === "ship5C" || obj.shipStatus === "ship5") && obj.hitStatus === "hit").length;
        if(countship5 === 5){
          newplay2Grid = props.play2Grid.map((square, index)=>(square.shipStatus === "ship5C" || square.shipStatus === "ship5") ? { ...square, hitStatus: 'hitfull' } : square)
          props.setPlay2Grid(newplay2Grid)
        }
    
         var newplay3Grid;
    
         countship2 = props.play3Grid.filter((obj) => (obj.shipStatus === "ship2C" || obj.shipStatus === "ship2") && obj.hitStatus === "hit").length;
        if(countship2 === 2){
          newplay3Grid = props.play3Grid.map((square, index)=>(square.shipStatus === "ship2C" || square.shipStatus === "ship2") ? { ...square, hitStatus: 'hitfull' } : square)
          props.setPlay3Grid(newplay3Grid)
        }
         countship31 = props.play3Grid.filter((obj) => (obj.shipStatus === "ship31C" || obj.shipStatus === "ship31") && obj.hitStatus === "hit").length;
        if(countship31 === 3){
          newplay3Grid = props.play3Grid.map((square, index)=>(square.shipStatus === "ship31C" || square.shipStatus === "ship31") ? { ...square, hitStatus: 'hitfull' } : square)
          props.setPlay3Grid(newplay3Grid)
        }
         countship32 = props.play3Grid.filter((obj) => (obj.shipStatus === "ship32C" || obj.shipStatus === "ship32") && obj.hitStatus === "hit").length;
        if(countship32 === 3){
          newplay3Grid = props.play3Grid.map((square, index)=>(square.shipStatus === "ship32C" || square.shipStatus === "ship32") ? { ...square, hitStatus: 'hitfull' } : square)
          props.setPlay3Grid(newplay3Grid)
        }
         countship4 = props.play3Grid.filter((obj) => (obj.shipStatus === "ship4C" || obj.shipStatus === "ship4") && obj.hitStatus === "hit").length;
        if(countship4 === 4){
          newplay3Grid = props.play3Grid.map((square, index)=>(square.shipStatus === "ship4C" || square.shipStatus === "ship4") ? { ...square, hitStatus: 'hitfull' } : square)
          props.setPlay3Grid(newplay3Grid)
        }
         countship5 = props.play3Grid.filter((obj) => (obj.shipStatus === "ship5C" || obj.shipStatus === "ship5") && obj.hitStatus === "hit").length;
        if(countship5 === 5){
          newplay3Grid = props.play3Grid.map((square, index)=>(square.shipStatus === "ship5C" || square.shipStatus === "ship5") ? { ...square, hitStatus: 'hitfull' } : square)
          props.setPlay3Grid(newplay3Grid)
        }

  function checkGameWinner() {



    let player1Hits = props.play1Grid.filter(
      (square) => square.hitStatus === "hitfull"
    ).length;
    let player2Hits = props.play2Grid.filter(
      (square) => square.hitStatus === "hitfull"
    ).length;
    let player3Hits = props.play3Grid.filter(
      (square) => square.hitStatus === "hitfull"
    ).length;
    console.log("Num Player 1 ships hit:" + player1Hits);
    console.log("Num Comp 1 ships hit:" + player2Hits);
    console.log("Num Comp 2 ships hit:" + player3Hits)
    

    if (
      (player1Hits >= 3 && player2Hits >= 3) ||
      (player2Hits >= 3 && player3Hits >= 3) ||
      (player3Hits >= 3 && player1Hits >= 3)
    ) {

      if ( props.turnState !== 'game-over'){
        socket.emit('gameIsOver', props.roomId)
      }
      
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
              <button onClick ={ () => {
              socket.disconnect()
              socket.connect()
              props.setReadyState('pending')
              props.setPlayState('Welcome')
              }}>Play Again</button>
              <br></br>
            </div>
          </div>
        </div>
    </div>
  );
  }
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
        {props.playState === 'Singleplayer' ? <h1>Computer 1's Board</h1> : <h1>{props.opponentNames[props.opponent1Index]}'s board</h1>}
        <div className={`player2 board ${props.playerStatuses[props.opponent1Index]}`} id="GameContainer2">
          {props.play2Grid.map(
            (square, index) => (<SquareOpponent square={square} key={`player2Board_${index}`} index={index} gridArray={props.play2Grid} setGridArray={props.setPlay2Grid} setTurnState={props.setTurnState} turnState={props.turnState} sendGrids={props.sendGrids} checkGameWinner={checkGameWinner}  playState={props.playState} sendData={props.sendData} username={props.username} setUsername={props.setUsername} player='opponent' player1Grid={props.play1Grid}/>)
            )}
        </div>
      </column>
      <column>
        {props.playState === 'Singleplayer' ? <h1>Computer 2's Board</h1> : <h1>{props.opponentNames[props.opponent2Index]}'s board</h1>}
        <div className={`player3 board ${props.playerStatuses[props.opponent2Index]}`}  id="GameContainer3">
          {props.play3Grid.map(
            (square, index) => (<SquareOpponent square={square} key={`player3Board_${index}`} index={index} gridArray={props.play3Grid} setGridArray={props.setPlay3Grid} setTurnState={props.setTurnState} turnState={props.turnState} sendGrids={props.sendGrids} checkGameWinner={checkGameWinner} playState={props.playState} sendData={props.sendData} username={props.username} setUsername={props.setUsername} player='opponent' player1Grid={props.play1Grid}/>)
            )}
        </div>
      </column>
    </row>
    <row>
      <column>

        {props.playerStatuses[props.playerIndexState] === 'out' ? <h1>All of your ships have been destroyed!</h1> : <h1>Your Board</h1>}
        <div className={`player1 board ${props.playerStatuses[props.playerIndexState]}`} id="GameContainer1">
          {props.play1Grid.map( // maps through the array and makes a square for each of the elements in the array.
          (square, index) => (<SquareOpponent square={square} player1Grid={props.play1Grid} key={`player3Board_${index}`} index={index} gridArray={props.play3Grid} setGridArray={props.setPlay3Grid} setTurnState={props.setTurnState} turnState={props.turnState} sendGrids={props.sendGrids} checkGameWinner={checkGameWinner} playState={props.playState} sendData={props.sendData} username={props.username} setUsername={props.setUsername}  player='player' 

          />)
            )}
          </div>
        </column>
      </row>
    </div>
  );
}