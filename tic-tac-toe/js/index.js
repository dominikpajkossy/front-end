var tiles = document.getElementsByClassName("tile");
var state = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var game = true;
var HUMAN = false;
var COMPUTER = true;
var HUMVAL = -1;
var COMVAL = 1;
var currentPlayer = HUMAN;
var winMatrix = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
function reset() {
  for (var i = 0; i < 9; i++) {
    tiles[i].style.background = "#fff";
    tiles[i].innerHTML = "";
    state[i] = 0;
  }
  game = true;
}

function claim(clicked) {
  if (!game) return;
  for (var i = 0; i < 9; i++) {
    if (tiles[i] == clicked && state[i] == 0) {
      set(i, currentPlayer);
    }
  }
  aiturn(state, 0, currentPlayer, true);
}
function set(index, player) {
  if (!game) return;
  if (state[index] == 0) {
    tiles[index].style.background = player == HUMAN ? "#22f" : "#f22";
    state[index] = player == HUMAN ? HUMVAL : COMVAL;
    currentPlayer = !currentPlayer;
    aiturn(state, 0, currentPlayer, false);
    if (checkWin(state, player) || checkFull(state)) {
      for (var i = 0; i < 9; i++) tiles[i].innerHTML = "";
      game = false;
    }
  }
}
function checkWin(board, player) {
  var value = player == HUMAN ? HUMVAL : COMVAL;
  for (var i = 0; i < 8; i++) {
    var win = true;
    for (var j = 0; j < 3; j++) {
      if (board[winMatrix[i][j]] != value) {
        win = false;
        break;
      }
    }
    if (win) return true;
  }
  return false;
}
function checkFull(board) {
  for (var x = 0; x < 9; x++) if (board[x] == 0) return false;
  return true;
}
//Negamax algorithm
function aiturn(board, depth, player, turn) {
  if (checkWin(board, !player)) return -10 + depth;
  if (checkFull(board)) return 0;
  var value = player == HUMAN ? HUMVAL : COMVAL;
  var max = -Infinity;
  var index = 0;
  for (var x = 0; x < 9; x++) {
    
    if (board[x] == 0) {
      var newboard = board.slice();
      newboard[x] = value;
      var moveval = -aiturn(newboard, depth + 1, !player, false);
      
      if (moveval > max) {
        max = moveval;
        index = x;
      }
    }
  }
  if (turn) set(index, player);
  return max;
}