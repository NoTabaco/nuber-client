import { useState } from "react";
import { Mutation } from "react-apollo";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { GET_PLACES } from "../../sharedQueries";
import { addPlace, addPlaceVariables } from "../../types/api";
import AddPlacePresenter from "./AddPlacePresenter";
import { ADD_PLACE } from "./AddPlaceQueries";

const AddPlaceContainer = () => {
  const [placeState, setPlaceState] = useState({
    address: "",
    name: "",
    lat: 0,
    lng: 0,
  });
  const { lat, lng } = placeState;
  const history = useHistory();

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === "name") {
      setPlaceState({ ...placeState, name: value });
    } else if (name === "address") {
      setPlaceState({ ...placeState, address: value });
    }
  };

  return (
    <Mutation<addPlace, addPlaceVariables>
      mutation={ADD_PLACE}
      onCompleted={(data) => {
        const { AddPlace } = data;
        if (AddPlace.ok) {
          toast.success("Place added!");
          setTimeout(() => {
            history.push("/places");
          }, 2000);
        } else {
          toast.error(AddPlace.error);
        }
      }}
      refetchQueries={[{ query: GET_PLACES }]}
      variables={{ ...placeState, isFav: false }}
    >
      {(addPlaceFn, { loading }) => (
        <AddPlacePresenter
          {...placeState}
          onInputChange={onInputChange}
          onSubmit={addPlaceFn}
          loading={loading}
          pickedAddress={lat !== 0 && lng !== 0}
        />
      )}
    </Mutation>
  );
};

export default AddPlaceContainer;
