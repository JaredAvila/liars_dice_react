const express = require("express");
const app = express();
const PORT = 3001 || process.env.PORT;
const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
const io = require("socket.io")(server);

const playerActions = require("./Players/Players");

//to be replaced by db queires
let users = [];

let gameActive = false;

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

io.on("connection", (socket) => {
  //welcome current user
  socket.emit("message", "Welcome to Liars Dice");

  //Send out alert to everyone else when user joins
  socket.broadcast.emit("message", "User has joined the room");

  //alert all when someone leaves
  socket.on("disconnect", () => {
    io.emit("message", "User has left the room");
  });

  //add new user
  socket.on("newUser", (data) => {
    users.push(data);
    io.emit("playerList", users);
  });

  //remove user upon logout
  socket.on("logOutUser", (data) => {
    newUsers = users.filter((player) => player.id !== data.id);
    users = newUsers;
    io.emit("playerList", newUsers);
  });

  //update player list
  socket.on("updatePlayers", (data) => {
    console.log("updated player: ", data);
    users = data;
    io.emit("playerList", data);
  });

  //start game actions
  socket.on("gameStart", () => {
    let newUsers = playerActions.setFirstPlayer(users, false);
    let newerUsers = playerActions.setPlayerHands(newUsers);
    gameActive = true;
    users = [...newerUsers];

    io.emit("startGame", {
      gameActive,
      users,
    });
  });
});
