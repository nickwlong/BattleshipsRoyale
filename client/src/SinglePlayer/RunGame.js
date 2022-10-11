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
  
    socket.on('playerJoinedRoom', (message, opponentNames) => {console.log(message)
    setOpponentNames(opponentNames)})
  
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





  // play2GridSetupShips = (computerPlacing,shipPlacing) => {

  //   if (computerPlacing === 1) {
  //     var placed = false
  //     while (placed === false){
  //       let orientation = 0;
  //       let shipStartingIndex = Math.floor(Math.random() * 49);
  //       console.log(shipStartingIndex)
  //       placed = true
  //       //orientation = 0 is horizontal, orientation = 1 is vertical
  //       if (orientation === 0){
  //         if(shipPlacing === 2){
  //           if ([6,13,20,27,34,41,48].includes(shipStartingIndex) === false){
  //             console.log("meeppp")
  //             placed = true
  //             return playerGridSetup.map((square,index)=>
  //             index === shipStartingIndex || index === shipStartingIndex +1 ? { ...square,shipPresent: 'ship'} : square)
  //           }
            
  //         } else if (shipPlacing === 31 || shipPlacing === 32) {
  //           if ([5,6,12,13,19,20,26,27,33,34,40,41,47,48].includes(shipStartingIndex) === false){
  //             placed = true
  //             return playerGridSetup.map((square,index)=>
  //             index === shipStartingIndex || index === shipStartingIndex +1 || index === shipStartingIndex +2 ? { ...square,shipPresent: 'ship'} : square)
  //           }
  //         } else if (shipPlacing === 4){
  //           if ([4,5,6,11,12,13,18,19,20,25,26,27,32,33,34,39,40,41,46,47,48].includes(shipStartingIndex) === false){
  //             placed = true
  //             return playerGridSetup.map((square,index)=>
  //             index === shipStartingIndex || index === shipStartingIndex +1 || index === shipStartingIndex +2 || index === shipStartingIndex +3 ? { ...square,shipPresent: 'ship'} : square)
  //           }
  //         } else if (shipPlacing === 5){
  //           if ([3,4,5,6,10,11,12,13,17,18,19,20,24,25,26,27,31,32,33,34,38,39,40,41,45,46,47,48].includes(shipStartingIndex) === false){
  //             placed = true
  //             return playerGridSetup.map((square,index)=>
  //             index === shipStartingIndex || index === shipStartingIndex +1 || index === shipStartingIndex +2 || index === shipStartingIndex +3 ? { ...square,shipPresent: 'ship'} : square)
  //           }
  //         }
  //       } else if (orientation === 1){
  //         return playerGridSetup.map((square,index)=>
  //         index === shipStartingIndex || index === shipStartingIndex +1 ? { ...square,shipStatus:'ship'} : square
  //         )
  //       }
  //     }
  //   }
  // }


  // [play2Grid, setPlay2Grid] = useState(play2GridSetupShips(1,2))







  play2GridSetupShips = () => { if (props.playState==='Singleplayer') {return playerGridSetup.map((square, index)=>
    index === 8 || index === 9 || index === 10 ? { ...square, shipStatus: 'ship' } : square
  )} else {return playerGridSetup}};
  var [play2Grid, setPlay2Grid] = useState(play2GridSetupShips)


  play3GridSetupShips = () => { if (props.playState==='Singleplayer') {return playerGridSetup.map((square, index)=>
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
    

    socket.emit('sendData', roomId, arrayOfPlayerGrids[0], arrayOfPlayerGrids[1], arrayOfPlayerGrids[2]) // arrayOfGrids[0] is serverPlayer1, arr..[1] is serverPlayer2, arr..[2] is serverPlayer3
  };

  socket.on('receiveData', (room) => {
    
    setTurnState(room.currentTurnPlayer)

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

    // Check to see if player is 'out'
    // let player1Hits = localPlayerGrid.filter(
    //   (square) => square.hitStatus === "hit"
    // ).length;
    
    // if (player1Hits >= 3){sendData()}

  })



  socket.on('allPlayersReadyMessage', (readyStatus, room) => {
    console.log(readyStatus)
    if(readyStatus === 'allPlayersReady') {

      // let playerIndex = room.sockets.findIndex(socket => socket === socketid)
      // let arrayOfNames = room.usernames
      // arrayOfNames.splice(playerIndex, 1)
      // setOpponentNames(arrayOfNames)
      // console.log(opponentNames)

      setTimeout(() => {
        setReadyState('play')
      }, 2000);
    }
  })

  socket.on('threePlayersConnected', () => {
    setReadyState('placement')
  })

  return (
    <div>
      {props.playState==='Multiplayer' ? <RunMPGame socketid={socketid} setSocketid={setSocketid} roomId={roomId} setRoomId={setRoomId} isConnected={isConnected} username={username} setUsername={setUsername} opponentNames={opponentNames} /> : ''}
      {readyState === 'play' ? <GameFlow 
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
        username={username}
        setUsername={setUsername}
        turnState={turnState}
        setTurnState={setTurnState}
        opponentNames={opponentNames}
        /> : ''}
        {readyState === 'placement' ? <ShipPlacement play1Grid={play1Grid} setPlay1Grid={setPlay1Grid} setReadyState={setReadyState} readyState={readyState} sendPlayerReadyGrid={sendPlayerReadyGrid} playState={props.playState}/> : ''}
    </div>
  );
}
