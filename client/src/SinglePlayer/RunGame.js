import React, { useState } from 'react';
import { ShipPlacement } from './ShipPlacement';
import { GameFlow } from './GameFlow';
import { RunMPGame } from '../Multiplayer/RunMPGame';
import { socket } from "../Multiplayer/RunMPGame"


export function RunGame(props) {
  const [socketid, setSocketid] = useState('');
  const [roomId, setRoomId] = useState();
  const [readyState, setReadyState] = useState(false)

  const defaultPlayersStatus = [
    {
      playerNumber: 1,
      socketid: '',
      username: '',
      hasShipsPlaced: false,
      hasAllShipsDestroyed: false,
    },
    {
      playerNumber: 2,
      socketid: '',
      username: '',
      hasShipsPlaced: false,
      hasAllShipsDestroyed: false,
    },
    {
      playerNumber: 3,
      socketid: '',
      username: '',
      hasShipsPlaced: false,
      hasAllShipsDestroyed: false,
    }
  ]

  const [playersStatus, setPlayersStatus] = useState()



  const playerGridSetup = new Array(16).fill({
    shipStatus: '0',
    hitStatus: '-'
  }) // Making an array to form the grid.
  // shipStatus to store if a boat is saved in that location
  // hitStatus to store if that location has been hit or not yet. 
  var [play1Grid, setPlay1Grid] = useState(playerGridSetup)

  const play2GridSetupShips = () => { if (props.playState==='Singleplayer') {return playerGridSetup.map((square, index)=>
    index === 4 || index === 5 || index === 6 ? { ...square, shipStatus: 'ship' } : square
  )} else {return playerGridSetup}};
  var [play2Grid, setPlay2Grid] = useState(play2GridSetupShips)

  const play3GridSetupShips = () => { if (props.playState==='Singleplayer') {return playerGridSetup.map((square, index)=>
    index === 8 || index === 9 || index === 10 ? { ...square, shipStatus: 'ship' } : square
  )} else {return playerGridSetup}};
  var [play3Grid, setPlay3Grid] = useState(play3GridSetupShips)

  function sendPlayerReadyGrid() { // Add this to 'onClick' functions to send the updated player array to other users
    if (props.playState === 'Multiplayer') {socket.emit('playerGridReady', play1Grid, roomId)}
    console.log(play1Grid)
    console.log(roomId)
    console.log('sending updated grid')
  }

  return (
    <div>
      {props.playState==='Multiplayer' ? <RunMPGame socketid={socketid} setSocketid={setSocketid} roomId={roomId} setRoomId={setRoomId}/> : ''}
      {readyState ? <GameFlow 
        sendGrids={sendPlayerReadyGrid}
        playState={props.playState}
        play1Grid={play1Grid} 
        setPlay1Grid={setPlay1Grid} 
        play2Grid={play2Grid} 
        setPlay2Grid={setPlay2Grid} 
        play3Grid={play3Grid} 
        setPlay3Grid={setPlay3Grid}  
        roomId={roomId} 
        setRoomId={setRoomId} 
        /> : <ShipPlacement play1Grid={play1Grid} setPlay1Grid={setPlay1Grid} setReadyState={setReadyState} readyState={readyState} sendPlayerReadyGrid={sendPlayerReadyGrid}/>}
    </div>
  );
}
