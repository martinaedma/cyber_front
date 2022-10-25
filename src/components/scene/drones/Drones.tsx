import { Box } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";
import { useStore, DronesData } from "../../../store";
import CarrierDrone from "./CarrierDrone";

export const Drones = () => {
  const dronesData: DronesData = useStore((state) => state.dronesData);
  const setView = useStore((state) => state.setView);

  useEffect(() => {
    const view = ["city"];
    for (const drone of dronesData.runnerDrones) {
      view.push(drone.key);
    }
    setView(view);
  }, [dronesData, setView]);

  console.log(dronesData)

  return (
    <>
      {dronesData.runnerDrones.map((item, index) => {
        return (
          <CarrierDrone
            key={item.key}
            location={
              new THREE.Vector3(
                item.location.xCoordinate,
                item.location.yCoordinate,
                1
              )
            }
            droneId={item.key}
          />
        );
      })}
      {dronesData.patrolDrones.map((item, index) => {
        return (
          <Box
            key={item.key}
            position={
              new THREE.Vector3(
                item.location.xCoordinate,
                item.location.yCoordinate,
                1
              )
            }
          >

          </Box>
        );
      })}
    </>
  );
};
