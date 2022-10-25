import { useEffect } from "react";
import { MapInfoUrl, DronesUrl, PackageUrl } from "../constants";
import { useStore } from "../store";

export const Initiator = () => {
  const setMapData = useStore((state) => state.setMapData);
  const setDronesData = useStore((state) => state.setDronesData);
  const setCargo = useStore((state) => state.setCargo);
  const isActivated = useStore((state) => state.isActivated);

  useEffect(() => {
    ApiCall(MapInfoUrl, setMapData);   
  }, [setMapData]);
  

  useEffect(() => {
    if (isActivated) {
      // Summon drone
      ApiCall(DronesUrl);

      // Get drones data
      ApiCall(DronesUrl, setDronesData)

      // Summon package
      ApiCall(PackageUrl, setCargo);
    }
  }, [isActivated, setCargo, setDronesData])

  const ApiCall = async (url: string, updateState?: Function) => {
    const response = await fetch(url);
    const data = await response.json();
    if (updateState) updateState(data)
  };

  return <></>;
};
