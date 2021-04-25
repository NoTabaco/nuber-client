import { Query } from "react-apollo";
import { GET_PLACES } from "../../sharedQueries";
import { getPlaces } from "../../types/api";
import PlacesPresenter from "./PlacesPresenter";

const PlacesContainer = () => {
  return (
    <Query<getPlaces> query={GET_PLACES}>
      {({ data, loading }) => <PlacesPresenter data={data} loading={loading} />}
    </Query>
  );
};

export default PlacesContainer;
