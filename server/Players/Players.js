const RollDice = require("../GameActions/RollDice");

exports.setFirstPlayer = setFirstPlayer = (players, lastRoundWinner) => {
  let firstPlayer;
  if (lastRoundWinner) {
    firstPlayer = players.find((player) => player.id === lastRoundWinner);
  } else {
    firstPlayer = players[0];
  }
  firstPlayer.turn = true;
  return [firstPlayer, ...players.slice(1)];
};

exports.setPlayerHands = setPlayerHands = (players) => {
  return players.map((player) => {
    player.hand = RollDice();
    return player;
  });
};
