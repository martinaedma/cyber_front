import { createRef, MutableRefObject, RefObject, useRef } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import create from "zustand";
import { persist } from "zustand/middleware";
import * as THREE from "three";

interface AppState {
  droneRef: MutableRefObject<THREE.Group | null>;
  isMouseDown: MutableRefObject<string | null>;
  nextPosition: THREE.Vector3 | null;
  view: string[];
  currentView: number,
  mapData: MapData,
  isMenuVisible: boolean,
  dronesData: DronesData,
  isActivated: boolean,
  cargo: Cargo[] | null,
  setIsActivated: (toggle: boolean) => void;
  setDronesData: (dronesData: DronesData) => void;
  setMapData: (mapData: MapData) => void;
  setView: (view: string[]) => void;
  setCurrentView: (view: number) => void;
  toggleMenu: (toggle: boolean) => void;
  setCargo: (cargo: Cargo[]) => void;
  setNextPosition: (position: THREE.Vector3) => void
}

export interface MapData {
  width: number,
  height: number,
  skyScrapers: MapDataObject[],
  safeZones: MapDataObject[],
  dropZones: MapDataObject[]
}

export interface MapDataObject {
  key: string,
  location: {
    xCoordinate: number,
    yCoordinate: number
  }
}

export interface DronesData {
  runnerDrones: Drone[],
  patrolDrones: Drone[]
}

export interface Drone {
  carriedpackage: string,
  key: string,
  location: Location,
  locationHistory: Location[],
  status: number
}

export interface Location {
  xCoordinate: number,
  yCoordinate: number
}

export interface Cargo {
  key: string,
  location: Location,
  packageStatus: string,
  packageType: string,
  destination: Location
}

export const useStore = create<AppState>()(  
    persist(
      (set, get) => ({
        droneRef: createRef(),
        isMouseDown: createRef(),
        nextPosition: null,
        view: ['city'],
        currentView: 0,
        mapData: {
          width: 0,
          height: 0,
          skyScrapers: [],
          safeZones: [],
          dropZones: []
        },
        isMenuVisible: false,
        dronesData: {runnerDrones: [], patrolDrones: []},
        isActivated: true,
        cargo: null,
        setNextPosition: (position: THREE.Vector3) => set({nextPosition: position}),
        setCargo: (cargo: Cargo[]) => set({cargo: cargo}),
        setIsActivated: (toggle: boolean) => set({isActivated: toggle}),
        setDronesData: (data: DronesData) => set({dronesData: data}),
        toggleMenu: (toggle: boolean) => set({isMenuVisible: toggle}),
        setMapData: (mapData: MapData) => set({ mapData: mapData}),        
        setView: (view: string[]) => set({ view: view }),        
        setCurrentView: (view: number) => set({ currentView: view })        
      }),
      {
        name: "cyber_front",
        getStorage: () => localStorage,
        partialize: (state) => ({
          view: state.view
        }),        
      }
    )  
);