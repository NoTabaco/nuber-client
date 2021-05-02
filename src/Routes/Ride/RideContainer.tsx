import { SubscribeToMoreOptions } from "apollo-client";
import { Mutation, Query } from "react-apollo";
import { useHistory, useLocation } from "react-router-dom";
import { USER_PROFILE } from "../../sharedQueries";
import {
  getRide,
  getRideVariables,
  updateRide,
  updateRideVariables,
  userProfile,
} from "../../types/api";
import RidePresenter from "./RidePresenter";
import { GET_RIDE, RIDE_SUBSCRIPTION, UPDATE_RIDE_STATUS } from "./RideQueries";

interface ILocationState {
  rideId: number;
}

const RideContainer: React.FC = () => {
  const history = useHistory();
  const location = useLocation<ILocationState>();
  const { key, state } = location;
  if (!key || !state?.rideId) {
    history.push("/");
  }

  return (
    <Query<userProfile> query={USER_PROFILE}>
      {({ data: userData }) => (
        <Query<getRide, getRideVariables>
          query={GET_RIDE}
          variables={{ rideId: state?.rideId }}
        >
          {({ data, loading, subscribeToMore }) => {
            const subscribeOptions: SubscribeToMoreOptions = {
              document: RIDE_SUBSCRIPTION,
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) {
                  return prev;
                }
                console.log(prev, subscriptionData);
              },
            };
            subscribeToMore(subscribeOptions);
            return (
              <Mutation<updateRide, updateRideVariables>
                mutation={UPDATE_RIDE_STATUS}
                refetchQueries={[{ query: GET_RIDE }]}
              >
                {(updateRideFn) => (
                  <RidePresenter
                    userData={userData}
                    data={data}
                    loading={loading}
                    updateRideFn={updateRideFn}
                  />
                )}
              </Mutation>
            );
          }}
        </Query>
      )}
    </Query>
  );
};

export default RideContainer;