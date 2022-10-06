import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Square } from '../SinglePlayer/Square';
import { SquareOpponent } from '../SinglePlayer/SquareOpponent'
import { io } from "socket.io-client"

export const socket = io('http://localhost:3001') // This connects the client to the server, making a 'socket'

export function RunMPGame(props) {
  
  const [isConnected, setIsConnected] = useState(socket.connected);
  
    socket.on('connect', async () => {
      props.setSocketid(socket.id)
      console.log(socket.id)
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('receive-array', (play1Grid, play2Grid, play3Grid) => { // on receiving an update from the server, the array is set to gridArray2 (player 2's array)
      props.setPlay1Grid(play1Grid)
      props.setPlay2Grid(play2Grid)
      props.setPlay3Grid(play3Grid)
      console.log('Grids have been updated')
    })


  const handleRoomIdChange = (event) => { // Tracks changes in the RoomID form
    props.setRoomId(event.target.value);
    console.log(props.roomId)
  }

  const handleRoomIdSubmit = (event) => { // Submits the RoomID form
    console.log('RoomId = ' + props.roomId)
    event.preventDefault();
    socket.emit('join-room', props.roomId)
    const handleRoomForm = document.getElementById('roomIdForm')
    handleRoomForm.style.display = 'none'
    alert(`You have joined room: ${props.roomId}`)
  }

  return (
    <div>
      <form id='roomIdForm' onSubmit={handleRoomIdSubmit}>
        <input type='text' name='RoomId' onChange={handleRoomIdChange}/>
        <input type='submit' value="Submit Room ID"/>
      </form>
      <br></br>
      

      <div style={{background: 'white'}}>
          <p>Connected: { '' + isConnected + ' with id ' + socket.id }</p>
      </div>
    </div>
  );
}
