import { Piece } from './pieces.js';

export function get_random_piece()
{
	const piece_types = Object.keys(Piece);
	const random_index = Math.floor(Math.random() * piece_types.length);
	return Piece[piece_types[random_index]];
}
