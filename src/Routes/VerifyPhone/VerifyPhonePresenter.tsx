import { MutationFunction } from "react-apollo";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import Button from "../../Components/Button";
import Form from "../../Components/Form";
import Header from "../../Components/Header";
import Input from "../../Components/Input";
import { verifyPhone, verifyPhoneVariables } from "../../types/api";

const Container = styled.div``;

const ExtendedForm = styled(Form)`
  padding: 0px 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 20px;
`;

interface IProps {
  verificationKey: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: MutationFunction<verifyPhone, verifyPhoneVariables>;
  loading: boolean;
}

const VerifyPhonePresenter: React.FC<IProps> = ({
  verificationKey,
  onChange,
  onSubmit,
  loading,
}) => (
  <Container>
    <Helmet>
      <title>Verify Phone | Nuber</title>
    </Helmet>
    <Header backTo="/phone-login" title="Verify Phone Number" />
    <ExtendedForm submitFn={onSubmit}>
      <ExtendedInput
        value={verificationKey}
        placeholder="Enter Verification Code"
        onChange={onChange}
        name={"verificationKey"}
      />
      <Button
        disabled={loading}
        value={loading ? "Verifying..." : "Submit"}
        onClick={null}
      />
    </ExtendedForm>
  </Container>
);

export default VerifyPhonePresenter;
