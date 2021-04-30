import { MutationFunction } from "react-apollo";
import { Helmet } from "react-helmet-async";
import Sidebar from "react-sidebar";
import styled from "styled-components";
import AddressBar from "../../Components/AddressBar";
import Button from "../../Components/Button";
import Menu from "../../Components/Menu";
import RidePopUp from "../../Components/RidePopUp";
import {
  acceptRide,
  acceptRideVariables,
  getRides,
  requestRide,
  requestRideVariables,
  userProfile,
} from "../../types/api";

const Container = styled.div``;

const MenuButton = styled.button`
  appearance: none;
  padding: 10px;
  position: absolute;
  top: 10px;
  left: 10px;
  text-align: center;
  font-weight: 800;
  border: 0;
  cursor: pointer;
  font-size: 20px;
  transform: rotate(90deg);
  z-index: 2;
  background-color: transparent;
`;

const ExtendedButton = styled(Button)`
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 2;
  height: auto;
  width: 80%;
`;

const RequestButton = styled(ExtendedButton)`
  bottom: 250px;
`;

const Map = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;

interface IProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  loading: boolean;
  mapRef: any;
  toAddress: string;
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onAddressSubmit: () => Promise<void>;
  requestRideFn: MutationFunction<requestRide, requestRideVariables>;
  acceptRideFn: MutationFunction<acceptRide, acceptRideVariables>;
  nearbyRide?: getRides;
  data?: userProfile;
  price: number;
}

const HomePresenter: React.FC<IProps> = ({
  isMenuOpen,
  toggleMenu,
  loading,
  mapRef,
  toAddress,
  onInputChange,
  onAddressSubmit,
  requestRideFn,
  acceptRideFn,
  nearbyRide: { GetNearbyRide: { ride = null } = {} } = {},
  data: { GetMyProfile: { user = null } = {} } = {},
  price,
}) => (
  <Container>
    <Helmet>
      <title>Home | Nuber</title>
    </Helmet>
    <Sidebar
      sidebar={<Menu />}
      open={isMenuOpen}
      onSetOpen={toggleMenu}
      styles={{ sidebar: { background: "white", width: "80%", zIndex: "10" } }}
    >
      {!loading && <MenuButton onClick={toggleMenu}>|||</MenuButton>}
      {user && !user.isDriving && (
        <>
          <AddressBar
            name={"toAddress"}
            onChange={onInputChange}
            value={toAddress}
            onBlur={null}
          />
          <ExtendedButton
            onClick={onAddressSubmit}
            disabled={toAddress === ""}
            value={price !== 0 ? "Change Address" : "Pick Address"}
          />
        </>
      )}
      {price !== 0 && (
        <RequestButton
          onClick={requestRideFn}
          disabled={toAddress === ""}
          value={`Request Ride ($${price})`}
        />
      )}
      {ride && (
        <RidePopUp
          id={ride.id}
          pickUpAddress={ride.pickUpAddress}
          dropOffAddress={ride.dropOffAddress}
          price={ride.price}
          distance={ride.distance}
          passengerName={ride.passenger.fullName!}
          passengerPhoto={ride.passenger.profilePhoto!}
          acceptRideFn={acceptRideFn}
        />
      )}
      <Map ref={mapRef} />
    </Sidebar>
  </Container>
);

export default HomePresenter;
