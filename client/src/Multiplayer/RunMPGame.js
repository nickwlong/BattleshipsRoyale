import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Square } from '../SinglePlayer/Square';
import { SquareOpponent } from '../SinglePlayer/SquareOpponent'
import { io } from "socket.io-client"
import { socket } from '../SinglePlayer/RunGame';


export function RunMPGame(props) {
  
  const handleRoomIdChange = (event) => { // Tracks changes in the RoomID form
    props.setRoomId(event.target.value);
  }

  const handleUsernameChange = (event) => { // Tracks changes in the RoomID form
    props.setUsername(event.target.value);
  }

  const handleRoomIdSubmit = (event) => { // Submits the RoomID form
    console.log('RoomId = ' + props.roomId + ', Username: ' + props.username)
    event.preventDefault();

    socket.emit('join-room', props.roomId, props.username)
    

    const handleRoomForm = document.getElementById('roomIdForm')
    handleRoomForm.style.display = 'none'

    alert(`You have created room: ${props.roomId}`)

    const connectedStatus = document.getElementById('connectedStatus2')
    connectedStatus.innerText=`You are connected to room: ${props.roomId} with username: ${props.username}`
  }

  return (
    <row>
      <column style={{flex: "70%"}}>
        <div>
          <form id='roomIdForm' onSubmit={handleRoomIdSubmit}>
            <label>Room id:</label>
            <input type='text' name='RoomId' id='RoomIdinput' onChange={handleRoomIdChange}/>
            <label>Username:</label>
            <input type='text' name='username' onChange={handleUsernameChange}/>
            <input type='submit' value="Submit Room ID"/>
          </form>
          <br></br>
          

          <div style={{background: 'white'}}>
              <p id='connectedStatus'>Connected: { '' + props.isConnected + ' with id ' + socket.id }</p>
              <p id='connectedStatus2'></p>
          </div>
        </div>
      </column>
      <column style={{flex: "20%", padding: "20px", background: "white"}}>
        <h2 className={`otherConnectedStatus two${props.opponentNames.length}`}>Player 2 connected</h2>
        <h2 className={`otherConnectedStatus three${props.opponentNames.length}`} >Player 3 connected</h2>
      </column>
    </row>
  );
}
