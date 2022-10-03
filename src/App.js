import logo from './logo.svg';
import './App.css';
import { RunGame } from './RunGame';
import { useState } from 'react';
import { Welcome } from './Welcome';

function App() {
  const [playState, setPlayState] = useState('Welcome')

  return (
    playState === 'Welcome' ? <Welcome changePlayState={ setPlayState }/> : <RunGame />
  );
}

export default App;
