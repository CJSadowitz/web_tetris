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
		this.size = 0;
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
	render()
	{
		// Activate the shader
		this.gl.useProgram(this.program);
		// Activate the attributepointer
		this.gl.enableVertexAttribArray(this.attrib_location);
		// bind the buffer
		this.bind();
		// draw the triangles
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
