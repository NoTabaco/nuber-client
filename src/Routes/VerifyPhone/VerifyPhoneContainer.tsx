import { useState } from "react";
import { Mutation } from "react-apollo";
import {
  RouteComponentProps,
  useHistory,
  useLocation,
  withRouter,
} from "react-router-dom";
import { toast } from "react-toastify";
import { verifyPhone, verifyPhoneVariables } from "../../types/api";
import VerifyPhonePresenter from "./VerifyPhonePresenter";
import { VERIFY_PHONE } from "./VerifyPhoneQueries";

interface IProps extends RouteComponentProps<any> {}

interface ILocationState {
  phone: string;
}

const VerifyPhoneContainer: React.FC<IProps> = () => {
  const [keyState, setKeyState] = useState({ verificationKey: "" });
  const { verificationKey } = keyState;

  const location = useLocation<ILocationState>();
  const history = useHistory();

  if (!location.state) {
    history.push("/");
  }

  const phoneNumber = location.state.phone;

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "verificationKey") {
      setKeyState({ verificationKey: value });
    }
  };

  return (
    <Mutation<verifyPhone, verifyPhoneVariables>
      mutation={VERIFY_PHONE}
      variables={{ phoneNumber, key: verificationKey }}
      onCompleted={(data) => {
        const { CompletePhoneVerification } = data;
        if (CompletePhoneVerification.ok) {
          console.log(CompletePhoneVerification.token);
          toast.success("You're verified, logging in now");
        } else {
          toast.error(CompletePhoneVerification.error);
        }
      }}
    >
      {(mutation, { loading }) => (
        <VerifyPhonePresenter
          verificationKey={verificationKey}
          onChange={onInputChange}
          onSubmit={mutation}
          loading={loading}
        />
      )}
    </Mutation>
  );
};

export default withRouter(VerifyPhoneContainer);
