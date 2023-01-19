var board = null
var game = new Chess()

var makeBestMove = function () {
  computer_move = minimax(game, 3 ,false)
  console.log("Computer Move: " + computer_move[0]);
  console.log("Eval: " + computer_move[1]);
  console.log("Positions Evaluated: " + positions_evaluated);
  game.move(computer_move[0]);
  board.position(game.fen());
}

function onDragStart (source, piece, position, orientation) {
  // do not pick up pieces if the game is over
  if (game.game_over()) return false

  // only pick up pieces for the side to move
  if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false
  }
}

function onDrop (source, target) {
  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  })
  // illegal move
  if (move === null) return 'snapback'
  window.setTimeout(makeBestMove,250);
  console.log(game)
  if (game.game_over()) {
    console.log(game.pgn())
    alert('Game over');
  }
}

// update the board position after the piece snap
// for castling, en passant, pawn promotion
function onSnapEnd () {
  board.position(game.fen())
}

var config = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd
}
board = Chessboard('myBoard', config)
