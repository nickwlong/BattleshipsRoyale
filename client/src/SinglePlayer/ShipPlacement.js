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

  const isShip1Placed = () => {
    if(props.play1Grid.filter(square => square.shipStatus === 'ship1').length > 0) {
      shipSelected = ''
      return ''
    } else {
      return <button className="ships" id="Ship1" onClick={()=>{ SelectShip(1);}}> Ship1 </button>
    }
  }

  const isShip2Placed = () => {
    if(props.play1Grid.filter(square => square.shipStatus === 'ship2').length > 0) {
      shipSelected = ''
      return ''
    } else {
      return <button className="ships" id="Ship2" onClick={()=>{ SelectShip(2);}}> Ship2 </button>
    }
  }

  const isShip3Placed = () => {
    if(props.play1Grid.filter(square => square.shipStatus === 'ship3').length > 0) {
      shipSelected = ''
      return ''
    } else {
      return <button className="ships" id="Ship3" onClick={()=>{ SelectShip(3);}}> Ship3 </button>
    }
  }

  const isShip4Placed = () => {
    if(props.play1Grid.filter(square => square.shipStatus === 'ship4').length > 0) {
      shipSelected = ''
      return ''
    } else {
      return <button className="ships" id="Ship4" onClick={()=>{ SelectShip(4);}}> Ship4 </button>
    }
  }

  const showReadyBtn = () => {
    if (props.play1Grid.filter(square => square.shipStatus === 'ship1').length > 0 &&
      props.play1Grid.filter(square => square.shipStatus === 'ship2').length > 0 &&
      props.play1Grid.filter(square => square.shipStatus === 'ship3').length > 0 &&
      props.play1Grid.filter(square => square.shipStatus === 'ship4').length > 0) {
        return (<button className="readyBtn" onClick={()=>{ handleReadyBtnClick();}}> Ready! </button>)
      } else {return ''}


  }


  return (
    <div>
      {isShip1Placed()}
      {isShip2Placed()}
      {isShip3Placed()}
      {isShip4Placed()}
      <button className="ships" onClick={()=>{ SelectOrientation('horizontal');}}> Horizontal </button>
      <button className="ships" onClick={()=>{ SelectOrientation('vertical');}}> Vertical </button>
      {showReadyBtn()}

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