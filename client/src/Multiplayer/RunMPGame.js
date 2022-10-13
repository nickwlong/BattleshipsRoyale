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
            <label style={{fontFamily: "Copperplate", "Papyrus":  "fantasy", fontSize: '25px' , alignContent: 'center'}}>Room id: </label>
            <input type='text' name='RoomId' id='RoomIdinput' onChange={handleRoomIdChange}/>
            <label style={{fontFamily: "Copperplate", "Papyrus":  "fantasy", fontSize: '25px' }}> Username: </label>
            <br></br>
            <br></br>
            <input type='text' name='username' onChange={handleUsernameChange}/>
            <br></br>
            <br></br>
            <input style={{fontFamily: "Copperplate", "Papyrus":  "fantasy", fontSize: '25px' }} type='submit' value=" Submit Room ID"/>
          </form>
          <br></br>
          

          <div style={{background:'transparent', fontFamily: "Copperplate", "Papyrus":  "fantasy", fontSize: '25px' }}>
              <p id='connectedStatus'>Connected: { '' + props.isConnected + ' with id ' + socket.id }</p>
              <p id='connectedStatus2'></p>
          </div>
        </div>
      </column>
      <column style={{flex: "20%", padding: "20px", background: "transparent", fontFamily: "Copperplate", "Papyrus":  "fantasy"}}>
        <h2 className={`joinRoom playersJoined${props.opponentNames.length}`}>Join a room</h2>
        <h2 className={`otherConnectedStatus three${props.opponentNames.length}`}>Players connected: {props.opponentNames.length}</h2>
      </column>
    </row>
  );
}
