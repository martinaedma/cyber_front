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
import { World } from "./World";
import { CityCamera } from "./CityCamera";
import { useStore } from "../../store";

const CanvasComponent = (): JSX.Element => {
  const droneRef = useStore((state) => state.droneRef);
  const isMouseDown = useStore((state) => state.isMouseDown);

  const handleCameraRotate = (e: React.PointerEvent) => {
    e.preventDefault();
    if (!droneRef.current || !isMouseDown.current) return;
    if (isMouseDown.current !== "true") return
    console.log(droneRef.current.rotation.y);
    droneRef.current.rotation.y += e.movementX * 0.01;
  };

  const pointerDown = (e:React.PointerEvent) => {
    e.preventDefault()
    isMouseDown.current = "true";
  }

  const pointerUp = (e:React.PointerEvent) => {
    e.preventDefault()
    isMouseDown.current = "false"
  }

  return (
    <div
      className="canvas-container"
      onPointerMove={(e) => handleCameraRotate(e)}
      onPointerDown={(e) => pointerDown(e)}
      onPointerUp={(e) => pointerUp(e)}
    >
      {/* TODO: frameloop="demand" */}
      <Canvas>
        <CityCamera />
        {/* <OrbitControls />         */}
        {/* <DefaultPlane/> */}
        <World />
      </Canvas>
    </div>
  );
};

export default CanvasComponent;
