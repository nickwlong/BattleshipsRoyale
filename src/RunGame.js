import React from 'react';
import ReactDOM from 'react-dom';
import { Square } from './Square';


export function RunGame() {
  const gridArray = new Array(16).fill({
    shipStatus: '0',
    hitStatus: '-'
  }) // Making an array to form the grid.
  // shipStatus to store if a boat is saved in that location
  // hitStatus to store if that location has been hit or not yet. 

  const player2GridArray = []
  const player3GridArray = []

  return (
    <div className="player board" id="GameContainer">
      {gridArray.map( // maps through the array and makes a square for each of the elements in the array.
        (square, index) => (<Square square={`${square}`} index={`${index}`}/>) // these 'tags' of square and index pass into the 'props' within the Square class component
        )}
    </div>
  );
  
}