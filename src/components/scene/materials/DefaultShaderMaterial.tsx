import { extend } from "@react-three/fiber";
import * as THREE from "three";
import { ShaderMaterial } from "three";

export const vertex = `
precision mediump float;

varying vec3 vPosition;

void main(){
  vPosition = position;

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;
}
`;

export const fragment = `
#define PI 3.1415926538
precision mediump float;

varying vec3 vPosition;

void main() {

	gl_FragColor = vec4(vPosition, 1.0);
}
`;

export class DefaultShaderMaterial extends ShaderMaterial {
  constructor() {
    super({
      vertexShader: vertex,
      fragmentShader: fragment,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: {
          value: 0,
        },
        uTexture: {
          value: THREE.Texture,
        },
        uMouse: {
          value: new THREE.Vector2(0, 0),
        },
        uRes: {
          value: new THREE.Vector2(0, 0),
        },
      },
    });
  }
}

extend({ DefaultShaderMaterial });
