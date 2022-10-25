import { useLoader } from "@react-three/fiber";
import { text } from "stream/consumers";
import { TextureLoader } from "three";
import { Buildings } from "./Buildings";
import { Cargo } from "./Cargo";
import { Drones } from "./drones/Drones";
import { Ground } from "./Ground";

export const World = () => {
  const texture = useLoader(TextureLoader, "house_texture.jpg");

  return (
    <>
      <Ground />
      <Buildings texture={texture} />
      <Drones/>
      <Cargo/>
    </>
  );
};
