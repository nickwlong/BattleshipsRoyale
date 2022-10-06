import { useEffect, useState } from "react"
import { Square } from "./Square"
import { SquareOpponent } from "./SquareOpponent"
import { Computer } from "./Computer"


export function GameFlow(props) {
  const [turnState, setTurnState] = useState('Player1')


  return(
  <div>
    <Computer turnState={turnState} setTurnState={setTurnState} grid1Array={props.play1Grid} setGrid1Array={props.setPlay1Grid} grid2Array={props.play2Grid} setGrid2Array={props.setPlay2Grid} grid3Array={props.play3Grid} setGrid3Array={props.setPlay3Grid}/>
    <row>
      <column>
        <h1>Computer 1's Board</h1>
        <div className="player2 board" id="GameContainer2">
          {props.play2Grid.map(
            (square, index) => (<SquareOpponent square={square} key={`player2Board_${index}`} index={index} gridArray={props.play2Grid} setGridArray={props.setPlay2Grid} setTurnState={setTurnState} turnState={turnState}/>)
            )}
        </div>
      </column>
      <column>
        <h1>Computer 2's Board</h1>
        <div className="player2 board" id="GameContainer2">
          {props.play3Grid.map(
            (square, index) => (<SquareOpponent square={square} key={`player2Board_${index}`} index={index} gridArray={props.play3Grid} setGridArray={props.setPlay3Grid} setTurnState={setTurnState} turnState={turnState}/>)
            )}
        </div>
      </column>
    </row>
    <row>
      <column>
        <button onClick={() => {setTurnState('Player1')}}>Reset to Player's Turn</button>

        <h1>Your Board</h1>
        <div className="player2 board" id="GameContainer2">
          {props.play1Grid.map( // maps through the array and makes a square for each of the elements in the array.
            (square, index) => (<SquareOpponent square={square} key={`player2Board_${index}`} index={index} gridArray={props.play1Grid} setGridArray={props.setPlay1Grid} setTurnState={setTurnState} turnState={turnState}/>) // these 'tags' of square and index pass into the 'props' within the Square class component
            )}
        </div>
      </column>
    </row>
  </div>
  )
}
