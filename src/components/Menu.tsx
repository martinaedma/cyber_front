import { useStore } from "../store";

export const Menu = () => {
  const isMenuVisible = useStore((state) => state.isMenuVisible);
  const toggleMenu = useStore((state) => state.toggleMenu);
  const setView = useStore((state) => state.setView);
  const setIsActivated = useStore((state) => state.setIsActivated);
  const view = useStore((state) => state.view);
  const setCurrentView = useStore((state) => state.setCurrentView);
  const currentView = useStore((state) => state.currentView);

  const handleViewSwitch = () => {
    const nextView = currentView + 1;
    nextView < view.length ? setCurrentView(nextView) : setCurrentView(0);
  };

  return (
    <div className={`menu-container ${isMenuVisible ? "slide-in" : ""}`}>
      <div className="menu">
        <div
          className="menu-button"
          onClick={() => toggleMenu(!isMenuVisible)}
        />
        <h3 className="menu-title" onClick={() => setIsActivated(true)}>
          {" "}
          ACTIVATE{" "}
        </h3>
        <button className="menu-item" onClick={() => handleViewSwitch()}>
          Cycle Cameras
        </button>
      </div>
    </div>
  );
};
