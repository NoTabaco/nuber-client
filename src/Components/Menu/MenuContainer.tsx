import { Mutation, Query } from "react-apollo";
import { toast } from "react-toastify";
import { USER_PROFILE } from "../../sharedQueries";
import { toggleDriving, userProfile } from "../../types/api";
import MenuPresenter from "./MenuPresenter";
import { TOGGLE_DRIVING } from "./MenuQueries";

const MenuContainer: React.FC = () => {
  return (
    <Mutation<toggleDriving>
      mutation={TOGGLE_DRIVING}
      // refetchQueries={[{ query: USER_PROFILE }]}
      update={(cache, { data }) => {
        if (data) {
          const { ToggleDrivingMode } = data;
          if (!ToggleDrivingMode.ok) {
            toast.error(ToggleDrivingMode.error);
            return;
          }
          const query: userProfile | null = cache.readQuery({
            query: USER_PROFILE,
          });
          if (query) {
            const {
              GetMyProfile: { user },
            } = query;
            if (user) {
              user.isDriving = !user.isDriving;
            }
          }
          cache.writeQuery({ query: USER_PROFILE, data: query });
        }
      }}
    >
      {(toggleDrivingFn) => (
        <Query<userProfile> query={USER_PROFILE}>
          {({ data, loading }) => (
            <MenuPresenter
              data={data}
              loading={loading}
              toggleDrivingFn={toggleDrivingFn}
            />
          )}
        </Query>
      )}
    </Mutation>
  );
};

export default MenuContainer;
