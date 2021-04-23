import { Mutation, Query } from "react-apollo";
import { GET_PLACES, USER_PROFILE } from "../../sharedQueries";
import { LOG_USER_OUT } from "../../sharedQueries.local";
import { getPlaces, userProfile } from "../../types/api";
import SettingsPresenter from "./SettingsPresenter";

const SettingsContainer: React.FC = () => {
  return (
    <Mutation mutation={LOG_USER_OUT}>
      {(logUserOut: any) => (
        <Query<userProfile> query={USER_PROFILE}>
          {({ data: userData, loading: userDataLoading }) => (
            <Query<getPlaces> query={GET_PLACES}>
              {({ data: placesData, loading: placesLoading }) => (
                <SettingsPresenter
                  userDataLoading={userDataLoading}
                  userData={userData}
                  logUserOut={logUserOut}
                  placesData={placesData}
                  placesLoading={placesLoading}
                />
              )}
            </Query>
          )}
        </Query>
      )}
    </Mutation>
  );
};

export default SettingsContainer;
