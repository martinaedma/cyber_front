import create from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  view: string;
  setView: (view: string) => void;
}

export const useStore = create<AppState>()(  
    persist(
      (set, get) => ({       
        view: "home",
        setView: (view: string) => set({ view: view })        
      }),
      {
        name: "r3f_app",
        getStorage: () => localStorage,
        partialize: (state) => ({
          view: state.view
        }),        
      }
    )  
);