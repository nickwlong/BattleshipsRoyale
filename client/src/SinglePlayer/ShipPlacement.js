import { Square } from './Square';

export var shipSelected = true;
export var shipOrient = true;

var shipSelected = 'none'
var shipOrient = 'horizontal'

export function ShipPlacement(props) {
  const handleReadyBtnClick = () => {
    props.setReadyState(true)
    shipSelected = ''
  }


  return (
    <div>
      <button className="ships" id="Ship1" onClick={()=>{ SelectShip(1);}}> Ship1 </button>
      <button className="ships" onClick={()=>{ SelectShip(2);}}> Ship2 </button>
      <button className="ships" onClick={()=>{ SelectShip(3);}}> Ship3 </button>
      <button className="ships" onClick={()=>{ SelectShip(4);}}> Ship4 </button>
      <button className="ships" onClick={()=>{ SelectOrientation('horizontal');}}> Horizontal </button>
      <button className="ships" onClick={()=>{ SelectOrientation('vertical');}}> Vertical </button>
      <button className="readyBtn" onClick={()=>{ handleReadyBtnClick();}}> Ready! </button>

      <h1>Your Board</h1>
      <div className="player board" id="GameContainer">
        {props.play1Grid.map( // maps through the array and makes a square for each of the elements in the array.
          (square, index) => (<Square square={square} key={`player1Board_${index}`} index={index} play1Grid={props.play1Grid} setPlay1Grid={props.setPlay1Grid} readyState={props.readyState}/>) // these 'tags' of square and index pass into the 'props' within the Square class component
          )}
      </div>
    </div>
  )
}


function SelectShip(shiptype){

  if (shiptype === 1){

  shipSelected = 'ship1';

  } else if (shiptype === 2){

    shipSelected = 'ship2';

  } else if (shiptype === 3){

    shipSelected = 'ship3';

  } else if (shiptype === 4){

    shipSelected = 'ship4';

  }

}

function SelectOrientation(shipOrientation){
  if (shipOrientation === 'horizontal') {
    shipOrient = 'horizontal'
  } else if (shipOrientation === 'vertical'){
    shipOrient = 'vertical'
  }
}