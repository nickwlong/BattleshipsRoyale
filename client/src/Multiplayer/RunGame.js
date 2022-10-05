import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Square } from './Square';
import { SquareOpponent } from './SquareOpponent'
import { io } from "socket.io-client"

const socket = io('http://localhost:3001') // This connects the client to the server, making a 'socket'

export var shipSelected = true;
export var shipOrient = true;

var shipSelected = 'none'
var shipOrient = 'horizontal'

export function RunMPGame() {
  
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);
  const [socketid, setSocketid] = useState('');
  const [roomId, setRoomId] = useState();

  const gridArraySetup = new Array(16).fill({
    shipStatus: '0',
    hitStatus: '-'
  }) // Making an array to form the grid.
  // shipStatus to store if a boat is saved in that location
  // hitStatus to store if that location has been hit or not yet. 
  var [gridArray, setGridArray] = useState(gridArraySetup)

  const player2GridArray = new Array(16).fill({
    shipStatus: '0',
    hitStatus: '-'
  })

  //   const player2WithShips = player2GridArray.map((square, index)=>
//     index === 4 || index === 5 || index === 6 ? { ...square, shipStatus: 'ship' } : square
// );
  var [player2GridArray2, setGridArray2] = useState(player2GridArray)


  useEffect(() => {
    
    socket.on('connect', () => {
      setSocketid(socket.id)
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('receive-array', (array) => { // on receiving an update from the server, the array is set to gridArray2 (player 2's array)
      setGridArray2(array)
      console.log(array)
    })

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };

  }, [])

  const sendArray = () => { // Add this to 'onClick' functions to send the updated player array to other users
    socket.emit('playerArray', gridArray, roomId)
  }


  const handleRoomIdChange = (event) => { // Tracks changes in the RoomID form
    setRoomId(event.target.value);
  }

  const handleRoomIdSubmit = (event) => { // Submits the RoomID form
    console.log('RoomId = ' + roomId)
    event.preventDefault();
    socket.emit('join-room', roomId)
  }

  return (
    <div>
    <form onSubmit={handleRoomIdSubmit}>
      <input type='text' name='RoomId' onChange={handleRoomIdChange}/>
      <input type='submit' value="Submit Room ID"/>
    </form>
    <br></br>
    <button className="ships" id="Ship1" onClick={()=>{ SelectShip(1); sendArray()}}> Ship1 </button>
    <button className="ships" onClick={()=>{ SelectShip(2);}}> Ship2 </button>
    <button className="ships" onClick={()=>{ SelectShip(3);}}> Ship3 </button>
    <button className="ships" onClick={()=>{ SelectShip(4);}}> Ship4 </button>
    <button className="ships" onClick={()=>{ SelectOrientation('horizontal');}}> Horizontal </button>
    <button className="ships" onClick={()=>{ SelectOrientation('vertical');}}> Vertical </button>
    <h1>Your Board</h1>
    <div className="player board" id="GameContainer">
      {gridArray.map( // maps through the array and makes a square for each of the elements in the array.
        (square, index) => (<Square square={square} key={`player1Board_${index}`} index={index} gridArray={gridArray} setGridArray={setGridArray}/>) // these 'tags' of square and index pass into the 'props' within the Square class component
        )}
    </div>

    <h1>Player 2's Board</h1>
    <div className="player2 board" id="GameContainer2">
      {player2GridArray2.map(
        (square, index) => (<SquareOpponent square={square} key={`player2Board_${index}`} index={index} gridArray={player2GridArray2} setGridArray={setGridArray2}/>)
        )}
    </div>

    <div style={{background: 'white'}}>
        <p>Connected: { '' + isConnected + ' with id' + socketid }</p>
    </div>


    </div>
  );
}

function SelectShip(shiptype){

  if (shiptype === 1){

  shipSelected = 'ship1';

  } else if (shiptype === 2){

    shipSelected = 'ship2';

  } else if (shiptype === 3){

    shipSelected = 'ship3';

  } else if (shiptype === 4){

    shipSelected = 'ship4';

  }

}

function SelectOrientation(shipOrientation){
  if (shipOrientation === 'horizontal') {
    shipOrient = 'horizontal'
  } else if (shipOrientation === 'vertical'){
    shipOrient = 'vertical'
  }
}