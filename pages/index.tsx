import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Initiator } from "../src/components/Initiator";
import { Menu } from "../src/components/Menu";
import { useStore } from "../src/store";

const CanvasComponent = dynamic(
  () => import('../src/components/scene/CanvasComponent'),
  { ssr: false }
);

const Home: NextPage = () => {
  const view = useStore((state) => state.view);

  return (
    <div className="app-container">
      <Initiator/>
      <Menu/>
      <Suspense fallback={null}>
        <CanvasComponent />
      </Suspense>
    </div>
  );
};

export default Home;
