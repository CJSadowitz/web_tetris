export let Piece =
{
	i:
	{
		rotation: 0,
		pos: [0, 8, 16, 24], // divide it by 8 to get rotated position?
		r_pos: [0, 1, 2, 3]
	},
	o:
	{
		rotation: 0,
		pos: [0, 1, 8, 9], // no rotations
		r_pos: [0, 1, 8, 9]
	},
	t:
	{
		rotation: 0,
		pos: [0, 8, 7, 9], // other two rotations are negative
		r_pos: [0, -1, -9, 7],
	},
	s:
	{
		rotation: 0,
		pos: [0, 8, 7, 1], // two rotations...
		r_pos:[0, 1, 9, -8]
	},
	z:
	{
		rotation: 0,
		pos: [0, 8, 9, -1], // two rotations...
		r_pos: [0, -8, -1, 7]
	},
	j:
	{
		rotation: 0,
		pos: [0, 8, 16, 1], // four rotations...
		r_pos: [0, 8, -1, -2]
		// pos: [0, -8, 1, 2] // negative r_pos
		// pos: [0, -8, -16, -1] // negative pos
	},
	l:
	{
		rotation: 0,
		pos: [0, 8, 16, -1], // four rotations...
		r_pos: [0, 8, 1, 2]
		// pos: [0, -8, -1, -2] // just negative r_pos
		// pos: [0, -8, -16, 1] // just negative pos
	}
}

export default Piece;
