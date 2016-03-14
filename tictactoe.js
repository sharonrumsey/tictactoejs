var lines = [
	[ 1, 2, 3],
	[ 4, 5, 6],
	[ 7, 8, 9],
	[ 1, 4, 7],
	[ 2, 5, 8],
	[ 3, 6, 9],
	[ 1, 5, 9],
	[ 3, 5, 7]
];

var msg;
var msgElement;
var board = [ '', 0, 0, 0, 0, -1, 0, 0, 0, 0 ];
var cells = [];
var amIStarted = 0

// loading the page
console.log('before');
document.addEventListener("DOMContentLoaded", start);
function start() {
	console.log('load');
	var s; 
	for (var i = 1; i <= 9; i++) {
		s = '#' + i.toString();
		alert(s);
		cells[i] = document.getElementById(s);
	}
	msgElement = document.getElementById('msg');
	displayBoard(board);
	amIStarted = 1;
};
console.log('after');

// displaying the board
function displayBoard(board) {
	for (var i = 1; i <= 9; i++) {
		cells[i].innerHTML = board[i] < 0 ? "X" : board[i] > 0 ? "O" : " " ;
	}
	msgElement.innerHTML = msg;
}

function choose(cell) {
	if (!amIStarted) {
		start();
	}
	if (board[cell] != 0) {
		msg = 'cell already taken';
	} else {
		board[cell] = 1;
	}
	move();
}

function move() {
	// check if anyone has won the game
	// checking for 3 in a row
	var s;
	for (var i = 0; i < lines.length; i++ ) {
		s = board[lines[i][0]] + board[lines[i][1]] + board[lines[i][2]];
		if (s == 3) {
			msg = 'Player has won!';
			displayBoard(board);
			return;
		} else if (s == -3) {
			msg = 'Computer has won!';
			displayBoard(board);
			return;
		}
		// can computer win??
		for (var i = 0; i < lines.length; i++) {
			s = board[lines[i][0]] + board[lines[i][1]] + board[lines[i][2]];
			if (s == -2) { // computer can win
				for (var j = 0; j <= 2; j++) {
					if (board[lines[i][j]] == 0) {
						board[lines[i][j]] = -1;
						displayBoard(board);
						return;
					}
				}
			}
		}
		// check can player win??
		for (var i = 0; i < lines.length; i++) {
			s = board[lines[i][0]] + board[lines[i][1]] + board[lines[i][2]];
			if (s == 2) { // computer can win
				for (var j = 0; j <= 2; j++) {
					if (board[lines[i][j]] == 0) {
						board[lines[i][j]] = 1;
						displayBoard(board);
						return;
					}
				}
			}
		}
	}
}



