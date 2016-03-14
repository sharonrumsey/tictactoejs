var lines = [
	[ 1, 2, 3],
	[ 4, 5, 6],
	[ 7, 8, 9],
	[ 1, 4, 7],
	[ 2, 5, 8],
	[ 3, 6, 9],
	[ 1, 5, 9],
	[ 3, 5, 7]
]

var board = [ '', 0, 0, 0, 0, -1, 0, 0, 0, 0 ];
var cells = [];

function start() {
	var s 
	for (var i = 1; i <= 9; i++) {
		s = '#' + i.toString();
		cells[i] = document.getElementById(s);
	}
}

function displayBoard(board) {
	for (var i = 1; i <= 9; i++) {

	}
}