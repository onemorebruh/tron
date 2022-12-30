const Snake = require("./Snake.js");

var max_players_amount = 10
var interval_between_frames = 120

var positions = []

  function onUpdate(players){
    //for each move
    players.forEach(function(object, index, players){
      positions.push(object.move(object.direction))
    });
    return positions
  }

module.exports = {
  max_players_amount,
  interval_between_frames,
  onUpdate,
};
