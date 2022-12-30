const Snake = require("./Snake.js");

var max_players_amount = 5
var interval_between_frames = 120


function onUpdate(players){
  var positions = []
    //for each move
  players.forEach(function(player, index, players){
    if (player.body.lenght > 0) {
      player.body.shift()
      player.body.push(this.head)
    }
    if (player.head.y > 72) {
      player.head.y = 0;
    };
    if (player.head.y < 0) {
      player.head.y = 72;
    };
    if (player.head.x > 48) {
      player.head.x = 0;
    };
    if (player.head.x < 0) {
      player.head.x = 48;
    };
    if (player.direction == "up") {
      player.head.x--;
    }else if (player.direction == "down") {
      player.head.x++;
    }else if (player.direction == "right"){
      player.head.y++;
    }else if (player.direction == "left") {
      player.head.y--;
    }else {
      player.direction = "right"
    }
    positions.shift()
    positions.push(player);

  })
  return positions
}

module.exports = {
  max_players_amount,
  interval_between_frames,
  onUpdate,
};
