#version 300 es
precision mediump float;

in vec2 pos;

out vec4 fragColor;

void main() {
    fragColor = vec4((pos + 1.0) / 2.0, (pos.x + pos.y) / 2.0, 1.0);
}
