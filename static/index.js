const socket = io("ws://192.168.1.111:9000");

let table = document.getElementById("table");

let ctx = table.getContext("2d");

socket.on('message', async arrayOfDots => {
  //parse data
  console.log(arrayOfDots);
  ctx.clearRect(0, 0, 720, 480);
  await arrayOfDots.forEach(function (element, index, arrayOfDots) {
    //draw blue dot
    ctx.fillStyle = "rgb(0, 0, 255)";
    let x = element.head.x;
    let y = element.head.y;
    ctx.fillRect(y * 10, x * 10, 10, 10);
  });
});

//motion
document.addEventListener("keydown", (e) => {
  e.preventDefault();
  console.log(e.code);
  switch (e.code) {
    case "ArrowUp":
      //send message
      socket.emit("message", "up")
      break;
    case "ArrowDown":
      //send message
      socket.emit("message", "down")
      break;
    case "ArrowLeft":
      //send message
      socket.emit("message", "left")
      break;
    case "ArrowRight":
      //send message
      socket.emit("message", "right")
      break;

    default:
      break;
  }
});

let WSButton = document.getElementById("WSButton");

WSButton.addEventListener("click", function(e){
  e.preventDefault();
  socket.emit("test", "aboba");
});
