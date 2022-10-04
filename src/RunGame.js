import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Square } from './Square';

export var shipSelected = true;
export var shipOrient = true;

var shipSelected = 'none'
var shipOrient = 'horizontal'

export function RunGame() {
  const gridArraySetup = new Array(16).fill({
    shipStatus: '0',
    hitStatus: '-'
  }) // Making an array to form the grid.
  // shipStatus to store if a boat is saved in that location
  // hitStatus to store if that location has been hit or not yet. 

  var [gridArray, setGridArray] = useState(gridArraySetup)
  const player2GridArray = []
  const player3GridArray = []
  
  return (
    <div>
    <button className="ships" onClick={()=>{ SelectShip(1);}}> Ship1 </button>
    <button className="ships" onClick={()=>{ SelectShip(2);}}> Ship2 </button>
    <button className="ships" onClick={()=>{ SelectShip(3);}}> Ship3 </button>
    <button className="ships" onClick={()=>{ SelectShip(4);}}> Ship4 </button>
    <button className="ships" onClick={()=>{ SelectOrientation('horizontal');}}> Horizontal </button>
    <button className="ships" onClick={()=>{ SelectOrientation('vertical');}}> Vertical </button>
    <div className="player board" id="GameContainer">
      {gridArray.map( // maps through the array and makes a square for each of the elements in the array.
        (square, index) => (<Square square={square} index={index} gridArray={gridArray} setGridArray={setGridArray}/>) // these 'tags' of square and index pass into the 'props' within the Square class component
        )}
    </div>
    </div>
  );
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