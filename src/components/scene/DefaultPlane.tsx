import { extend, ReactThreeFiber } from "@react-three/fiber";
import { DefaultShaderMaterial } from "./materials/DefaultShaderMaterial"

extend({ DefaultShaderMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      defaultShaderMaterial: ReactThreeFiber.Object3DNode<
      DefaultShaderMaterial,
        typeof DefaultShaderMaterial
      >;
    }
  }
}

export const DefaultPlane = ():JSX.Element => {
  return<mesh>
  <planeGeometry
    attach="geometry"
    // args={[(viewSize.height * 16) / 9, viewSize.height, 1, 1]}
    args={[16, 9, 1, 1]}
  />
  <defaultShaderMaterial/>
</mesh>
}