import logo from './logo.svg';
import './App.css';
import { RunGame } from './SinglePlayer/RunGame';
import { RunMPGame } from './Multiplayer/RunMPGame';
import { useState } from 'react';
import { Welcome } from './Welcome';

function App() {
  const [playState, setPlayState] = useState('Welcome')
  const [testState, setTestState] = useState('')

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
    </div>
  )
}

export default App;
