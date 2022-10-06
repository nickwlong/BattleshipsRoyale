const io = require('socket.io')(3001, {
  cors: {
    origin: ['http://localhost:3000']
  }
})

io.on('connection', socket => {

  let connectionsLimit = 3

  console.log(socket.id)

  socket.on('join-room', roomId => { // Adds the user to the specified room upon joining

    // if (io.engine.clientsCount > connectionsLimit) {
    //   socket.emit('err', { message: 'reach the limit of connections' })
    //   // socket.disconnect()
    //   console.log('Disconnected...')
    //   return
    // }
    console.log('Someone is joining a room!')
    socket.join(roomId)
  })

  // add conditional to check if the room is full

  socket.on('playerGridReady', (playerGrid, roomId) => {
    console.log("roomId = " + roomId)
    if (roomId === '') {
      socket.broadcast.emit('receive-array', playerGrid)
    } else {
    socket.to(roomId).emit('receive-array', playerGrid)
    }
    console.log(playerGrid)
  })
})
