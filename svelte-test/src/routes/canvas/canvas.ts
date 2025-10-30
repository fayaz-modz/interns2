function resize(gl: WebGL2RenderingContext) {
	gl.canvas.width = window.innerWidth;
	gl.canvas.height = window.innerHeight;

	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
}

function createShader(
	gl: WebGL2RenderingContext,
	type: number, // vertex, fragment
	source: string
): WebGLShader {
	const vs = gl.createShader(type)!;
	gl.shaderSource(vs, source);
	gl.compileShader(vs);

	if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
		throw new Error(gl.getShaderInfoLog(vs) || 'unknown error');
	}
	return vs;
}

const vssource = `#version 300 es

precision highp float;

uniform vec2 offset;

in vec2 pos;
in vec2 instancePos;

out vec2 vpos;

void main () {
   vec2 local = vec2(offset.x * 2.0 - 1.0, offset.y * 2.0 + 1.0);
   gl_Position = vec4(pos + local + instancePos, 0.0, 1.0);
   gl_PointSize = 100.0;

   vpos = pos + local;
}
`;

const fssource = `#version 300 es

precision highp float;

in vec2 vpos;

out vec4 fragColor;

void main() {
    fragColor = vec4(vpos * 1.6, 0.8, 1.0);
}
`;

function createProgram(gl: WebGL2RenderingContext, vs: WebGLShader, fs: WebGLShader): WebGLProgram {
	const program = gl.createProgram()!;

	gl.attachShader(program, vs);
	gl.attachShader(program, fs);
	gl.linkProgram(program);

	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		throw new Error(gl.getProgramInfoLog(program) || 'unknown error');
	}

	return program;
}

export function runCanvas() {
	const canvas = document.getElementById('canvas') as HTMLCanvasElement;
	const gl = canvas.getContext('webgl2')!;

	resize(gl);

	window.addEventListener('resize', () => resize(gl));

	const vs = createShader(gl, gl.VERTEX_SHADER, vssource);
	const fs = createShader(gl, gl.FRAGMENT_SHADER, fssource);

	const program = createProgram(gl, vs, fs);

	gl.useProgram(program);

	const posLoc = gl.getAttribLocation(program, 'pos');
	const offsetLoc = gl.getUniformLocation(program, 'offset');
	const instancePosLoc = gl.getAttribLocation(program, 'instancePos')!;

	// buffers
	const buf = gl.createBuffer()!;

	const bufData = new Float32Array([
		0.0,
		0.5, // xy
		0.5,
		0.0,
		-0.5,
		0.0,
		0.5,
		0.5
	]);

	gl.bindBuffer(gl.ARRAY_BUFFER, buf);
	gl.bufferData(gl.ARRAY_BUFFER, bufData, gl.STATIC_DRAW);

	gl.enableVertexAttribArray(posLoc);
	gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

	const instanceBuf = gl.createBuffer()!;
	const instPos = new Float32Array([0, 0, 0.5, 0.5, -0.5, 0.5]);

	gl.bindBuffer(gl.ARRAY_BUFFER, instanceBuf);
	gl.bufferData(gl.ARRAY_BUFFER, instPos, gl.STATIC_DRAW);

	gl.enableVertexAttribArray(instancePosLoc);
	gl.vertexAttribPointer(instancePosLoc, 2, gl.FLOAT, false, 0, 0);
	gl.vertexAttribDivisor(instancePosLoc, 1);

	let lastX = 0,
		lastY = 0;
	let offsetX = 0,
		offsetY = 0;
	canvas.addEventListener('mousemove', (e) => {
		const dx = e.clientX - lastX;
		const dy = e.clientY - lastY;

		offsetX += dx / canvas.width;
		offsetY -= dy / canvas.height;

		lastX = e.clientX;
		lastY = e.clientY;
	});

	function draw() {
		gl.clearColor(0.2, 0.2, 0.2, 1); // r, g, b, alpha
		gl.clear(gl.COLOR_BUFFER_BIT);
		gl.uniform2f(offsetLoc, offsetX, offsetY);

		gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, 3);

		requestAnimationFrame(draw);
	}

	draw();
}
