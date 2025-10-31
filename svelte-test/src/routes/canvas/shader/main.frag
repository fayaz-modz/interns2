#version 300 es
precision mediump float;

in vec2 pos;

out vec4 fragColor;

void main() {
    fragColor = vec4(pos, 0.9, 1.0);
}
