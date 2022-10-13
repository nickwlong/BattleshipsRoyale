# Battleships Royale ⚓️
A real-time [battleship game](https://en.wikipedia.org/wiki/Battleship_(game)), built with [React](https://reactjs.org/) and [Socket.IO](https://socket.io/). 


[Play Here](https://battleshipsroyale.herokuapp.com/)


# Table of contents
1. [About the game](#about)
2. [Player modes](#player-modes)
    1. [Single player](#single-player)
    2. [Multi player](#multi-player)
3. [Getting started](#getting-started)

# About the Game <a name="about"></a>
<dl>
  <dd>Each player has a 7x7 board on which the player is able to place 5 ships:</dd>
  <dd>• A Carrier, which is 5 tiles long </dd>
  <dd>• A Battleship, which is 4 tiles long </dd>
  <dd>• A Cruiser, which is 3 tiles long </dd>
  <dd>• A Submarine, which is 3 tiles long </dd>
  <dd>• A Destroyer, which is 2 tiles long </dd>
</dl>
<br/>
<dl>
  <dd> Each ship can be placed either horizontally or vertically on the board, and cannot be placed partially off the board.</dd>
  <dd> Each player then takes turns picking a tile on the opposing player’s grid, taking a shot at that tile.</dd>
  <dd> The Battle Grid identifies a miss with white, a hit with red, and a sunken ship with black.</dd>
  <dd> You can not hit the same spot twice.</dd>
  <dd> The player with the most ships remaining wins!</dd>
</dl>


# Player Modes <a name="player-modes"></a>
  ## Single Player <a name="single-player"></a>
  In single player mode you will be playing against two computers.

  ## Multi Player <a name="multi-player"></a>
  <dd>In multi player you will play against your pairs.</dd>
  <dd>To play with your pairs you need to join the same room.</dd>
  <dd>The first person to join a room will create the room.</dd>
  <dd>The game will not start untill all players have placed their ships and clicked on ready.</dd>


# Getting Started <a name="getting-started"></a>
<dl>
  <dd>• Clone this project to your computer</dd>
  <dd>• cd to the folder where this project is cloned.</dd>
  <dd>• Install all dependencies with npm install command.</dd>
  <dd>• Install confetti with npm install react-confetti comman in the client folder.</dd>
  <dd>• Run the Socket.IO server with npm run command on the server and client folder.</dd>
  <dd>• Run the app in the development mode with npm start command.</dd>
  <dd>• Open the broswer and visit: http://localhost:3000</dd>
</dl>