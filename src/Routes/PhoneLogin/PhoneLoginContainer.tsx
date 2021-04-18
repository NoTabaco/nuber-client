import { useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import PhoneLoginPresenter from "./PhoneLoginPresenter";

interface IState {
  countryCode: string;
  phoneNumber: string;
}

const PhoneLoginContainer: React.FunctionComponent<
  RouteComponentProps<IState>
> = () => {
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

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    console.log(countryCode, phoneNumber);
  };

  return (
    <PhoneLoginPresenter
      countryCode={countryCode}
      phoneNumber={phoneNumber}
      onInputChange={onInputChange}
      onSubmit={onSubmit}
    />
  );
};

export default withRouter(PhoneLoginContainer);
