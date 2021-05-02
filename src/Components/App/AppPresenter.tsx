import PropTypes from "prop-types";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AddPlace from "../../Routes/AddPlace";
import EditAccount from "../../Routes/EditAccount";
import FindAddress from "../../Routes/FindAddress";
import Home from "../../Routes/Home";
import Login from "../../Routes/Login";
import PhoneLogin from "../../Routes/PhoneLogin";
import Places from "../../Routes/Places";
import Ride from "../../Routes/Ride";
import Settings from "../../Routes/Settings";
import SocialLogin from "../../Routes/SocialLogin";
import VerifyPhone from "../../Routes/VerifyPhone";

interface IProps {
  isLoggedIn: boolean;
}

const AppPresenter: React.FunctionComponent<IProps> = ({ isLoggedIn }) => (
  <Router>{isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}</Router>
);

const LoggedOutRoutes: React.FunctionComponent = () => (
  <Switch>
    <Route path="/" exact={true}>
      <Login />
    </Route>
    <Route path="/phone-login">
      <PhoneLogin />
    </Route>
    <Route path="/verify-phone">
      <VerifyPhone />
    </Route>
    <Route path="/social-login">
      <SocialLogin />
    </Route>
    <Redirect from="*" to="/" />
  </Switch>
);

const LoggedInRoutes: React.FunctionComponent = () => (
  <Switch>
    <Route path="/" exact={true}>
      <Home />
    </Route>
    <Route path="/ride/:rideId" exact={true}>
      <Ride />
    </Route>
    <Route path="/edit-account" exact={true}>
      <EditAccount />
    </Route>
    <Route path="/settings" exact={true}>
      <Settings />
    </Route>
    <Route path="/places" exact={true}>
      <Places />
    </Route>
    <Route path="/add-place" exact={true}>
      <AddPlace />
    </Route>
    <Route path="/find-address" exact={true}>
      <FindAddress />
    </Route>
    <Redirect from="*" to="/" />
  </Switch>
);

AppPresenter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default AppPresenter;
