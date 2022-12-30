const express = require("express");
const app = express();
const http = require("http").createServer();
const game = require("./game.js");
const SnakeBodyPart = require("./SnakeBodyPart.js");
const Snake = require("./Snake.js");

let players = []
let playerIDS = []

const io = require("socket.io")(http, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  console.log("a user connected");

  //init Snake
    let x = Math.floor(Math.random()*48);
  let y = Math.floor(Math.random()*72);
  players.push(new Snake.Snake(x,y, socket.id));
  playerIDS[socket.id] = 0;//TODO replace 0 with something  else
  //draw dot on random coordinates
  setInterval(() => {
    let data = game.onUpdate(players);
    io.emit("message", data);
  }, game.interval_between_frames);
  socket.on('message', (message) => {
    console.log(playerIDS[socket.id]);
    players[0].direction = message;
  });
});

app.use(express.static("static"));

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/templates/index.html");
});

app.listen(3000);
http.listen(9000, () => console.log("listening to ws"));
