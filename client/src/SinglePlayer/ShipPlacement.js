import { Square } from './Square';

export var shipSelected = true;
export var shipOrient = true;

var shipSelected = 'none'
var shipOrient = 'horizontal'
var hidAllButtons = false;

export function ShipPlacement(props) {
  const handleReadyBtnClick = () => {
    props.sendPlayerReadyGrid()
    shipSelected = ''
    if(props.playState === 'Singleplayer'){props.setReadyState('play')}
  }

  const isShip2Placed = () => {
    if(props.play1Grid.filter(square => square.shipStatus === 'ship2').length > 0) {
      shipSelected = ''
      return ''
    } else {
      return <button className="ships" id="Ship2" onClick={()=>{ SelectShip(2);}}> Destroyer(2) </button>
    }
  }

  const isShip31Placed = () => {
    if(props.play1Grid.filter(square => square.shipStatus === 'ship31').length > 0) {
      shipSelected = ''
      return ''
    } else {
      return <button className="ships" id="Ship31" onClick={()=>{ SelectShip(31);}}> Cruiser(3) </button>
    }
  }

  const isShip32Placed = () => {
    if(props.play1Grid.filter(square => square.shipStatus === 'ship32').length > 0) {
      shipSelected = ''
      return ''
    } else {
      return <button className="ships" id="Ship32" onClick={()=>{ SelectShip(32);}}> Submarine(3) </button>
    }
  }

  const isShip4Placed = () => { 
    if(props.play1Grid.filter(square => square.shipStatus === 'ship4').length > 0) {
      shipSelected = ''
      return ''
    } else {
      return <button className="ships" id="Ship4" onClick={()=>{ SelectShip(4);}}> Battleship(4) </button>
    }
  }

  const isShip5Placed = () => {
    if(props.play1Grid.filter(square => square.shipStatus === 'ship5').length > 0) {
      shipSelected = ''
      return ''
    } else {
      return <button className="ships" id="Ship5" onClick={()=>{ SelectShip(5);}}> Carrier(5) </button>
    }
  }

  const showReadyBtn = () => {
    // if (props.play1Grid.filter(square => square.shipStatus === 'ship2').length > 0 &&
    //   props.play1Grid.filter(square => square.shipStatus === 'ship31').length > 0 &&
    //   props.play1Grid.filter(square => square.shipStatus === 'ship32').length > 0 &&
    //   props.play1Grid.filter(square => square.shipStatus === 'ship4').length > 0 &&
    //   props.play1Grid.filter(square => square.shipStatus === 'ship5').length > 0) {

        return (<button className="readyBtn" onClick={()=>{ handleReadyBtnClick(); hideAllBtn()}}> Ready! </button>)
      // } else {return ''}
  }

  const hideAllBtn = () => {
    let resetBtn = document.getElementById('resetBtn')
    resetBtn.style.display = 'none'
    let horizontalBtn = document.getElementById('horizontalBtn')
    horizontalBtn.style.display = 'none'
    let verticalBtn = document.getElementById('verticalBtn')
    verticalBtn.style.display = 'none'
    hidAllButtons = true;
  }

  const playerGridSetup = new Array(49).fill({
    shipStatus: '0',
    hitStatus: '-'
  })

  // const showWaitingForOthers = () => {
  //   console.log(hidAllButtons)
  //   if (hidAllButtons === true){
  //     return (<div className="waiting"> Waiting for others </div>)
  //   }
  // }


  return (
    <div>
      {isShip2Placed()}
      {isShip31Placed()}
      {isShip32Placed()}
      {isShip4Placed()}
      {isShip5Placed()}
      {/* functions above are called for each ship button, checks the array if it exists, if it does nothing is shown, if not it shows the respective ship button */}
      <button className="ships" id="horizontalBtn" onClick={()=>{ SelectOrientation('horizontal');}}> Horizontal </button>
      <button className="ships" id="verticalBtn" onClick={()=>{ SelectOrientation('vertical');}}> Vertical </button>
      <button className="ships" id="resetBtn" onClick={()=>{ props.setPlay1Grid(playerGridSetup);}}> Reset all ship places </button>
      {showReadyBtn()}
      {/* {showWaitingForOthers()} */}

      <h1 className='boardTitle'>Your Board</h1>
      <br></br>
      <div className="shipPlacement-PlayerBoard" id="GameContainer">
        {props.play1Grid.map( // maps through the array and makes a square for each of the elements in the array.
          (square, index) => (<Square square={square} key={`player1Board_${index}`} index={index} play1Grid={props.play1Grid} setPlay1Grid={props.setPlay1Grid} readyState={props.readyState}/>) // these 'tags' of square and index pass into the 'props' within the Square class component
          )}
      </div>
    </div>
  )
}


function SelectShip(shiptype){

  if (shiptype === 2){

    shipSelected = 'ship2';

  } else if (shiptype === 31){

    shipSelected = 'ship31';

  } else if (shiptype === 32){

    shipSelected = 'ship32';

  } else if (shiptype === 4){

    shipSelected = 'ship4';

  } else if (shiptype === 5){

    shipSelected = 'ship5';

  }

}

function SelectOrientation(shipOrientation){
  if (shipOrientation === 'horizontal') {
    shipOrient = 'horizontal'
  } else if (shipOrientation === 'vertical'){
    shipOrient = 'vertical'
  }
}