import { Bitboard } from './bitboard.js';
import { Piece } from './pieces.js';
import { Game_Input } from './input_handler.js';
import { Timer } from './timer.js';
import { get_random_piece } from './rand_piece.js';
import { Shader } from './shader.js';
import { load_shader } from './load_shader.js';

// :)
async function init_p_shader(gl)
{
	const p_v_shader_source = await load_shader('src/shaders/piece_v_shader.glsl');
	const p_f_shader_source = await load_shader('src/shaders/piece_f_shader.glsl');
	return new Shader(gl, p_v_shader_source, p_f_shader_source);
}

class Game
{
	constructor(gl)
	{
		this.game_board = new Bitboard;
		this.position = 123; // set position to be at the top of the screen for each new piece
		this.cur_piece = get_random_piece(); // should start with a random piece
		this.timer = new Timer; // make a class or function or something
		this.input = new Game_Input();
		this.input.key_listener();
		this.gl = gl;

		// initialize shaders (hands are about to be thrown with this code
		init_p_shader(gl).then(program => {
		if (program.program) {
				this.piece_program = program.program;
				console.log("Piece shaders initialized");
				this.positionAttributeLocation = this.gl.getAttribLocation(program.program, "a_position");
			}
		});
	}
	rotate_piece(piece, position, new_rotation)
	{
		// check if rotation is valid. If so, update the piece's rotation
		if (this.game_board.check_rotation(piece, position, new_rotation))
			piece.rotation = new_rotation;
		else
			return;
	}
	move_piece(piece, next_position)
	{
		// check if the next location is valid, if not, place piece in current location
		if (this.game_board.check_next_position(piece, next_position))
			this.position = next_position; // next location is legal position
		else // update this such that if the next downward location is not legal, place the piece
		{
			console.log("Placed Piece");
			this.game_board.place_piece(this.cur_piece, this.position);
			this.cur_piece = get_random_piece();
			this.position = 123; // NEED TO RESET LOCATION TO TOP OF SCREEN
		}
	}
	render()
	{
		// This needs to wait on this.piece_program to be loaded first
		// var positionAttributeLocation = this.positionAttributeLocation;
		// send piece data to buffers
		// var position_buffer = this.gl.createBuffer();
		// this.gl.bindBuffer(this.gl.ARRAY_BUFFER, position_buffer);

		// var positions = [
		// 	0, 0,
		// 	0, 0.5,
		//	0.7, 0,
		// ];
		// this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW);

  		// code above this line is initialization code
  		// code below this line is rendering code

  		// webglUtils.resizeCanvasToDisplaySize(this.gl.canvas)

  		// Tell WebGL how to convert from clip space to pixels
		// this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

		// Clear the canvas
		// this.gl.clearColor(0, 0, 0, 0);
		// this.gl.clear(this.gl.COLOR_BUFFER_BIT);

		// Tell it to use our program (pair of shaders)
		// this.gl.useProgram(this.piece_program);

		// Turn on the attribute
		// this.gl.enableVertexAttribArray(positionAttributeLocation);

		// Bind the position buffer
		// this.gl.bindBuffer(this.gl.ARRAY_BUFFER, position_buffer);

		// Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
		// var size = 2;          // 2 components per iteration
		// var type = this.gl.FLOAT;   // the data is 32bit floats
		// var normalize = false; // don't normalize the data
		// var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
		// var offset = 0;        // start at the beginning of the buffer
		// this.gl.vertexAttribPointer(
		// 	positionAttributeLocation, size, type, normalize, stride, offset);
		// var primitiveType = this.gl.TRIANGLES;
		// var offset = 0;
		// var count = 3;
		// This is all I really need to call for the render loop, the rest can be in an object
		// this.gl.drawArrays(primitiveType, offset, count);
	}
	game_loop() // generate a piece, slowly move downward. place piece on board
	{
		// LOOK AT PARAMETERS
		console.log("Game_loop");
		if (this.input.left == true)
			this.move_piece(this.cur_piece, this.position + 1);
		else if (this.input.right == true)
			this.move_piece(this.cur_piece, this.position - 1);
		else if (this.input.up == true)
			this.rotate_piece(this.cur_piece, this.position, (this.cur_piece.rotation + 1) % 4)
		this.render();
		this.timer.update();
		if (this.timer.count == 0)
		{
			console.log("End of timer");
			// this.game_board.print_board();
			this.move_piece(this.cur_piece, this.position - 8);
			this.timer.reset();
			this.render();
		}
		requestAnimationFrame(this.game_loop.bind(this));
	}
}

export { Game };
