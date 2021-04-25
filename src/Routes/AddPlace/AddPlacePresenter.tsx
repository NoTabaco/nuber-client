import { MutationFunction } from "react-apollo";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../../Components/Button";
import Form from "../../Components/Form";
import Header from "../../Components/Header";
import Input from "../../Components/Input";
import { addPlace, addPlaceVariables } from "../../types/api";

const Container = styled.div`
  padding: 0px 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 40px;
`;

const ExtendedLink = styled(Link)`
  text-decoration: underline;
  margin-bottom: 20px;
  display: block;
`;

interface IProps {
  address: string;
  name: string;
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: MutationFunction<addPlace, addPlaceVariables>;
  loading: boolean;
}

const AddPlacePresenter: React.FC<IProps> = ({
  address,
  name,
  onInputChange,
  onSubmit,
  loading,
}) => (
  <>
    <Helmet>
      <title>Add Place | Nuber</title>
    </Helmet>
    <Header title={"Add Place"} backTo={"/"} />
    <Container>
      <Form submitFn={onSubmit}>
        <ExtendedInput
          placeholder={"Name"}
          type={"text"}
          onChange={onInputChange}
          value={name}
          name={"name"}
        />
        <ExtendedInput
          placeholder={"Address"}
          type={"text"}
          onChange={onInputChange}
          value={address}
          name={"address"}
        />
        <ExtendedLink to={"/find-address"}>Pick place from map</ExtendedLink>
        <Button
          onClick={null}
          value={loading ? "Adding Place..." : "Add Place"}
        />
      </Form>
    </Container>
  </>
);

export default AddPlacePresenter;
