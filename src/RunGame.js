import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Square } from './Square';


export function RunGame() {
  const gridArraySetup = new Array(16).fill({
    shipStatus: '0',
    hitStatus: '-'
  }) // Making an array to form the grid.
  // shipStatus to store if a boat is saved in that location
  // hitStatus to store if that location has been hit or not yet. 

  var [gridArray, setGridArray] = useState(gridArraySetup)

  const player2GridArray = new Array(16).fill({
    shipStatus: '0',
    hitStatus: '-'
  })

  var [player2GridArray2, setGridArray2] = useState(player2GridArray)


  console.log(player2GridArray2)
  console.log(gridArray)
  return (
    <div>

    
    <div className="player board" id="GameContainer">
      {gridArray.map( // maps through the array and makes a square for each of the elements in the array.
        (square, index) => (<Square square={square} index={index} gridArray={gridArray} setGridArray={setGridArray}/>) // these 'tags' of square and index pass into the 'props' within the Square class component
        )}
    </div>


    <div className="player 2 board" id="GameContainer2">
      {player2GridArray2.map(
        (square, index) => (<Square square={square} index={index} gridArray={player2GridArray2} setGridArray={setGridArray2}/>)
        )}
    </div>


    </div>
  );
  

}
