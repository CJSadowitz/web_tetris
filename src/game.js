import { Bitboard } from './bitboard.js';
import { Piece } from './pieces.js';

class Game
{
	constructor()
	{
		this.game_board = new Bitboard;
		this.position = 123; // set position to be at the top of the screen for each new piece
		this.cur_piece = 0; // should start with a random piece
		this.timer = 0; // make a class or function or something
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
		else
			this.game_board.place_piece(this.cur_piece, this.position);
			this.cur_piece = new_piece(); // NEED TO MAKE THIS FUNCTION
			this.position = 123; // NEED TO RESET LOCATION TO TOP OF SCREEN
	}
	game_loop(input) // generate a piece, slowly move downward. place piece on board
	{
		// LOOK AT PARAMETERS
		while (this.timer != 0)
		{
			if (input.left == true)
				this.move_piece(this.piece, this.position + 1);
			if (input.right == true)
				this.move_piece(this.piece, this.position - 1);
			if (input.up == true)
				this.rotate_piece(this.piece, this.position, (this.piece.rotation + 1) % 4))
			this.timer.update();
		}
		this.move_piece(this.piece, this.position - 8);
	}
}

export { Game };
