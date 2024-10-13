const Piece =
{
	rotation: 0,
	i:
	{
		pos: [0, 8, 16, 24], // divide it by 8 to get rotated position?
		r_pos: [0, 1, 2, 3]
	},
	o:
	{
		pos: [0, 1, 8, 9] // no rotations
	},
	t:
	{
		pos_0: [0, 8, 7, 9], // other two rotations are negative
		pos_1: [0, -1, -9, 7],
		pos_2: [0, 1, 9, -7],
		pos_3: [0, -8, -7, -9]
	},
	s:
	{
		pos: [0, 8, 7, 1], // two rotations...
		r_pos:[0, 1, 9, -8]
	},
	z:
	{
		pos: [0, 8, 9, -1], // two rotations...
		r_pos: [0, -8, -1, 7]
	},
	j:
	{
		pos: [0, 8, 16, 1], // two rotations...
		r_pos: [0, 8, -1, -2]
	},
	l:
	{
		pos: [0, 8, 16, -1], // two rotations...
		r_pos: [0, 8, 1, 2]
	}
}

export default Piece;
