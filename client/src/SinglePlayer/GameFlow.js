import { Square } from "./Square"
import { SquareOpponent } from "./SquareOpponent"


export function GameFlow(props) {
  return(
  <div>
    <row>
      <column>
        <h1>Computer 1's Board</h1>
        <div className="player2 board" id="GameContainer2">
          {props.play2Grid.map(
            (square, index) => (<SquareOpponent square={square} key={`player2Board_${index}`} index={index} gridArray={props.play2Grid} setGridArray={props.setPlay2Grid}/>)
            )}
        </div>
      </column>
      <column>
        <h1>Computer 2's Board</h1>
        <div className="player2 board" id="GameContainer2">
          {props.play3Grid.map(
            (square, index) => (<SquareOpponent square={square} key={`player2Board_${index}`} index={index} gridArray={props.play3Grid} setGridArray={props.setPlay3Grid}/>)
            )}
        </div>
      </column>
    </row>
    <row>
      <column>
        <h1>Your Board</h1>
        <div className="player board" id="GameContainer">
          {props.play1Grid.map( // maps through the array and makes a square for each of the elements in the array.
            (square, index) => (<Square square={square} key={`player1Board_${index}`} index={index} play1Grid={props.play1Grid} setPlay1Grid={props.setPlay1Grid}/>) // these 'tags' of square and index pass into the 'props' within the Square class component
            )}
        </div>
      </column>
    </row>
  </div>
  )
}
