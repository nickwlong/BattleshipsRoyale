const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3001;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = require('socket.io')(server, {
  cors: {
    origin: ['http://localhost:3000']
  }
})

let rooms = []

// each room in rooms has:
// 1. An id
// 2. An array of all the socket ids that have joined it
// 3. An array of all the player's arrays, which are added once they have placed their ships.

io.on('connection', socket => {

  socket.on('join-room', (roomId, username)=> { // Adds the user to the specified room upon joining
    
    let room
    if(!rooms.some((e) => e.id === roomId )) {
      room = {sockets: [socket.id], 
        usernames: [username],
        currentTurnIndex: 0,
        currentTurnPlayer: username,
        id: roomId, 
        play1Grid: '', //player 1 is index 0 in the sockets array
        play2Grid: '', //player 2 is index 1 in the sockets array
        play3Grid: ''} //player 3 is index 2 in the sockets array
      rooms.push(room)
    } else { rooms.find((e) => e.id === roomId).sockets.push(socket.id);
      rooms.find((e) =>e.id === roomId).usernames.push(username);
    }

    socket[roomId] = roomId
    socket.join(roomId)
    socket.emit('playerJoinedRoom', `You have joined room: ${roomId}`, rooms.find((e) => e.id === roomId).usernames)
    socket.to(roomId).emit('playerJoinedRoom', 'A player has joined your room', rooms.find((e) => e.id === roomId).usernames)
    if(rooms.find((e) => e.id === roomId).sockets.length === 3){
      socket.to(roomId).emit('threePlayersConnected')
      socket.emit('threePlayersConnected')
    }

  })

  // add conditional to check if the room is full

  socket.on('playerGridReady', (playerGrid, roomId) => {
    rooms.forEach(room => {
      if (room.id === roomId){
      room.sockets[0] === socket.id ? room.play1Grid = playerGrid : ''
      room.sockets[1] === socket.id ? room.play2Grid = playerGrid : ''
      room.sockets[2] === socket.id ? room.play3Grid = playerGrid : ''

      }
      if (room.id === roomId && room.play1Grid !== '' && room.play2Grid !== '' && room.play3Grid !== '') {
        console.log(room)
        room.currentTurnPlayer = room.usernames[0]
        socket.to(roomId).emit('allPlayersReadyMessage', 'allPlayersReady', room) 
        socket.emit('allPlayersReadyMessage', 'allPlayersReady', room)
        socket.to(roomId).emit('receiveData', room)
        socket.emit('receiveData', room)
      }

    });
  })

  socket.on('sendData', (roomId, play1Grid, play2Grid, play3Grid, turnState) => {
    rooms.forEach(room => {
      if(room.id === roomId) {
      room.play1Grid = play1Grid 
      room.play2Grid = play2Grid 
      room.play3Grid = play3Grid 
      room.currentTurnIndex == 2 ? room.currentTurnIndex = 0 : room.currentTurnIndex += 1
      room.currentTurnPlayer = room.usernames[room.currentTurnIndex]
      socket.to(roomId).emit('receiveData', room)
      socket.emit('receiveData', room)
      }
  })

  socket.on('gameIsOver', (roomId) => {
    console.log('game is over in room:' + roomId)
    socket.emit('gameOver')
    socket.to(roomId).emit('gameOver')
  })
  

})})
