import { Box, Plane } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { useStore, MapData } from "../../store";
import { GroundTile } from "./GroundTile";

const createTiles = (mapData: MapData): JSX.Element[] => {
  const tiles: JSX.Element[] = [];

  for (let i = 0; i < mapData.width; i++) {
    for (let j = 0; j < mapData.height; j++) {

      let found = false

      for (const safeZone of mapData.safeZones) {
        if (
          safeZone.location.xCoordinate === i &&
          safeZone.location.yCoordinate === j
        ) {
          tiles.push(
            <Plane
              args={[1, 1]}
              key={`${safeZone.key}`}
              position={[
                safeZone.location.xCoordinate,
                safeZone.location.yCoordinate,
                0,
              ]}
            >
              <meshBasicMaterial color={"green"} />
            </Plane>
          );
          found = true
          break;
        }
      }

      for (const dropZone of mapData.dropZones) {
        if (
          dropZone.location.xCoordinate === i &&
          dropZone.location.yCoordinate === j
        ) {
          tiles.push(
            <Plane
              args={[1, 1]}
              key={`${dropZone.key}`}
              position={[
                dropZone.location.xCoordinate,
                dropZone.location.yCoordinate,
                0,
              ]}
            >
              <meshBasicMaterial color={"blue"} />
            </Plane>
          );
          found = true
          break;
        }
      }

      for (const building of mapData.skyScrapers) {
        if (
          building.location.xCoordinate === i &&
          building.location.yCoordinate === j
        ) {
          found = true
          break;
        }
      }

      if (found) continue;

      tiles.push(
        <GroundTile size={{x: 1, y: 1}} key={`${j*2}${i*3}`} position={{x: i, y: j, z: 0}} color={'gray'}/>
      );
    }
  }

  return tiles;
};

export const Ground = () => {
  const mapData = useStore((state) => state.mapData);
  const tiles = useMemo(() => createTiles(mapData), [mapData]); 

  return (
    // <Box
    //   args={[mapData.width, mapData.height, 1]}
    //   position={[mapData.width / 2 - 0.5, mapData.height / 2 - 0.5, 0]}
    // >
    //   <meshBasicMaterial color={"gray"} />
    // </Box>
    <>
      {tiles.map((item, index) => {
        return item;
      })}
    </>
  );
};
