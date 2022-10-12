import React from 'react';
import ReactDOM from 'react-dom';


export function Welcome({changePlayState}){
  return (
    <div className="welcome" >
    <h1>Battleships royale</h1>
      <button className ='SingleplayerButton' id='BtnPlayGame' onClick={() => changePlayState('Singleplayer')}>Singleplayer Game</button>
      <button className ='MultiplayerButton' id='BtnPlayGame' onClick={() => changePlayState('Multiplayer')}>Multiplayer Game</button>
      <br></br>
      <br></br>
    <div className = 'MusicButtons'>
      <button className ="MusicButton" onClick={() => start()}>♫</button>
      <button className ="MuteButton" onClick={() => stop()}>🔇</button>
    </div>
  </div>
  );
  
}