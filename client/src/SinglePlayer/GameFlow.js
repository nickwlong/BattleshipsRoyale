import { useEffect, useState } from "react"
import { Square } from "./Square"
import { setTurnState, SquareOpponent } from "./SquareOpponent"
import { Computer } from "./Computer"


export function GameFlow(props) {
  const [turnState, setTurnState] = useState('Player1')

  function checkIfGameOver() {
    let numberHitsOnPlay1 = props.play1Grid.filter((square) => square.hitStatus === 'hit').length;
    let numberHitsOnPlay2 = props.play2Grid.filter((square) => square.hitStatus === 'hit').length;
    let numberHitsOnPlay3 = props.play3Grid.filter((square) => square.hitStatus === 'hit').length;
    console.log('Hits on player1 : ' + numberHitsOnPlay1)
    console.log('Hits on player2 : ' + numberHitsOnPlay2)
    console.log('Hits on player3 : ' + numberHitsOnPlay3)
  
    if ((numberHitsOnPlay1 === 3 && numberHitsOnPlay2 === 3) || (numberHitsOnPlay2 === 3 && numberHitsOnPlay3 === 3) || (numberHitsOnPlay3 === 3 && numberHitsOnPlay1 === 3)) {
      setTurnState('game-over');
  
      if (numberHitsOnPlay1 !== 3) {
        console.log('Winner is Player 1')
      }
      if (numberHitsOnPlay2 !== 3) {
        console.log('Winner is Player 2')
      }
      if (numberHitsOnPlay3 !== 3) {
        console.log('Winner is Player 3')
      }
  
      return true;
    }
  
    return false;
  };
//
  return(
  <div>
    <Computer turnState={turnState} setTurnState={setTurnState} grid1Array={props.play1Grid} setGrid1Array={props.setPlay1Grid} grid2Array={props.play2Grid} setGrid2Array={props.setPlay2Grid} grid3Array={props.play3Grid} setGrid3Array={props.setPlay3Grid}/>
    {/* computer function imports grids and turns state, and functions of setting grids and turn state */}
    <row>
      <column>
        <h1>Computer 1's Board</h1>
        <div className="player2 board" id="GameContainer2">
          {props.play2Grid.map(
            (square, index) => (<SquareOpponent checkIfGameOver={checkIfGameOver} square={square} key={`player2Board_${index}`} index={index} gridArray={props.play2Grid} setGridArray={props.setPlay2Grid} setTurnState={setTurnState} turnState={turnState}/>)
            )}
        </div>
      </column>
      <column>
        <h1>Computer 2's Board</h1>
        <div className="player2 board" id="GameContainer2">
          {props.play3Grid.map(
            (square, index) => (<SquareOpponent checkIfGameOver={checkIfGameOver} square={square} key={`player2Board_${index}`} index={index} gridArray={props.play3Grid} setGridArray={props.setPlay3Grid} setTurnState={setTurnState} turnState={turnState}/>)
            )}
        </div>
      </column>
    </row>
    <row>
      <column>
        <h1> It is {turnState}'s turn</h1>
        <button onClick={() => {setTurnState('Player1')}}>Reset to Player's Turn</button>

        <h1>Your Board</h1>
        <div className="player2 board" id="GameContainer2">
          {props.play1Grid.map( // maps through the array and makes a square for each of the elements in the array.
            (square, index) => (<Square checkIfGameOver={checkIfGameOver} square={square} key={`player1Board_${index}`} index={index} play1Grid={props.play1Grid} setPlay1Grid={props.setPlay1Grid} setTurnState={setTurnState} turnState={turnState}/>) // these 'tags' of square and index pass into the 'props' within the Square class component
            )}
        </div>
      </column>
    </row>
  </div>
  )
}
