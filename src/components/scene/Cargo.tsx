import { Box } from "@react-three/drei";
import { useStore } from "../../store";

export const Cargo = () => {
  const cargo = useStore((state) => state.cargo);
  
  return (
    <>
      {cargo && cargo[0] && (
        <Box
          args={[1, 1, 1]}
          position={[
            cargo[0].location.xCoordinate,
            cargo[0].location.yCoordinate,
            0.2,
          ]}
        >
          <meshBasicMaterial color={"red"} />
        </Box>
      )}
    </>
  );
};
