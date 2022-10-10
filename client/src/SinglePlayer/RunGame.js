import React, { useState, useEffect } from 'react';
import { ShipPlacement } from './ShipPlacement';
import { GameFlow } from './GameFlow';
import { RunMPGame } from '../Multiplayer/RunMPGame';
import { io } from "socket.io-client"


export const socket = io('http://localhost:3001') // This connects the client to the server, making a 'socket'

export function RunGame(props) {
  const [socketid, setSocketid] = useState('');
  const [roomId, setRoomId] = useState();
  const [readyState, setReadyState] = useState(false)
  const [playerIndexState, setPlayerIndex] = useState()
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [turnState, setTurnState] = useState("Player1");


  useEffect(() => {


    console.log(socket.id)
    setSocketid(socket.id)
    setIsConnected(true);
    
  
    socket.on('disconnect', () => {
      setIsConnected(false);
    });
  
    socket.on('playerJoinedRoom', message => {console.log(message)})
  

  }, [])

  const defaultPlayersStatus = [
    {
      playerNumber: 1,
      socketid: '',
      hasShipsPlaced: false,
      hasAllShipsDestroyed: false,
    },
    {
      playerNumber: 2,
      socketid: '',
      hasShipsPlaced: false,
      hasAllShipsDestroyed: false,
    },
    {
      playerNumber: 3,
      socketid: '',
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
    console.log('Sending updated grid')
  }

  function sendData() {
    // if index 0 is local player, local1 = server1, local2 = server2, local3 = server3
    // if index 1 is local player, local1 = server2, local2 = server1, local3 = server3
    // if index 2 is local player, local1 = server3, local2 = server1, local3 = server2
    // Add local 2 to an array, then add local 3 to an array, then add local 1 to array. 
    // Then array.splice to move the local1 to the playerIndex location.
    // This creates an array of player grids that matches the player order in the server!

    let arrayOfPlayerGrids = []

    arrayOfPlayerGrids.push(play2Grid)
    arrayOfPlayerGrids.push(play3Grid)
    arrayOfPlayerGrids.splice(playerIndexState, 0, play1Grid)
    console.log(arrayOfPlayerGrids)

    socket.emit('sendData', roomId, arrayOfPlayerGrids[0], arrayOfPlayerGrids[1], arrayOfPlayerGrids[2]) // arrayOfGrids[0] is serverPlayer1, arr..[1] is serverPlayer2, arr..[2] is serverPlayer3
  };

  socket.on('receiveData', (room) => {
    console.log('Room:' + JSON.stringify({room}))
    let arrayOfGrids = []
    arrayOfGrids.push(room.play1Grid)
    arrayOfGrids.push(room.play2Grid)
    arrayOfGrids.push(room.play3Grid)
    // index 0 is server's player 1, index 1 is server's player 2, index 2 is server's player 3

    let playerIndex = room.sockets.findIndex(socket => socket === socketid) // finds the local player's index from inside the server's sockets array
    setPlayerIndex(playerIndex)

    let localPlayerGrid = arrayOfGrids.splice(playerIndex, 1)[0] // removes the playerGrid from the array
    let localPlayer2 = arrayOfGrids[0]
    let localPlayer3 = arrayOfGrids[1]
    setPlay1Grid(localPlayerGrid)
    setPlay2Grid(localPlayer2)
    setPlay3Grid(localPlayer3)

  })



  socket.on('allPlayersReadyMessage', (readyStatus) => {
    console.log(readyStatus)
    if(readyStatus === 'allPlayersReady') {

      setTimeout(() => {
        setReadyState('true')
        
      }, 2000);
    }
  })


  return (
    <div>
      {props.playState==='Multiplayer' ? <RunMPGame socketid={socketid} setSocketid={setSocketid} roomId={roomId} setRoomId={setRoomId} isConnected={isConnected}/> : ''}
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
        sendData={sendData}
        /> : <ShipPlacement play1Grid={play1Grid} setPlay1Grid={setPlay1Grid} setReadyState={setReadyState} readyState={readyState} sendPlayerReadyGrid={sendPlayerReadyGrid} playState={props.playState}/>}
    </div>
  );
}
