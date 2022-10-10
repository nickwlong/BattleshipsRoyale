const io = require('socket.io')(3001, {
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

  socket.on('join-room', roomId => { // Adds the user to the specified room upon joining
    
    let room
    if(!rooms.some((e) => e.id === roomId )) {
      room = {sockets: [socket.id], 
        id: roomId, 
        play1Grid: '', //player 1 is index 0 in the sockets array
        play2Grid: '', //player 2 is index 1 in the sockets array
        play3Grid: ''} //player 3 is index 2 in the sockets array
      rooms.push(room)
    } else { rooms.find((e) => e.id === roomId).sockets.push(socket.id) }

    socket[roomId] = roomId
    socket.join(roomId)
    socket.to(roomId).emit('playerJoinedRoom', 'A player has joined your room')
  })

  // add conditional to check if the room is full

  socket.on('playerGridReady', (playerGrid, roomId) => {
    rooms.forEach(room => {
      if (room.id === roomId){
      room.sockets[0] === socket.id ? room.play1Grid = playerGrid : ''
      room.sockets[1] === socket.id ? room.play2Grid = playerGrid : ''
      room.sockets[2] === socket.id ? room.play3Grid = playerGrid : ''
      console.log(room)

      }
      if (room.id === roomId && room.play1Grid !== '' && room.play2Grid !== '' && room.play3Grid !== '') {
        socket.to(roomId).emit('allPlayersReadyMessage', 'allPlayersReady') 
        socket.emit('allPlayersReadyMessage', 'allPlayersReady')
        socket.to(roomId).emit('receiveData', room)
        socket.emit('receiveData', room)
      }

    });
  })

  socket.on('sendData', (roomId, play1Grid, play2Grid, play3Grid) => {
    rooms.forEach(room => {
      console.log(room)
      if(room.id === roomId) {
      room.play1Grid = play1Grid 
      room.play2Grid = play2Grid 
      room.play3Grid = play3Grid 
      socket.to(roomId).emit('receiveData', room)
      socket.emit('receiveData', room)
      }
  })

})})
