import React from 'react';
import ReactDOM from 'react-dom';
import sound from './SinglePlayer/gamesound.wav'



export function Welcome(props){

  
  return (
    <div className="welcome" >
    <h1>Battleships royale</h1>
        <div className='Player-mode'>
          <button className ='SingleplayerButton' id='BtnPlayGameSP' onClick={() => props.setPlayState('Singleplayer')}>Singleplayer Game</button>
          <button className ='MultiplayerButton' id='BtnPlayGameMP' onClick={() => props.setPlayState('Multiplayer')}>Multiplayer Game</button>
          <button className ='SingeplayerButton Test' id='BtnPlayGameTest' style={{display: 'none'}} onClick={() => {props.setPlayState('Singleplayer'); props.setTestState('test')}}>Test</button>
        </div>
      <br></br>
      <br></br>
    </div>

  );
  
}