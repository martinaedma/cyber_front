import { Box } from "@react-three/drei";
import { Texture } from "three";
import { useStore } from "../../store";
import { MapData } from "../../store";
import { getRandomInt } from "../../utilities";

interface BuildingsProps {
  texture: Texture
}

export const Buildings = ({texture}: BuildingsProps) => {
  const mapData: MapData = useStore((state) => state.mapData);
  const minHeight = 1;
  const maxHeight = 2;

  return (
    <>
      {mapData.skyScrapers.map((item, index) => {
        const heigth = getRandomInt(minHeight, maxHeight);
        return (
          <Box
            key={`${item.location.xCoordinate}${item.location.yCoordinate}${index}`}
            args={[1, 1, heigth]}
            position={[
              item.location.xCoordinate,
              item.location.yCoordinate,
              heigth / 2,
            ]}
          >
            <meshBasicMaterial color={"#b7b7b7"} map={texture} />
          </Box>
        );
      })}
    </>
  );
};
