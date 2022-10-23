import React, { useEffect, useRef, useState, MutableRefObject } from "react";
import * as THREE from "three";
import {
  Canvas,
  ReactThreeFiber,
  ThreeEvent,
  useFrame,
  extend,
  invalidate,
} from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { DefaultPlane } from "./DefaultPlane";

const CanvasComponent = (): JSX.Element => {
  return (
    <div className="canvas-container">
      {/* TODO: frameloop="demand" */}
      <Canvas>
        <OrbitControls />
        <PerspectiveCamera
          makeDefault
          position={[0, 0, 20]}
          fov={50}
          aspect={window.innerWidth / window.innerHeight}
          near={1}
          far={500}
          // ref={cameraRef}
        />
        <DefaultPlane/>
      </Canvas>
    </div>
  );
};

export default CanvasComponent;
