import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "../../Components/Header";
import Place from "../../Components/Place";
import { getPlaces } from "../../types/api";

const Container = styled.div`
  padding: 0px 40px;
`;

const SLink = styled(Link)`
  text-decoration: underline;
`;

interface IProps {
  data?: getPlaces;
  loading: boolean;
}

const PlacesPresenter: React.FC<IProps> = ({
  data: { GetMyPlaces: { places = null } = {} } = {},
  loading,
}) => (
  <>
    <Helmet>
      <title>Places | Nuber</title>
    </Helmet>
    <Header title={"Places"} backTo={"/"} />
    <Container>
      {!loading && places && places.length === 0 && "You have no places"}
      {!loading &&
        places &&
        places.map((place) => (
          <Place
            key={place!.id}
            id={place!.id}
            fav={place!.isFav}
            name={place!.name}
            address={place!.address}
          />
        ))}
      <SLink to={"/add-place"}>Add some places!</SLink>
    </Container>
  </>
);

export default PlacesPresenter;
