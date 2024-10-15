export class Shader
{
	constructor(gl, v_source, f_source)
	{
		// create two shaders and link it into a single 'program'
		var v_shader = this.create_shader(gl, gl.VERTEX_SHADER, v_source);
		var f_shader = this.create_shader(gl, gl.FRAGMENT_SHADER, f_source);

		this.program = this.create_program(gl, v_shader, f_shader);
	}
	create_shader(gl, type, source)
	{
		var shader = gl.createShader(type);
		gl.shaderSource(shader, source);
		gl.compileShader(shader);

		var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
		if (success)
			return shader;

		console.log(gl.getShaderInfoLog(shader));
		gl.deleteShader(shader);
	}
	create_program(gl, v_shader, f_shader)
	{
		var program = gl.createProgram();
		gl.attachShader(program, v_shader);
		gl.attachShader(program, f_shader);
		gl.linkProgram(program);
		var success = gl.getProgramParameter(program, gl.LINK_STATUS);
		if (success)
			return program;
		console.log(gl.getProgramInfoLog(program));
	}
	get_program()
	{
		return this.program;
	}
}
