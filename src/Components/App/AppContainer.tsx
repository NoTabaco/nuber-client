import { graphql } from "react-apollo";
import AppPresenter from "./AppPresenter";
import { IS_LOGGED_IN } from "./AppQueries";

const AppContainer: any = ({ data }: { data: any }) => (
  <AppPresenter isLoggedIn={data.auth.isLoggedIn} />
);

export default graphql(IS_LOGGED_IN)(AppContainer);
