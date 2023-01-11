positions_evaluated = null

function minimax(game, level, maximizingPlayer) {
    positions_evaluated = 0
    bestValue = 9999999
    bestMove = null; 
    for (const move of game.moves()) {
        game.move(move)
        eval = minimax_util(game, level-1, -999999, 999999, !maximizingPlayer)
        game.undo()
        if (eval < bestValue) {
            bestValue = eval
            bestMove = move
        }
    }
    return [bestMove, bestValue]
}

function minimax_util(game, level, alpha, beta, maximizingPlayer) {
    positions_evaluated++

	if (level == 0 || game.game_over()) {
		return evaluateBoard(game)
    }
 
	if (maximizingPlayer) {
		var maxEval = -9999999
		for (const move of game.moves()) {
            game.move(move);
            eval = minimax_util(game, level - 1, alpha, beta, !maximizingPlayer)
            maxEval = Math.max(maxEval, eval)
            game.undo()
            alpha = Math.max(alpha, eval)
            if (beta <= alpha)
                break
        }
		return maxEval
    }
 
	else {
		minEval = +9999999
		for (const move of game.moves()) {
            game.move(move);
            eval = minimax_util(game, level - 1, alpha, beta, !maximizingPlayer)
            minEval = Math.min(minEval, eval)
            game.undo()
            beta = Math.min(beta, eval)
            if (beta <= alpha)
                break
        }
		return minEval
    }
}

function evaluateBoard (game) {
    var totalEvaluation = 0;
    squares = game.SQUARES
    for (var i = 0; i < 64; i++) {
      totalEvaluation = totalEvaluation + getPieceValue(game.get(squares[i]));
    }
    return totalEvaluation;
}

function getPieceValue (piece) {
    if (piece === null) {
        return 0;
    }
    var getAbsoluteValue = function (piece) {
        if (piece.type === 'p') {
            return 10;
        } else if (piece.type === 'r') {
            return 50;
        } else if (piece.type === 'n') {
            return 30;
        } else if (piece.type === 'b') {
            return 30 ;
        } else if (piece.type === 'q') {
            return 90;
        } else if (piece.type === 'k') {
            return 900;
        }
        throw "Unknown piece type: " + piece.type;
    };

    var absoluteValue = getAbsoluteValue(piece, piece.color === 'w');
    return piece.color === 'w' ? absoluteValue : -absoluteValue;
};