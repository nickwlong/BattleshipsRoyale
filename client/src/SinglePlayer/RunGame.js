import React, { useState, useEffect } from 'react';
import { ShipPlacement } from './ShipPlacement';
import { GameFlow } from './GameFlow';
import { RunMPGame } from '../Multiplayer/RunMPGame';
import { io } from "socket.io-client"


export const socket = io('http://localhost:3001') // This connects the client to the server, making a 'socket'

export function RunGame(props) {
  const [socketid, setSocketid] = useState('');
  const [roomId, setRoomId] = useState();
  const [readyState, setReadyState] = useState('pending')
  const [playerIndexState, setPlayerIndex] = useState()
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [turnState, setTurnState] = useState('Player 1');
  const [username, setUsername] = useState('');
  const [opponentNames, setOpponentNames] = useState('');


  useEffect(() => {
    console.log(socket.id)
    setSocketid(socket.id)
    setIsConnected(true);
  
    socket.on('disconnect', () => {
      setIsConnected(false);
    });
  
    socket.on('playerJoinedRoom', message => {console.log(message)})
  
    if(props.playState === 'Singleplayer') {setReadyState('placement')}

  }, [])

  useEffect(() => {
    console.log(turnState)

  }, [turnState])



  const playerGridSetup = new Array(49).fill({
    shipStatus: '0',
    hitStatus: '-'
  }) // Making an array to form the grid.
  // shipStatus to store if a boat is saved in that location
  // hitStatus to store if that location has been hit or not yet. 
  var [play1Grid, setPlay1Grid] = useState(playerGridSetup)

  var play2GridSetupShips = () => {return playerGridSetup}
  var play3GridSetupShips = () => {return playerGridSetup}


  //randomly pick 2 arrays for computer 1 and computer 2 to place ships
  let presetPicked1 = Math.floor(Math.random() * 7);
  let presetPicked2 = Math.floor(Math.random() * 7);

  const presetArray = [[7,8,18,25,32,39,40,41,3,4,5,6,16,23,30,37,44],
  [1,2,6,13,20,15,22,29,24,25,26,27,37,38,39,40,41],
  [26,27,23,30,37,4,5,6,8,9,10,11,44,45,46,47,48],
  [23,24,5,12,29,0,7,14,38,39,40,41,15,22,29,36,43],
  [28,29,2,9,16,0,7,14,13,20,27,34,4,11,18,25,32],
  [3,10,43,44,45,33,40,47,17,18,19,20,1,8,15,22,29],
  [30,31,0,1,2,21,28,35,9,10,11,12,20,27,34,41,48]];

  const presetPickedC1 = presetArray[presetPicked1];
  const presetPickedC2 = presetArray[presetPicked2];

//places the ships based on the numbers in the array picked
  play2GridSetupShips = () => { if (props.playState==='Singleplayer') {
    return playerGridSetup.map((square, index)=>{
      if ([presetPickedC1[0],presetPickedC1[1]].includes(index)){
        return {
          ...square,
          shipStatus: 'ship2C',
          shipPreset: 'ship'
        };
      } else if([presetPickedC1[2],presetPickedC1[3],presetPickedC1[4]].includes(index)){
        return {
          ...square,
          shipStatus: 'ship31C',
          shipPreset: 'ship'
        };
      } else if([presetPickedC1[5],presetPickedC1[6],presetPickedC1[7]].includes(index)){
        return {
          ...square,
          shipStatus: 'ship32C',
          shipPreset: 'ship'
        };
      } else if([presetPickedC1[8],presetPickedC1[9],presetPickedC1[10],presetPickedC1[11]].includes(index)){
        return {
          ...square,
          shipStatus: 'ship4C',
          shipPreset: 'ship'
        };
      } else if([presetPickedC1[12],presetPickedC1[13],presetPickedC1[14],presetPickedC1[15],presetPickedC1[16]].includes(index)){
        return {
          ...square,
          shipStatus: 'ship5C',
          shipPreset: 'ship'
        };
      } else {
        return square
      }
    }
  )} else {return playerGridSetup}};

  var [play2Grid, setPlay2Grid] = useState(play2GridSetupShips)


  play3GridSetupShips = () => { if (props.playState==='Singleplayer') {
    return playerGridSetup.map((square, index)=>{
      if ([presetPickedC2[0],presetPickedC2[1]].includes(index)){
        return {
          ...square,
          shipStatus: 'ship2C',
          shipPreset: 'ship'
        };
      } else if([presetPickedC2[2],presetPickedC2[3],presetPickedC2[4]].includes(index)){
        return {
          ...square,
          shipStatus: 'ship31C',
          shipPreset: 'ship'
        };
      } else if([presetPickedC2[5],presetPickedC2[6],presetPickedC2[7]].includes(index)){
        return {
          ...square,
          shipStatus: 'ship32C',
          shipPreset: 'ship'
        };
      } else if([presetPickedC2[8],presetPickedC2[9],presetPickedC2[10],presetPickedC2[11]].includes(index)){
        return {
          ...square,
          shipStatus: 'ship4C',
          shipPreset: 'ship'
        };
      } else if([presetPickedC2[12],presetPickedC2[13],presetPickedC2[14],presetPickedC2[15],presetPickedC2[16]].includes(index)){
        return {
          ...square,
          shipStatus: 'ship5C',
          shipPreset: 'ship'
        };
      } else {
        return square
      }
    }
  )} else {return playerGridSetup}};

  var [play3Grid, setPlay3Grid] = useState(play3GridSetupShips)


  function sendPlayerReadyGrid() { // Add this to 'onClick' functions to send the updated player array to other users
    if (props.playState === 'Multiplayer') {socket.emit('playerGridReady', play1Grid, roomId)}
    console.log('Sending updated grid')
  }

  async function sendData() {
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
    
    socket.emit('sendData', roomId, arrayOfPlayerGrids[0], arrayOfPlayerGrids[1], arrayOfPlayerGrids[2], turnState) // arrayOfGrids[0] is serverPlayer1, arr..[1] is serverPlayer2, arr..[2] is serverPlayer3
  };

  socket.on('receiveData', async (room) => {
    
    setTurnState(room.currentTurnPlayer)

    let arrayOfGrids = []
    arrayOfGrids.push(room.play1Grid)
    arrayOfGrids.push(room.play2Grid)
    arrayOfGrids.push(room.play3Grid)
    // index 0 is server's player 1, index 1 is server's player 2, index 2 is server's player 3

    let playerIndex = await room.sockets.findIndex(socket => socket === socketid) // finds the local player's index from inside the server's sockets array
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
        setReadyState('play')
      }, 2000);
    }
  })

  socket.on('threePlayersConnected', (room) => {
    console.log(opponentNames)
    setReadyState('placement')
  })

  socket.on('playerJoinedRoom', (message, opponentNames) => {console.log(message)
    setOpponentNames(opponentNames)})


  return (
    <div>
     {props.playState==='Multiplayer' ? <RunMPGame socketid={socketid} setSocketid={setSocketid} roomId={roomId} setRoomId={setRoomId} isConnected={isConnected} username={username} setUsername={setUsername} opponentNames={opponentNames} /> : ''}
      {readyState === 'play' ? <GameFlow 
        sendGrids={sendPlayerReadyGrid}
        playState={props.playState}
        setPlayState={props.setPlayState}
        play1Grid={play1Grid} 
        setPlay1Grid={setPlay1Grid} 
        play2Grid={play2Grid} 
        setPlay2Grid={setPlay2Grid} 
        play3Grid={play3Grid} 
        setPlay3Grid={setPlay3Grid}  
        roomId={roomId} 
        setRoomId={setRoomId} 
        sendData={sendData}
        username={username}
        setUsername={setUsername}
        turnState={turnState}
        setTurnState={setTurnState}
        opponentNames={opponentNames}
        setReadyState={setReadyState}
        /> : ''}
        {readyState === 'placement' ? <ShipPlacement play1Grid={play1Grid} setPlay1Grid={setPlay1Grid} setReadyState={setReadyState} readyState={readyState} sendPlayerReadyGrid={sendPlayerReadyGrid} playState={props.playState}/> : ''}
    </div>
  );
}
