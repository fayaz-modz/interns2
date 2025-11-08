#version 300 es

precision mediump float;

uniform vec2 uPos;
in vec2 aPos;
in vec2 aInstancePos;

out vec2 pos;

void main() {
    gl_Position = vec4(aInstancePos + aPos + uPos, 0.0, 1.0);
    gl_PointSize = 10.0;

    pos = aPos + uPos;
}
