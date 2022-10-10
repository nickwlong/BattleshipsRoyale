import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Square } from '../SinglePlayer/Square';
import { SquareOpponent } from '../SinglePlayer/SquareOpponent'
import { io } from "socket.io-client"
import { socket } from '../SinglePlayer/RunGame';


export function RunMPGame(props) {
  
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

    alert(`You have created room: ${props.roomId}`)

    const connectedStatus = document.getElementById('connectedStatus2')
    connectedStatus.innerText=`You are connected to room: ${props.roomId}`
  }


  return (
    <div>
      <form id='roomIdForm' onSubmit={handleRoomIdSubmit}>
        <input type='text' name='RoomId' onChange={handleRoomIdChange}/>
        <input type='submit' value="Submit Room ID"/>
      </form>
      <br></br>
      

      <div style={{background: 'white'}}>
          <p id='connectedStatus'>Connected: { '' + props.isConnected + ' with id ' + socket.id }</p>
          <p id='connectedStatus2'></p>
      </div>
    </div>
  );
}
