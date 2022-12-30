const socket = io("ws://localhost:9000");

let table = document.getElementById("table");

let ctx = table.getContext("2d");

socket.on('message', text => {
  //parse data
  let x, y, id;
  console.log(text);
  x = text.split(", ")[0];
  y = text.split(", ")[1];
  //draw blue dot
  ctx.fillStyle = "rgb(0, 0, 255)";
  console.log(x, y, id);
  ctx.fillRect(y * 10, x * 10, 10, 10);
});

let WSButton = document.getElementById("WSButton");

WSButton.addEventListener("click", (e) => {
  e.preventDefault;
  console.log("button is pressed")
  socket.emit("message", "aboba")
});
