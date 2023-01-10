var board = null
var game = new Chess()

// return random move
var calculateBestMove =function(game) {
  var newGameMoves = game.moves();
  return newGameMoves[Math.floor(Math.random() * newGameMoves.length)];
};

var makeBestMove = function () {
  var bestMove = calculateBestMove(game);
  game.move(bestMove);
  board.position(game.fen());
  if (game.game_over()) {
      alert('Game over');
  }
};

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

  window.setTimeout(makeBestMove, 250);
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
$(window).resize(board.resize)
