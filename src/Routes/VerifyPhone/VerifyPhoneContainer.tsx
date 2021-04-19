import {
  RouteComponentProps,
  useHistory,
  useLocation,
  withRouter,
} from "react-router-dom";
import VerifyPhonePresenter from "./VerifyPhonePresenter";

interface IProps extends RouteComponentProps<any> {}

const VerifyPhoneContainer: React.FC<IProps> = () => {
  const location = useLocation();
  const history = useHistory();

  if (!location.state) {
    history.push("/");
  }

  return <VerifyPhonePresenter />;
};

export default withRouter(VerifyPhoneContainer);
