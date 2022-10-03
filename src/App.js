import logo from './logo.svg';
import './App.css';
import { RunGame } from './RunGame';

function App() {

  const gridArray = new Array(16).fill("abc")
  return (
    <div className="board" id="GameContainer">
      {gridArray.map(
        (square, index) => (<RunGame square={`${square}`} index={`${index}`}/>)
        )}
    </div>
  );
}

export default App;
