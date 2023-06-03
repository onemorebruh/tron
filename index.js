const express = require("express");
const app = express();
const http = require("http").createServer();
const game = require("./game.js");
const SnakeBodyPart = require("./SnakeBodyPart.js");
const Snake = require("./Snake.js");
const cors = require("cors");
const config = require("./config.js");


let players = []
let playerIDS = []

const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowHeaders: "*"
  }
});

io.on("connection", (socket) => {
  console.log("a user connected");

  //init Snake
    let x = Math.floor(Math.random()*48);
  let y = Math.floor(Math.random()*72);
  players.push(new Snake.Snake(x,y, socket.id, players.length));
  playerIDS[socket.id] = (players.length - 1);
  setInterval(() => {
    let snakes = game.onUpdate(players);
    io.emit("message", snakes);
  }, game.interval_between_frames);

  socket.on('message', (message) => {
    if (players[playerIDS[socket.id]]){
    //stop user from killing itself bcause of collision
    if (message == "up") {
      if (players[playerIDS[socket.id]].direction != "down") {
        players[playerIDS[socket.id]].direction = message;
      }
    }
    if (message == "down") {
      if (players[playerIDS[socket.id]].direction != "up") {
        players[playerIDS[socket.id]].direction = message;
      }
    }
    if (message == "left") {
      if (players[playerIDS[socket.id]].direction != "right") {
        players[playerIDS[socket.id]].direction = message;
      }
    }
    if (message == "right") {
      if (players[playerIDS[socket.id]].direction != "left") {
        players[playerIDS[socket.id]].direction = message;
      }
    }
    if (message == "destroy") {
      //throw new Error("Something went badly wrong!");
      players.forEach(function (player, index, playerIDS){
      // deletes snake who lose
      if (player.owner == socket.id){
        playerIDS[index] = '-1';
        players = players.slice(0, index).concat(players.slice(index + 1, players.length));
      }
      })
    }
    }
    });
  socket.on("disconnect", function() {
    players.forEach(function (player, index, playerIDS){
      if (player.owner == socket.id){
        playerIDS[index] = '-1';
        players = players.slice(0, index).concat(players.slice(index + 1, players.length));
      }
    });
  });
});

app.use(express.static("static"));
app.use(cors());

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/templates/index.html");
});

app.listen(3000, config.IP);
http.listen(9000, () => console.log("listening to ws"));
