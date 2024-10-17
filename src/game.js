import { Bitboard } from './bitboard.js';
import { Piece } from './pieces.js';
import { Game_Input } from './input_handler.js';
import { Timer } from './timer.js';
import { get_random_piece } from './rand_piece.js';
import { Shader } from './shader.js';
import { load_shader } from './load_shader.js';
import { Object } from './renderer.js';

class Game
{
	constructor(gl)
	{
		this.game_board = new Bitboard;
		this.position = 123; // set position to be at the top of the screen for each new piece
		this.cur_piece = get_random_piece();
		this.timer = new Timer; // make a class or function or something
		this.input = new Game_Input();
		this.input.key_listener();
		this.gl = gl;

		this.piece_object = null;
		this.board_object = null;
	}
	async init_objects()
	{
        	const p_v_shader_source = await load_shader('src/shaders/piece_v_shader.glsl');
	        const p_f_shader_source = await load_shader('src/shaders/piece_f_shader.glsl');
	        return new Shader(this.gl, p_v_shader_source, p_f_shader_source);
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
		// why does this render nothing?
		var positions = [
			0, 0,
			0, 0.5,
			0.7, 0,
		];
		this.piece_object.set_pos(positions);

		// components per iteration, type, stide, offset (for 2D size of 2 works)
		this.piece_object.set_attributes(2, this.gl.FLOAT, 0, 0);

		this.piece_object.render();
	}
	async start()
	{
		await this.init_objects().then(program => {
                if (program.program) {
                                // this.piece_program = program.program;
                                console.log("Piece shaders initialized");
                                // this.positionAttributeLocation = this.gl.getAttribLocation(program.program, "a_position");
                                this.piece_object = new Object(this.gl, program.program);
                                this.board_object = new Object(this.gl, program.program);
                        }
                });
		return true;
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
