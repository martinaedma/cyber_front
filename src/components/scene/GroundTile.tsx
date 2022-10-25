import { Plane } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import React, { RefObject, useState } from "react";
import * as THREE from "three";
import { useStore } from "../../store";

interface GroundTileProps {
  color: string;
  size: {
    x: number,
    y: number
  }
  position: {
    x: number,
    y: number,
    z: number
  }
}

export const GroundTile = ({
  color,
  size,
  position
}: GroundTileProps): JSX.Element => {

  const droneRef = useStore((state) => state.droneRef)
  const isMouseDown = useStore((state) => state.isMouseDown)
  const [currentColor, setCurrentColor] = useState(color)
  const [tilePosition, setTilePosition] = useState(new THREE.Vector3(position.x, position.y, position.z))
  const setNextPosition = useStore((state) => state.setNextPosition)
  
  const handleEnter = (e: ThreeEvent<PointerEvent>) => {
    if (isMouseDown.current !== 'false') return
    setCurrentColor('violet')
  }
  const handleLeave = (e: ThreeEvent<PointerEvent>) => {
    setCurrentColor(color)
  }
  const handleUp = (e: ThreeEvent<PointerEvent>) => {
    if (!droneRef.current) return
    const distance = tilePosition.distanceTo(droneRef.current.position)
    if (distance > 1.5) return
    setNextPosition(tilePosition)
  }

  return (
    <Plane args={[size.x, size.y]} position={tilePosition} 
      onPointerEnter={(e) => handleEnter(e)} 
      onPointerLeave={(e) => handleLeave(e)} 
      onPointerUp={(e) => handleUp(e)}>
      <meshBasicMaterial color={`${currentColor}`} />
    </Plane>
  );
};
