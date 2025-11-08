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
	const fpsElement = document.getElementById('fps');

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
	gl.uniform2f(uPosLocation, -0.4, 0.6);

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

	// instance
	const aInstancePosLocation = gl.getAttribLocation(program, 'aInstancePos')!;
	gl.enableVertexAttribArray(aInstancePosLocation);
	const instancePosBuffer = gl.createBuffer()!;
	gl.bindBuffer(gl.ARRAY_BUFFER, instancePosBuffer);
	const instancePosData = new Float32Array(
		// prettier-ignore
		[
	           -0.1, -0.8,
	           0.8, 0.0,
	           0.4, 0.0,
	           0.0, 0.2,
	           -0.2, 0.2,
	       ]
	);
	gl.bufferData(gl.ARRAY_BUFFER, instancePosData, gl.STATIC_DRAW);

	gl.vertexAttribPointer(aInstancePosLocation, 2, gl.FLOAT, false, 2 * 4, 0);

	// IMPORTANT to differenciate from normal buffers to instance buffers
	gl.vertexAttribDivisor(aInstancePosLocation, 1);

	// dynamic rendering

	let x = 0;
	let y = 0;

	// fps: frames per second
	let lastFrame = 0; // time
	let frames = 0; // count of frames
	let fps = 0;

	function draw() {
		gl.uniform2f(uPosLocation, x, y);
		gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, 5);

		frames = frames + 1;
		if (frames > 10) fpsCalculate();
		requestAnimationFrame(draw);
	}

	document.addEventListener('pointermove', (e) => {
		const posX = e.clientX / window.innerWidth;
		const posY = e.clientY / window.innerHeight;
		const transformedX = posX * 2 - 1;
		const transformedY = posY * 2 - 1;

		x = transformedX;
		y = -transformedY;
	});

	draw();

	const fpsCalculate = () => {
		const timeTook = (performance.now() - lastFrame) / 1000;
		fps = frames / timeTook;
		if (fpsElement) fpsElement.innerHTML = `${fps.toFixed(2)} FPS`;
		frames = 0;
		lastFrame = performance.now();
	};
}
