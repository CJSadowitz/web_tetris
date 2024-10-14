import Piece from './pieces.js';
class Bitboard
{
	constructor()
	{
		this.board_0 = 0x0000;
		this.board_1 = 0x0000;
		this.board_2 = 0x0000;
		this.board_3 = 0x0000;
	}
	check_rotation(piece, position, rotation) // returns true if rotation is legal
	{
		switch(rotation)
                {
                        case(0):
                                for (let i = 0; i < 4; i++)
                                        if (check_bit(piece.pos[i] + position) == false)
                                                return false;
                                break;
                        case(1):
                                for (let i = 0; i < 4; i++)
                                        if (check_bit(piece.r_pos[i] + position) == false)
                                                return false;
                                break;
                        case(2):
                                for (let i = 0; i < 4; i++)
                                        if (check_bit((-1 * piece.pos[i]) + position) == false)
                                                return false;
                                break;
                        case(3):
                                for (let i = 0; i < 4; i++)
                                        if (check_bit((-1 * piece.r_pos[i]) + position) == false)
                                                return false;
                                break;
                }
                return true; // position is valid
	}
	check_next_position(piece, new_position) // returns true if new position is legal
	{
		switch (piece.rotation)
		{
			case(0):
				for (let i = 0; i < 4; i++)
					if (check_bit(piece.pos[i] + new_position) == false)
						return false;
				break;
			case(1):
				for (let i = 0; i < 4; i++)
					if (check_bit(piece.r_pos[i] + new_position) == false)
						return false;
				break;
			case(2):
				for (let i = 0; i < 4; i++)
					if (check_bit((-1 * piece.pos[i]) + new_position) == false)
						return false;
				break;
			case(3):
				for (let i = 0; i < 4; i++)
					if (check_bit((-1 * piece.r_pos[i]) + new_position) == false)
						return false;
				break;
		}
		return true; // position is valid
	}
	place_piece(piece, position)
	{
		if (piece.rotation == 0)
		{
			for (let i = 0; i < 4; i++)
				this.set_bit(piece.pos[i] + position);
		}
		else if (piece.rotation == 1)
		{
			for (let i = 0; i < 4; i++)
				this.set_bit(piece.r_pos[i] + position);
		}
		else if (piece.rotation == 2) // t_piece only
		{
			for (let i = 0; i < 4; i++)
				this.set_bit((-1 * piece.pos[i]) + position);
		}
		else if (piece.rotation == 3) // t_piece only
		{
			for (let i = 0; i < 4; i++)
                                this.set_bit((-1 * piece.r_pos[i]) + position);

		}
	}
	set_bit(position)
	{
		// bottom bit board
		if (position >=0 && position <= 31)
			this.board_0 |= (1 << position);
		else if (position >= 32 && position <= 63)
			this.board_1 |= (1 << position);
		else if (position >= 64 && position <= 95)
			this.board_2 |= (1 << position);
		else if (position >= 96 && position <= 127)
			this.board_3 |= (1 << position);
	}
	check_bit(position) // returns true if off
	{
                if (position >=0 && position <= 31)
			return ((this.board_0 & (1 << position)) == 0)
                else if (position >= 32 && position <= 63)
			return ((this.board_1 & (1 << position)) == 0)
                else if (position >= 64 && position <= 95)
			return ((this.board_2 & (1 << position)) == 0)
                else if (position >= 96 && position <= 127)
			return ((this.board_3 & (1 << position)) == 0)
		else
			return false;
	}
	print_board()
	{
		const string_4 = ((this.board_0 >>> 0).toString(2).padStart(32, '0'));
		const string_3 = ((this.board_1 >>> 0).toString(2).padStart(32, '0'));
		const string_2 = ((this.board_2 >>> 0).toString(2).padStart(32, '0'));
		const string_1 = ((this.board_3 >>> 0).toString(2).padStart(32, '0'));
		for (let i = 0; i < 16; i++)
		{
			if (i >= 0 && i < 4)
				console.log(i + '  ' + string_1.slice(0 + 8 * (i % 4), 8 + 8 * (i % 4)));
			else if (i >= 4 && i < 8)
				console.log(i + '  ' + string_2.slice(0 + 8 * (i % 4), 8 + 8  * (i % 4)));
                        else if (i >= 8 && i < 12)
                                console.log(i + ' ' + string_3.slice(0 + 8 * (i % 4), 8 + 8 * (i % 4)));
                        else if (i >= 12 && i < 16)
                                console.log(i + ' ' + string_4.slice(0 + 8 * (i % 4), 8 + 8 * (i % 4)));
		}
	}
}

export function test()
{
	const gameboard = new Bitboard;
	gameboard.print_board();
}
