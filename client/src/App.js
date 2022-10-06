import logo from './logo.svg';
import './App.css';
import { RunGame } from './SinglePlayer/RunGame';
import { RunMPGame } from './Multiplayer/RunMPGame';
import { useState } from 'react';
import { Welcome } from './Welcome';

function App() {
  const [playState, setPlayState] = useState('Welcome')

  const checkPlayState = () => {
    if(playState === 'Welcome') {
      return <Welcome changePlayState={ setPlayState }/>
    } else {
      return <RunGame playState={playState}/>
    }
  }

  return (
    <div>
      {checkPlayState()}
    </div>
  )
}

export default App;
