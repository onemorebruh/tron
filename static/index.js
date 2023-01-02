const ip = window.location.origin;
const port = window.location.port;
let addres = ip.slice(7, ip.length - port.length);
const socket = io(`ws://${addres}9000`);

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
    element.body.forEach(function (element, index, array){
      ctx.fillRect(element.y * 10, element.x * 10, 10, 10);
    });
  });
  await arrayOfDots.forEach(function (element, index, arrayOfDots){
    //collision check
    let colors = ctx.getImageData(element.head.y, element.head.x, 1, 1).data;
    console.log(colors);
    if(rgb != 'rgb(0, 0, 0)'){
      //snake destroys
      console.log("boom");
    };
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

