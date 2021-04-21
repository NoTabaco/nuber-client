import { useState } from "react";
import HomePresenter from "./HomePresenter";

const HomeContainer: React.FC = () => {
  const [menuState, setMenuState] = useState({
    isMenuOpen: false,
  });
  const { isMenuOpen } = menuState;

  const toggleMenu = () => {
    setMenuState({
      isMenuOpen: !isMenuOpen,
    });
  };

  return <HomePresenter isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />;
};

export default HomeContainer;
