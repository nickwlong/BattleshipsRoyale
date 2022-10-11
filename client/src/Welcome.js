import React from 'react';
import ReactDOM from 'react-dom';


export function Welcome({changePlayState}){
  return (
    <div className="welcome" >
    <h1>Battleships royale</h1>
      <br></br>
      <br></br>
      <button className = 'SingleplayerButton' id='BtnPlayGame' onClick={() => changePlayState('Singleplayer')}>Singleplayer Game</button>
      <button className = 'MultiplayerButton' id='BtnPlayGame' onClick={() => changePlayState('Multiplayer')}>Multiplayer Game</button>
      <br></br>
    </div>
  );
  
}