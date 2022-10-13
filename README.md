# battleships_royale
A real-time [battleship game](https://en.wikipedia.org/wiki/Battleship_(game)), built with [React](https://reactjs.org/) and [Socket.IO](https://socket.io/).

[Play Here](https://battleshipsroyale.herokuapp.com/)


# Table of contents
1. [About the game](#about)
2. [Player modes](#player-modes)
    1. [Single player](#single-player)
    2. [Multi player](#multi-player)
3. [Getting started](#getting-started)

# H1 About the Game <a name="about"></a>
  Each player has a 7x7 board on which the player is able to place 5 ships:
    • A Carrier, which is 5 tiles long
    • A Battleship, which is 4 tiles long
    • A Cruiser, which is 3 tiles long
    • A Submarine, which is 3 tiles long
    • A Destroyer, which is 2 tiles long
  
  Each ship can be placed either horizontally or vertically on the board, and cannot be placed partially off the board.
  Each player then takes turns picking a tile on the opposing player’s grid, taking a shot at that tile.
  The Battle Grid identifies a miss with white, a hit with red, and a sunken ship with black. 
  You can not hit the same spot twice.
  The player with the most ships remaining wins!


# Player Modes <a name="player-modes"></a>

  ## H2 Single Player <a name="single-player"></a>
        In single player mode you will be playing against two computers.

  ## H2 Multi Player <a name="multi-player"></a>
        In multi player you will play against your pairs. 
        To play with your pairs you need to join the same room.
        The first person to join a room will create the room.
        The game will not start untill all players have placed their ships and clicked on ready.

# H1 Getting Started <a name="getting-started"></a>
    • Clone this project to your computer
    • cd to the folder where this project is cloned
    • Install all dependencies with npm install command
    • Install confetti with npm install react-confetti comman in the client folder
    • Run the Socket.IO server with npm run command on the server and client folder
    • Run the app in the development mode with npm start command
    • Open the broswer and visit: http://localhost:3000
