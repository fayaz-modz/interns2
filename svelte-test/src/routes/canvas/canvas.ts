import vssource from './shader/main.vert';
import fssource from './shader/main.frag';

function createShader(gl: WebGL2RenderingContext, type: number, source: string) {
	const shader = gl.createShader(type)!;
	gl.shaderSource(shader, source);
	gl.compileShader(shader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		const error = gl.getShaderInfoLog(shader);
		throw new Error(error ?? 'unknown error');
	}

	return shader;
}

function createProgram(gl: WebGL2RenderingContext, vs: WebGLShader, fs: WebGLShader) {
	const program = gl.createProgram()!;
	gl.attachShader(program, vs);
	gl.attachShader(program, fs);
	gl.linkProgram(program);

	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		const error = gl.getProgramInfoLog(program);
		throw new Error(error ?? 'unknown error');
	}
	return program;
}

export function runCanvas() {
	const canvas = document.getElementById('canvas') as HTMLCanvasElement;

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	const gl = canvas.getContext('webgl2')!;

	gl.viewport(0, 0, canvas.width, canvas.height);

	const vertexShader = createShader(gl, gl.VERTEX_SHADER, vssource);
	const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fssource);
	const program = createProgram(gl, vertexShader, fragmentShader);

	gl.useProgram(program);

	// uniforms
	const uPosLocation = gl.getUniformLocation(program, 'uPos')!;
	gl.uniform2f(uPosLocation, 0.0, 0.5);

	// attribute
	const aPosLocation = gl.getAttribLocation(program, 'aPos')!;

	gl.enableVertexAttribArray(aPosLocation);

	const posBuffer = gl.createBuffer()!;
	gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);

	const posData = new Float32Array(
		// prettier-ignore
		[
            0.0, 0.0,
            0.3, 0.3,
            -0.3, -0.6,
            0.5, 0.2,
        ]
	);
	gl.bufferData(gl.ARRAY_BUFFER, posData, gl.STATIC_DRAW);

	// -128 to 128 => -1 to 1; 80 => 0.8 // normalization

	gl.vertexAttribPointer(aPosLocation, 2, gl.FLOAT, false, 2 * 4, 0);

	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}
