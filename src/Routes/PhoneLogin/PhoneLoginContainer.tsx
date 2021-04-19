import { useState } from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps, useHistory, withRouter } from "react-router";
import { toast } from "react-toastify";
import {
  startPhoneVerification,
  startPhoneVerificationVariables,
} from "../../types/api";
import PhoneLoginPresenter from "./PhoneLoginPresenter";
import { PHONE_SIGN_IN } from "./PhoneQueries.queries";

const PhoneLoginContainer: React.FunctionComponent<RouteComponentProps> = () => {
  const [countryCodeState, setCountryCodeState] = useState({
    countryCode: "+82",
  });
  const [phoneNumberState, setPhoneNumberState] = useState({
    phoneNumber: "",
  });
  const { countryCode } = countryCodeState;
  const { phoneNumber } = phoneNumberState;

  const onInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "countryCode") {
      setCountryCodeState({ countryCode: value });
    } else if (name === "phoneNumber") {
      setPhoneNumberState({ phoneNumber: value });
    }
  };

  const history = useHistory();

  return (
    <Mutation<startPhoneVerification, startPhoneVerificationVariables>
      mutation={PHONE_SIGN_IN}
      variables={{ phoneNumber: `${countryCode}${phoneNumber}` }}
      onCompleted={(data) => {
        const { StartPhoneVerification } = data;
        const phone = `${countryCode}${phoneNumber}`;
        if (StartPhoneVerification.ok) {
          toast.success("SMS Sent! Redirecting you...");
          setTimeout(() => {
            history.push({
              pathname: "/verify-phone",
              state: {
                phone,
              },
            });
          }, 2000);
        } else {
          toast.error(StartPhoneVerification.error);
        }
      }}
    >
      {(mutation, { loading }) => {
        const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
          event.preventDefault();
          const phone = `${countryCode}${phoneNumber}`;
          const isValid = /^\+[1-9]{1}[0-9]{7,11}$/.test(phone);
          if (isValid) {
            mutation();
          } else {
            toast.error("Please write a valid phone number");
          }
        };
        return (
          <PhoneLoginPresenter
            countryCode={countryCode}
            phoneNumber={phoneNumber}
            onInputChange={onInputChange}
            onSubmit={onSubmit}
            loading={loading}
          />
        );
      }}
    </Mutation>
  );
};

export default withRouter(PhoneLoginContainer);
