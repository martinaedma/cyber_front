import * as THREE from "three";
import React, { useEffect, useRef, useState } from "react";
import { Line, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useStore } from "../../../store";
import { useFrame } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    Cylinder000: THREE.Mesh;
    Cylinder000_1: THREE.Mesh;
    Cylinder000_2: THREE.Mesh;
    Cylinder000_3: THREE.Mesh;
    Cylinder000_4: THREE.Mesh;
    Cylinder000_5: THREE.Mesh;
  };
  materials: {
    ["rotor_metal.001"]: THREE.MeshStandardMaterial;
    ["drone_body_1.001"]: THREE.MeshStandardMaterial;
    ["camera_lens.001"]: THREE.MeshStandardMaterial;
    ["drone_body_2.001"]: THREE.MeshStandardMaterial;
    ["drone_wings.001"]: THREE.MeshStandardMaterial;
    body_middle: THREE.MeshStandardMaterial;
  };
};

type GroupProps = JSX.IntrinsicElements["group"];

interface DroneProps extends GroupProps {
  droneId: string;
  location: THREE.Vector3;
}

export default function CarrierDrone({ ...props }: DroneProps) {
  const group = useStore((state) => state.droneRef);

  const { nodes, materials } = useGLTF(
    "/drone_friendly.glb"
  ) as unknown as GLTFResult;
  const currentView = useStore((state) => state.currentView);
  const view = useStore((state) => state.view);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const cargo = useStore((state) => state.cargo);
  const nextPosition = useStore((state) => state.nextPosition);

  const [isMoving, setIsMoving] = useState(false);

  useFrame((state, dt) => {
    if (!cameraRef.current || !group.current) return;

    // group.current.position.y += 20 * dt
    cameraRef.current.lookAt(group.current.position);
    cameraRef.current.rotation.z = group.current.rotation.z;
    // group.current.position.y += dt * 11.0;

    if (nextPosition) {
      let newPos = nextPosition;
      newPos = group.current.position.lerp(newPos, 2.5 * dt);
      group.current.position.x = newPos.x;
      group.current.position.y = newPos.y;
      group.current.position.z = 1;
    }
  });

  useEffect(() => {
    if (group.current) {
      group.current.rotateX(Math.PI / 2);
      group.current.rotateY(Math.PI);
    }
  }, [group]);

  return (
    <group ref={group} {...props} dispose={null} position={props.location}>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault={view[currentView] === props.droneId ? true : false}
        position={[0, 1, -2]}
        fov={50}
        aspect={window.innerWidth / window.innerHeight}
        near={0.1}
        far={5000}
      />

      <Line
        color="black" // Default
        lineWidth={3}
        points={[
          [0, 0, 0],
          [0, 0, -1],
        ]}
      ></Line>

      <group scale={[0.2, 0.2, 0.2]}>
        <mesh
          geometry={nodes.Cylinder000.geometry}
          material={materials["rotor_metal.001"]}
        />
        <mesh
          geometry={nodes.Cylinder000_1.geometry}
          material={materials["drone_body_1.001"]}
        />
        <mesh
          geometry={nodes.Cylinder000_2.geometry}
          material={materials["camera_lens.001"]}
        />
        <mesh
          geometry={nodes.Cylinder000_3.geometry}
          material={materials["drone_body_2.001"]}
        />
        <mesh
          geometry={nodes.Cylinder000_4.geometry}
          material={materials["drone_wings.001"]}
        />
        <mesh
          geometry={nodes.Cylinder000_5.geometry}
          material={materials.body_middle}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/drone_friendly.glb");
