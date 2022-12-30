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
}
