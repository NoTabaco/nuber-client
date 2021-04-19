import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import Button from "../../Components/Button";
import Header from "../../Components/Header";
import Input from "../../Components/Input";

const Container = styled.div``;

const Form = styled.form`
  padding: 0px 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 20px;
`;

const VerifyPhonePresenter: React.FC = () => (
  <Container>
    <Helmet>
      <title>Verify Phone | Nuber</title>
    </Helmet>
    <Header backTo="/phone-login" title="Verify Phone Number" />
    <Form>
      <ExtendedInput
        value={""}
        placeholder="Enter Verification Code"
        onChange={null}
      />
      <Button value={"Submit"} onClick={null} />
    </Form>
  </Container>
);

export default VerifyPhonePresenter;
