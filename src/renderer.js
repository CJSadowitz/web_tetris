export class Object
{
	constructor(gl, s_program)
	{
		// members: buffer, gl-context, attribute, shader-program
		this.gl = gl;
		this.program = s_program.program;
		this.buffer = gen_buffer();
		this.attrib_location(this.program, "a_position");
		this.positions;
	}
	gen_buffer()
	{
		return this.gl.createBuffer();
	}
	bind()
	{
		// bind buffer (with data already in it)
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
	}
	set_attributes(size, type, stride, offset)
	{
		this.gl.enableVertexAttribArray(this.attrib_location);
		this.gl.vertexAttributePointer(this.attrib_location, size, type, false, stride, offset);
	}
	render()
	{
		// Activate the shader
		this.gl.useProgram(this.program);
		// Activate the attributepointer
		this.gl.enableVertexAttribArray(this.attrib_location);
		// bind the buffer
		this.bind();
		// draw the triangles
		this.gl.drawArrays(this.gl.TRIANGLES, 0, this.positions.length());
		// the zero is the offset within the buffer
	}
	set_pos(positions)
	{
		// update the buffer:
		// bind buffer
		this.bind();
		// put data into buffer
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW);
	}
}
