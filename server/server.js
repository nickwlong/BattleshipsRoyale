const io = require('socket.io')(3001, {
  cors: {
    origin: ['http://localhost:3000']
  }
})

let rooms = []

io.on('connection', socket => {

  console.log(socket.id)

  socket.on('createRoom', (roomName, callback) => {
    const room = {
      id: uuid,
      name: roomName,
      sockets: []
    };
    rooms[room.id]  = room;
    // have the socket join the room they have just created
    joinRoom(socket, room);
    callback();
  })



  socket.on('join-room', (roomId, callback) => { // Adds the user to the specified room upon joining

    const room = rooms[roomId];
    joinRoom(socket, room); 

    console.log('Someone is joining a room!')
    socket.join(roomId)
    callback();
  });


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
