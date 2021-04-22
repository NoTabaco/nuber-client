import { Query } from "react-apollo";
import { USER_PROFILE } from "../../sharedQueries";
import { userProfile } from "../../types/api";
import MenuPresenter from "./MenuPresenter";

const MenuContainer: React.FC = () => {
  return (
    <Query<userProfile> query={USER_PROFILE}>
      {({ data, loading }) => <MenuPresenter data={data} loading={loading} />}
    </Query>
  );
};

export default MenuContainer;
