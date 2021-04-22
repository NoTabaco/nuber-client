import { useState } from "react";
import { Query } from "react-apollo";
import { USER_PROFILE } from "../../sharedQueries";
import { userProfile } from "../../types/api";
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

  return (
    <Query<userProfile> query={USER_PROFILE}>
      {({ loading }) => (
        <HomePresenter
          loading={loading}
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
        />
      )}
    </Query>
  );
};

export default HomeContainer;
