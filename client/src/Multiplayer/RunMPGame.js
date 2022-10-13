import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Square } from '../SinglePlayer/Square';
import { SquareOpponent } from '../SinglePlayer/SquareOpponent'
import { io } from "socket.io-client"
import { socket } from '../SinglePlayer/RunGame';
import { Chatbox } from './Chatbox';


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

    socket.emit('join-room', props.roomId, props.username, (response) => {
      console.log(response)
      if(response.status === 'room full'){
        alert('The room is already full! Join another')
        return null
      } else if(response.status === 'ok') {
        const handleRoomForm = document.getElementById('roomIdForm')
        handleRoomForm.style.display = 'none'
    
        alert(`You have joined room: ${props.roomId}`)
    
        const connectedStatus = document.getElementById('connectedStatus2')
        connectedStatus.innerText=`You are connected to room: ${props.roomId} with username: ${props.username}`
      }
    })
  }

  return (
    <div>
    <row>
      <column style={{flex: "100%"}}>
        <div>
        <br></br>
          <form id='roomIdForm' onSubmit={handleRoomIdSubmit}>
          <div className='RoomID-div'>
            <label style={{fontFamily: "Copperplate", "Papyrus":  "fantasy", fontSize: '30px', padding: '16px', color:'#ffffff'}}>Room id:</label>
            <input className='input-box' style={{padding: '10px', fontSize: '20px'}}type='text' name='RoomId' id='RoomIdinput' onChange={handleRoomIdChange}/>
          </div>
          <div className='Username-div'>
            <label style={{fontFamily: "Copperplate", "Papyrus":  "fantasy", fontSize: '30px', color:'#ffffff'}}>Username: </label>
            <input className='input-box' style={{padding: '10px', fontSize: '20px'}} type='text' name='username' onChange={handleUsernameChange}/>
          </div>  

            <input  className="SubmitRoom"style={{fontFamily: "Copperplate", "Papyrus":  "fantasy", fontSize: '25px'}} type='submit' value=" Submit Room ID"/>
          </form>
        
          <div style={{background:'transparent', fontFamily: "Copperplate", "Papyrus":  "fantasy", fontSize: '25px', color:'#ffffff'}}>
              <div className='connection-status' id='connectedStatus'>Connected: { '' + props.isConnected + ' with id ' + socket.id }</div>
              <div id='connectedStatus2'></div>
              <h2 className={`joinRoom playersJoined${props.opponentNames.length}`}>Join a room</h2>
              <div className='players-connected'>
              <div className={`otherConnectedStatus three${props.opponentNames.length}`}>Players connected: {props.opponentNames.length}</div>
              </div>
          </div>
        </div>
      </column>
    </row>
    
    </div>
  );
}
