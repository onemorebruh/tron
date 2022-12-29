const express = require("express");
const app = express();
const http = require("http").createServer();

const io = require("socket.io")(http, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  console.log("a user connected");

  //init Snake
  
  //draw dot on random coordinates

  socket.on('message', (message) => {
       
    console.log(message);
    let x = Math.floor(Math.random()*48)
    let y = Math.floor(Math.random()*72)
    io.emit("message", `${socket.id}, ${x}, ${y}`);
  });
});

app.use(express.static("static"));

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/templates/index.html");
});

app.listen(3000);
http.listen(9000, () => console.log("listening to ws"));
