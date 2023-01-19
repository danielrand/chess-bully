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
    var totalEvaluation = 0
    squares = game.SQUARES
    var row = 0, col = 0
    for (var i = 0; i < 64; i++) {  
        totalEvaluation = totalEvaluation + getPieceValue(game.get(squares[i]), row, col++);
        if (col == 8) {
            row++
            col = 0;
        }
    }
    return totalEvaluation;
}

function getPieceValue (piece, row, col) {
    if (piece === null) {
        return 0;
    }
    var getAbsoluteValue = function (piece, isWhite, row, col) {
        if (piece.type === 'p') {
            return 100 + (isWhite ? whitePawnOffset[row][col] : blackPawnOffset[row][col])
        } else if (piece.type === 'r') {
            return 500 + (isWhite ? whiteRookOffset[row][col] : blackRookOffset[row][col])
        } else if (piece.type === 'n') {
            return 320 + (isWhite ? whiteKnightOffset[row][col] : blackKnightOffset[row][col])
        } else if (piece.type === 'b') {
            return 330 + (isWhite ? whiteBishopOffset[row][col] : blackBishopOffset[row][col])
        } else if (piece.type === 'q') {
            return 900 + (isWhite ? whiteQueenOffset[row][col] : blackQueenOffset[row][col])
        } else if (piece.type === 'k') {
            // TODO: Add end game king evaluation
            return 20000 + (isWhite ? whiteKingMiddleGameOffset[row][col] : blackKingMiddleGameOffset[row][col])
        }
        throw "Unknown piece type: " + piece.type;
    };

    var absoluteValue = getAbsoluteValue(piece, piece.color === 'w', row, col);

    return piece.color === 'w' ? absoluteValue : -absoluteValue;
};