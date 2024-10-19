attribute vec4 a_position; // describes quad vertex locations

uniform vec2 u_res;
uniform int offset[4]; // describes center location of quads

varying vec2 res;
varying vec2 center;

void main() {
	// move the six vertices describing the quad to offset location
	vec2 quad_location = a_position.xy + (vec2(offset[0]) / u_res.xy) * 2.0 + 1.0;

	gl_Position = vec4(a_position);
	gl_PointSize = 100.0;

	res = u_res;
	center = vec2(a_position.xy) / u_res; // update to handle single value
}
