import { test } from './src/bitboard.js';
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

	// Game loop
	// while (true)
	// {
	// 
	// }

	// Set the clear color to a bright blue
	gl.clearColor(0.0, 0.5, 1.0, 1.0);

	// Clear the color buffer
	gl.clear(gl.COLOR_BUFFER_BIT);
}
main()
