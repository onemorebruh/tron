const Snake = require("./Snake.js");

var max_players_amount = 10
var interval_between_frames = 120

var positions = []

function onUpdate(players){
  console.log(players);
    //for each move
  players.forEach(function(player, index, players){
    if (player.body.lenght > 0) {
      player.body.shift()
      player.body.push(this.head)
    }
    if (player.direction == "up") {
      player.head.y++;
    }else if (player.direction == "down") {
      player.head.y--;
    }else if (player.direction == "right"){
      player.head.x++;
    }else if (player.direction == "left") {
      player.head.x--;
    }else {
      player.direction = "right"
    }
    positions.push(`${player.head.x}, ${player.head.y}`);

  })
  console.log(positions)
  return positions
}

module.exports = {
  max_players_amount,
  interval_between_frames,
  onUpdate,
};
