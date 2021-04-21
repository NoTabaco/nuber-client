import { useState } from "react";
import { Mutation, MutationFunction } from "react-apollo";
import { toast } from "react-toastify";
import { LOG_USER_IN } from "../../sharedQueries.local";
import { facebookConnect, facebookConnectVariables } from "../../types/api";
import SocialLoginPresenter from "./SocialLoginPresenter";
import { FACEBOOK_CONNECT } from "./SocialLoginQueries";

const SocialLoginContainer: React.FunctionComponent = () => {
  const [fbState, setFbState] = useState({
    firstName: "",
    lastName: "",
    email: null,
    fbId: "",
  });

  let mutation: MutationFunction<facebookConnect, facebookConnectVariables>;

  const loginCallback = (response: any) => {
    const {
      name,
      first_name,
      last_name,
      email,
      userID,
      accessToken,
    } = response;
    if (accessToken) {
      toast.success(`Welcome ${name}!`);
      setFbState({
        firstName: first_name,
        lastName: last_name,
        email,
        fbId: userID,
      });
      mutation({
        variables: { ...fbState },
      });
    } else {
      toast.error("Could not log you in 😔");
    }
  };

  return (
    <Mutation mutation={LOG_USER_IN}>
      {(logUserIn: any) => (
        <Mutation<facebookConnect, facebookConnectVariables>
          mutation={FACEBOOK_CONNECT}
          onCompleted={(data) => {
            const { FacebookConnect } = data;
            if (FacebookConnect.ok) {
              if (FacebookConnect.token) {
                logUserIn({
                  variables: {
                    token: FacebookConnect.token,
                  },
                });
              }
            } else {
              toast.error(FacebookConnect.error);
            }
          }}
        >
          {(facebookMutation, { loading }) => {
            mutation = facebookMutation;
            return <SocialLoginPresenter loginCallback={loginCallback} />;
          }}
        </Mutation>
      )}
    </Mutation>
  );
};

export default SocialLoginContainer;
