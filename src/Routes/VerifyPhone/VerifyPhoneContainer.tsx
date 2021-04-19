import { useState } from "react";
import {
  RouteComponentProps,
  useHistory,
  useLocation,
  withRouter,
} from "react-router-dom";
import VerifyPhonePresenter from "./VerifyPhonePresenter";

interface IProps extends RouteComponentProps<any> {}

const VerifyPhoneContainer: React.FC<IProps> = () => {
  const [keyState, setKeyState] = useState({ key: "" });
  const { key } = keyState;

  const location = useLocation();
  const history = useHistory();

  if (!location.state) {
    history.push("/");
  }

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "key") {
      setKeyState({ key: value });
    }
  };

  return <VerifyPhonePresenter key={key} onChange={onInputChange} />;
};

export default withRouter(VerifyPhoneContainer);
