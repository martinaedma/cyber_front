import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useStore } from "../../store";

export const CityCamera = () => {
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const currentView = useStore((state) => state.currentView);
  const view = useStore((state) => state.view);

  const center = new THREE.Vector3(10, 10, 0)

  useEffect(() => {
    if(cameraRef.current){
      cameraRef.current.rotation.x = 1      
    } 
  }, [])

  useFrame(({clock}, delta) => {
    if(cameraRef.current) {
      // cameraRef.current.position.y += 0.2 * delta
      cameraRef.current.lookAt(center)
    }     
  })

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault={view[currentView] === "city" ? true : false}
      position={[10, -12, 15]}
      fov={50}
      aspect={window.innerWidth / window.innerHeight}
      near={1}
      far={500}
    />
  );
};
