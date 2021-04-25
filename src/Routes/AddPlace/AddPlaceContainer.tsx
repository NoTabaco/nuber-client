import { useState } from "react";
import AddPlacePresenter from "./AddPlacePresenter";

const AddPlaceContainer = () => {
  const [placeState, setPlaceState] = useState({
    address: "",
    name: "",
  });

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
    <AddPlacePresenter
      {...placeState}
      onInputChange={onInputChange}
      loading={false}
    />
  );
};

export default AddPlaceContainer;
