//This script must be included with <script ... defer></script>

console.log( "Script running: " + document.readyState );

var lines = [
	[ 1, 2, 3 ],
	[ 4, 5, 6 ],
	[ 7, 8, 9 ],
	[ 1, 4, 7 ],
	[ 2, 5, 8 ],
	[ 3, 6, 9 ],
	[ 1, 5, 9 ],
	[ 3, 5, 7 ]
];
var places = [ 5, 1, 3, 7, 9, 2, 4, 6, 8 ];
var msgElement = document.getElementById('msg');
console.log( "msgElement: " + msgElement );
var msg = "";
var board = [ '', 0, 0, 0, 0, -1, 0, 0, 0, 0 ];
var cells = [];
for ( var i = 1; i <= 9; i++ ) {
	cells[i] = document.getElementById( i.toString() );
}
displayBoard(board);

// displaying the board
function displayBoard(board) {
	var s = '';
	for ( var i = 1; i <= 9; i++ ) {
		s += " " + board[i];
		cells[i].innerHTML = board[i] < 0 ? "X"
		                   : board[i] > 0 ? "O"
		                   :                " " ;
	}
	msgElement.innerHTML = msg;
	msg = "";
	console.log( "displayBoard:" + s );
}

function choose(cell) {
	console.log( "Choose: " + cell );
	if ( board[cell] != 0 ) {
		msg = 'cell already taken';
	} else {
		board[cell] = 1;
	}
	displayBoard( board );
	move();
}

function logMove( test, board, row, s ) {
	console.log( "  " + test + ": " + row[0] + " " + row[1] + " " +
	             row[2] + "  " + board[row[0]] + " " + board[row[1]] +
	             " " + board[row[2]] + "  " + s );
}

function move() {
	// check if anyone has won the game
	// checking for 3 in a row
	var s;
	for (var i = 0; i < lines.length; i++ ) {
		s = board[lines[i][0]] + board[lines[i][1]] + board[lines[i][2]];
		logMove( "checkWin", board, lines[i], s );
		if (s == 3) {
			msg = 'Player has won!';
			displayBoard(board);
			return;
		} else if (s == -3) {
			msg = 'Computer has won!';
			displayBoard(board);
			return;
		}
	}
	// Can computer win?  If so, WIN!
	for (var i = 0; i < lines.length; i++) {
		s = board[lines[i][0]] + board[lines[i][1]] + board[lines[i][2]];
		logMove( "cCanWin", board, lines[i], s );
		if (s == -2) { // computer can win
			for (var j = 0; j <= 2; j++) {
				if (board[lines[i][j]] == 0) {
					board[lines[i][j]] = -1;
					msg = "Computer Wins!";
					displayBoard(board);
					return;
				}
			}
		}
	}
	// Can player win?  If so, BLOCK!
	for (var i = 0; i < lines.length; i++) {
		s = board[lines[i][0]] + board[lines[i][1]] + board[lines[i][2]];
		logMove( "pCanWin", board, lines[i], s );
		if (s == 2) { // computer can win
			for (var j = 0; j <= 2; j++) {
				if (board[lines[i][j]] == 0) {
					board[lines[i][j]] = -1;
					displayBoard(board);
					return;
				}
			}
		}
	}
	// Find an empty cell to take. Try corners first, then sides. 
	for (var i = 0; i < places.length; i++) {
		if ( board[ places[ i ] ] == 0 ) {
			console.log( "Computer takes " + places[i] );
			board[ places[ i ] ] = -1;
			displayBoard(board);
			return;
		}
	}
}
