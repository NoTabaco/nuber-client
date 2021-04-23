import styled from "styled-components";

const Container = styled.div`
  margin: 15px 0;
  display: flex;
  align-items: center;
  & i {
    font-size: 12px;
  }
`;

const PlaceContainer = styled.div`
  margin-left: 10px;
`;

const Name = styled.span`
  display: block;
`;

const Icon = styled.span`
  cursor: pointer;
`;

const Address = styled.span`
  color: ${(props) => props.theme.colors.greyColor};
  font-size: 14px;
`;

interface IProps {
  fav: boolean;
  name: string;
  address: string;
}

const Place: React.FC<IProps> = ({ fav, name, address }) => (
  <Container>
    <Icon>{fav ? "★" : "☆"}</Icon>
    <PlaceContainer>
      <Name>{name}</Name>
      <Address>{address}</Address>
    </PlaceContainer>
  </Container>
);

export default Place;
