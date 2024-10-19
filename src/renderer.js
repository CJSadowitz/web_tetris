export class Object
{
	constructor(gl, s_program)
	{
		// members: buffer, gl-context, attribute, shader-program
		console.log("Object Constructor Called");
		this.status = true;
		this.gl = gl;
		this.program = s_program;
		this.buffer = this.gl.createBuffer();
		this.attrib_location = this.gl.getAttribLocation(s_program, "a_position");

		this.resolution_uniform_location = this.gl.getUniformLocation(s_program, "u_res");
		this.offset_uniform_location = this.gl.getUniformLocation(s_program, "piece_offset");

		this.size = 0;
		this.offset_buffer_data = null;
	}
	bind()
	{
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
	}
	set_attributes(size, type, stride, offset)
	{
		this.gl.enableVertexAttribArray(this.attrib_location);
		this.gl.vertexAttribPointer(this.attrib_location, size, type, false, stride, offset);
	}
	set_offset_buffer(list)
	{
		this.offset_buffer_data = list;
	}
	render()
	{
		// Activate the shader
		this.gl.useProgram(this.program);

		this.gl.enableVertexAttribArray(this.attrib_location);
		this.bind();

		this.gl.uniform2f(this.resolution_uniform_location, this.gl.canvas.width, this.gl.canvas.height);
		this.gl.uniform1fv(this.offset_uniform_location, this.offset_buffer_data);

		this.gl.drawArrays(this.gl.TRIANGLES, 0, this.size);
		// the zero is the offset within the buffer
	}
	set_pos(positions)
	{
		// bind buffer
		this.bind();
		// put data into buffer
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW);
		this.size = positions.length / 2;
	}
}
