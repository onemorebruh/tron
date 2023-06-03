const ip = window.location.origin;
const port = window.location.port;
const addres = ip.slice(7, ip.length - port.length);
const socket = io(`ws://${addres}9000`);

class SnakeBodyPart{
  constructor(y, x){
    this.x = x;
    this.y = y;
  }
}

class SnakeHeads extends SnakeBodyPart {

  constructor(y, x, index, owner){
    super(y, x)
    this.index = index;
    this.isImmortal = true;
    this.owner = owner;
  }

  makeMortal() {
    this.isImmortal = false
  }
}

let table = document.getElementById("table");

let ctx = table.getContext("2d");

socket.on('message', async function (arrayOfSnakes) {
  const socketId = socket.id;
  let snakeHeads = [];
  let collisionSnakeBodyParts = [];//array of SnakeBodyParts of each snake exclude heads
  //i need this array to use forEach on it
    
  //parse data
  ctx.clearRect(0, 0, 720, 480);
  arrayOfSnakes.forEach(async function (snake, index, arrayOfSnakes) {
    //draw colored snake
    ctx.fillStyle = `rgb(${snake.r}, ${snake.g}, ${snake.b})`;
    let x = snake.head.x;
    let y = snake.head.y;
    ctx.fillRect(y * 10, x * 10, 10, 10);
    //collect heads for collision checks
    let iterHead = new SnakeHeads(y * 10, x * 10, index, snake.owner);
    if (snake.body.length >= 15){//adds abbility to lose when tail is long enough
      iterHead.makeMortal();
    }
    snakeHeads.push(iterHead);
    snake.body.forEach(function (bodyPart, index, array){
      ctx.fillRect(bodyPart.y * 10, bodyPart.x * 10, 10, 10);
      if (iterHead.y == (bodyPart.y * 10) && iterHead.x == (bodyPart.x * 10)){
        // dont add to collisionSnakeBodyParts

      } else {
        collisionSnakeBodyParts.push(new SnakeBodyPart(bodyPart.y * 10, bodyPart.x * 10));
      }
    });
  });
  snakeHeads.forEach(function (head, index, snakeHeads){
    //collision check
    collisionSnakeBodyParts.forEach(function (snakeBodyPart, index, collisionSnakeBodyParts) {
      if (head.x == snakeBodyPart.x && head.y == snakeBodyPart.y && !head.isImmortal){// snake is immortal cause it duplicates head each time it becomes bigger
        if (socketId == head.owner){
          socket.emit("message", "destroy");
          alert("you lose");
        }
      };
    });
  });
  //clear collision arrays
  snakeHeads = [];
  collisionSnakeBodyParts = [];
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

