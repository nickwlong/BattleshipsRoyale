import logo from './logo.svg';
import './App.css';
import { RunGame } from './SinglePlayer/RunGame';
import { RunMPGame } from './Multiplayer/RunMPGame';
import { useState } from 'react';
import { Welcome } from './Welcome';
import sound from './SinglePlayer/gamesound.wav'

function App() {
  const [playState, setPlayState] = useState('Welcome')
  const [testState, setTestState] = useState('')
 

    let audio = new Audio(sound)
    const start = () => {
      audio.loop = true;
      audio.play()
    }
  
    const stop = () => {
      audio.pause()
    }

  const checkPlayState = () => {
    if(playState === 'Welcome') {
      return <Welcome setPlayState={ setPlayState } setTestState={setTestState} />
    } else {
      return <RunGame playState={playState} setPlayState={setPlayState} testState={testState} />
    }
  }

  return (
    <div>
      {checkPlayState()}
      <br></br>
    <div className='MusicButtons'>
      <button className ="MusicButton" onClick={() => start()}>♫</button>
      <button className ="MuteButton" onClick={() => stop()}>🔇</button>
    </div>
    </div>
  )
}

export default App;
