import { test } from './src/bitboard.js';
import { Game } from './src/game.js';

window.test = test;

function main()
{
	// Get the canvas element and the WebGL rendering context
	var canvas = document.getElementById('webgl-canvas');
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;
	var gl = canvas.getContext('webgl');

	// If WebGL is not available, display an error
	if (!gl) {
		alert('WebGL not supported');
	}

	// Game Loop
	let tetris_game = new Game(gl);

	// Should I await this?
	tetris_game.start().then(value => {
		console.log(value);
		tetris_game.game_loop();
	});

	// Set the clear color to a bright blue
	gl.clearColor(0.0, 0.5, 1.0, 1.0);

	// Clear the color buffer
	gl.clear(gl.COLOR_BUFFER_BIT);
}
main()
