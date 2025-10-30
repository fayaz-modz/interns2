export function runCanvas() {
	const canvas = document.getElementById('canvas') as HTMLCanvasElement;
	const gl = canvas.getContext('webgl2')!;

	const program = gl.createProgram();
}
