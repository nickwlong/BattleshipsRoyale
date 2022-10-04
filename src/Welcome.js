import React from 'react';
import ReactDOM from 'react-dom';


export function Welcome({changePlayState}){
  return (
    <div className="welcome" >
    <h1>Battleships royale</h1>
      <br></br>
      <br></br>
      <button id='BtnPlayGame' onClick={() => changePlayState('play')}>Click here to play the game!</button>
      <br></br>
    </div>
  );
  
}