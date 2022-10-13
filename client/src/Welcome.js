import React from 'react';
import ReactDOM from 'react-dom';
import sound from './SinglePlayer/gamesound.wav'



export function Welcome(props){

  let audio = new Audio(sound)
  const start = () => {
    audio.loop = true;
    audio.play()
  
  }

  const stop = () => {
    audio.pause()
  }
  return (
    <div className="welcome" >
    <h1>Battleships royale</h1>
      <button className ='SingleplayerButton' id='BtnPlayGameSP' onClick={() => props.setPlayState('Singleplayer')}>Singleplayer Game</button>
      <button className ='MultiplayerButton' id='BtnPlayGameMP' onClick={() => props.setPlayState('Multiplayer')}>Multiplayer Game</button>
      <button className ='SingeplayerButton Test' id='BtnPlayGameTest' style={{display: 'block'}} onClick={() => {props.setPlayState('Singleplayer'); props.setTestState('test')}}>Test</button>
      <br></br>
      <br></br>
    <div className = 'MusicButtons'>
      <button className ="MusicButton" onClick={() => start()}>♫</button>
      <button className ="MuteButton" onClick={() => stop()}>🔇</button>
    </div>
  </div>
  );
  
}