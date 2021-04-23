import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "../../Components/Header";
import Place from "../../Components/Place";
import { getPlaces, userProfile } from "../../types/api";

const Container = styled.div`
  padding: 0px 40px;
`;

const Image = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 50%;
`;

const GridLink = styled(Link)`
  display: grid;
  grid-template-columns: 1fr 4fr;
  margin-bottom: 10px;
`;

const Keys = styled.div``;

const Key = styled.span`
  display: block;
  margin: 6px -5px;
`;

const FakeLink = styled.span`
  cursor: pointer;
  text-decoration: underline;
`;

const SLink = styled(Link)`
  display: block;
  text-decoration: underline;
  margin: 20px 0px;
`;

interface IProps {
  logUserOut: any;
  userData?: userProfile;
  placesData?: getPlaces;
  userDataLoading: boolean;
  placesLoading: boolean;
}

const SettingsPresenter: React.FC<IProps> = ({
  logUserOut,
  userData: { GetMyProfile: { user = null } = {} } = {},
  userDataLoading,
  placesData: { GetMyPlaces: { places = null } = {} } = {},
  placesLoading,
}) => (
  <>
    <Helmet>
      <title>Settings | Nuber</title>
    </Helmet>
    <Header title={"Account Settings"} backTo={"/"} />
    <Container>
      <GridLink to={"/edit-account"}>
        {!userDataLoading && user && (
          <>
            <Image
              src={
                user.profilePhoto ||
                "https://seekvectorlogo.net/wp-content/uploads/2020/04/seven-stars-by-japan-tobacco-vector-logo.png"
              }
            />
            <Keys>
              <Key>{user.fullName}</Key>
              <Key>{user.email}</Key>
            </Keys>
          </>
        )}
      </GridLink>
      {!placesLoading &&
        places &&
        places.map((place) => (
          <Place
            key={place!.id}
            fav={place!.isFav}
            name={place!.name}
            address={place!.address}
          />
        ))}
      <SLink to={"/places"}>Go to Places</SLink>
      <FakeLink onClick={logUserOut}>Log Out</FakeLink>
    </Container>
  </>
);

export default SettingsPresenter;
