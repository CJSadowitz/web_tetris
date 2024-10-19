precision mediump float;

varying vec2 res;
varying vec2 center;

void main()
{
	vec2 temp_center = vec2(0.5, 0.5);
	vec2 st = gl_FragCoord.xy/res.xy;
	
	vec2 pos = st - center + vec2(0.5);

	vec2 bl = step(vec2(0.4), pos);
	float pct = (bl.x * bl.y);

	vec2 tr = step(vec2(0.4), 1.0 - pos);
	pct *= tr.x * tr.y;

	vec3 color = vec3(1.0 - pct);
	gl_FragColor = vec4(color, 1);
}
