import React from 'react';
import ReactDOM from 'react-dom';
import { Square } from './Square';


export function RunGame() {
  const gridArray = new Array(16).fill("abc")

  return (
    <div className="board" id="GameContainer">
      {gridArray.map(
        (square, index) => (<Square square={`${square}`} index={`${index}`}/>)
        )}
    </div>
  );
  
}