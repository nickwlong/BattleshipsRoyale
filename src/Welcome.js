import React from 'react';
import ReactDOM from 'react-dom';


export function Welcome({changePlayState}){
  return (
    <div className="welcome" >
      <button onClick={() => changePlayState('play')}>Click here to play the game!</button>
    </div>
  );
  
}