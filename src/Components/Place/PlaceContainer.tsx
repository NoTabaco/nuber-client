import { Mutation } from "react-apollo";
import { GET_PLACES } from "../../sharedQueries";
import { editPlace, editPlaceVariables } from "../../types/api";
import PlacePresenter from "./PlacePresenter";
import { EDIT_PLACE } from "./PlaceQueries";

interface IProps {
  fav: boolean;
  name: string;
  address: string;
  id: number;
}

const PlaceContainer: React.FC<IProps> = ({ fav, name, address, id }) => {
  console.log(fav);
  return (
    <Mutation<editPlace, editPlaceVariables>
      mutation={EDIT_PLACE}
      variables={{ placeId: id, isFav: !fav }}
      refetchQueries={[{ query: GET_PLACES }]}
    >
      {(editPlaceFn) => (
        <PlacePresenter
          onStarPress={editPlaceFn}
          fav={fav}
          name={name}
          address={address}
        />
      )}
    </Mutation>
  );
};

export default PlaceContainer;
