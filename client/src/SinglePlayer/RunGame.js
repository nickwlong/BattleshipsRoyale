import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { ShipPlacement } from './ShipPlacement';
import { GameFlow } from './GameFlow';
import { SquareOpponent } from './SquareOpponent'

export function RunGame() {
  const [readyState, setReadyState] = useState(false)
  const play1GridSetup = new Array(16).fill({
    shipStatus: '0',
    hitStatus: '-'
  }) // Making an array to form the grid.
  // shipStatus to store if a boat is saved in that location
  // hitStatus to store if that location has been hit or not yet. 
  var [play1Grid, setPlay1Grid] = useState(play1GridSetup)

  const play2GridSetup = new Array(16).fill({
    shipStatus: '0',
    hitStatus: '-'
  })

  const play2GridSetupShips = play2GridSetup.map((square, index)=>
    index === 4 || index === 5 || index === 6 ? { ...square, shipStatus: 'ship' } : square
  );
  var [play2Grid, setPlay2Grid] = useState(play2GridSetupShips)

  const play3GridSetupShips = play2GridSetup.map((square, index)=>
  index === 12 || index === 13 || index === 14 ? { ...square, shipStatus: 'ship' } : square
  );
  var [play3Grid, setPlay3Grid] = useState(play3GridSetupShips)
  console.log('Play1 Grid')
  console.log(play1Grid)
  

  return (
    <div>
      {readyState ? <GameFlow 
        play1Grid={play1Grid} 
        setPlay1Grid={setPlay1Grid} 
        play2Grid={play2Grid} 
        setPlay2Grid={setPlay2Grid} 
        play3Grid={play3Grid} 
        setPlay3Grid={setPlay3Grid}   
        /> : <ShipPlacement play1Grid={play1Grid} setPlay1Grid={setPlay1Grid} setReadyState={setReadyState} readyState={readyState}/>}
    </div>
  );
}
