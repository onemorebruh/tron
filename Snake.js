const SnakeBodyPart = require("./SnakeBodyPart.js");

exports.Snake = class Snake{
  constructor(x,y) {
    this.head = new SnakeBodyPart.SnakeBodyPart(x, y);
    this.body = [];
    this.score = 0;
    this.direction = "right"
  }

  Default(){
    this.head = new SnakeBodyPart(0, 0);
    this.body = [];
    this.score = 0;
    this.direction = "right"
  }

  grow(){
    this.score++;
    this.body.push(this.head);
  }

  move(direction){
    if (this.body.lenght > 0) {
      body.shift()
      body.push(this.head)
    }
    if (this.direction == "up") {
      this.head.y++;
    }else if (this.direction == "down") {
      this.head.y--;
    }else if (this.direction == "right"){
      this.head.x++;
    }else if (this.direction == "left") {
      this.head.x--;
    }else {
      this.direction = "right"
    }
    return `${this.x}, ${this.y}`;
  }
  
}


