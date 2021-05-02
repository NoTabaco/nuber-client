import { MutationFunction } from "react-apollo";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../../Components/Button";
import {
  getRide,
  updateRide,
  updateRideVariables,
  userProfile,
} from "../../types/api";
import { StatusOptions } from "../../types/StatusOptions";

const Container = styled.div`
  padding: 40px;
`;

const Title = styled.h4`
  font-weight: 800;
  margin-top: 30px;
  margin-bottom: 10px;
  &:first-child {
    margin-top: 0;
  }
`;

const Data = styled.span`
  color: ${(props) => props.theme.colors.blueColor};
`;

const Img = styled.img`
  border-radius: 50%;
  margin-right: 20px;
  width: 50px;
  height: 50px;
`;

const Passenger = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Buttons = styled.div`
  margin: 30px 0px;
`;

const ExtendedButton = styled(Button)`
  margin-bottom: 30px;
`;

interface IProps {
  userData?: userProfile;
  data?: getRide;
  loading: boolean;
  updateRideFn: MutationFunction<updateRide, updateRideVariables>;
}

const RidePresenter: React.FC<IProps> = ({
  userData: { GetMyProfile: { user = null } = {} } = {},
  data: { GetRide: { ride = null } = {} } = {},
  updateRideFn,
  loading,
}) => (
  <Container>
    {ride && user && (
      <>
        <Title>Passenger</Title>
        <Passenger>
          <Img src={ride.passenger.profilePhoto!} />
          <Data>{ride.passenger.fullName}</Data>
        </Passenger>
        {ride.driver && (
          <>
            <Title>Driver</Title>{" "}
            <Passenger>
              <Img src={ride.driver.profilePhoto!} />
              <Data>{ride.driver.fullName}</Data>
            </Passenger>
          </>
        )}
        <Title>From</Title>
        <Data>{ride.pickUpAddress}</Data>
        <Title>To</Title>
        <Data>{ride.dropOffAddress}</Data>
        <Title>Price</Title>
        <Data>{ride.price}</Data>
        <Title>Distance</Title>
        <Data>{ride.distance}</Data>
        <Title>Duration</Title>
        <Data>{ride.duration}</Data>
        <Title>Status</Title>
        <Data>{ride.status}</Data>
        <Buttons>
          {ride.driver &&
            ride.driver!.id === user.id &&
            ride.status === "ACCEPTED" && (
              <ExtendedButton
                value={"Picked Up"}
                onClick={() =>
                  updateRideFn({
                    variables: {
                      rideId: ride.id,
                      status: StatusOptions.ONROUTE,
                    },
                  })
                }
              />
            )}
          {ride.driver &&
            ride.driver!.id === user.id &&
            ride.status === "ONROUTE" && (
              <ExtendedButton
                value={"Finished"}
                onClick={() =>
                  updateRideFn({
                    variables: {
                      rideId: ride.id,
                      status: StatusOptions.FINISHED,
                    },
                  })
                }
              />
            )}
          {(ride.driver && ride.driver!.id === user.id) ||
            (ride.passenger.id === user.id && ride.status === "ACCEPTED" && (
              <Link to={`/chat/${ride!.chatId}`}>
                <ExtendedButton value={"Chat"} onClick={null} />
              </Link>
            ))}
        </Buttons>
      </>
    )}
  </Container>
);

export default RidePresenter;
