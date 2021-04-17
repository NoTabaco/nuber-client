import { graphql } from "react-apollo";
import { ThemeProvider } from "styled-components";
import { theme } from "../../typed-components";
import AppPresenter from "./AppPresenter";
import { IS_LOGGED_IN } from "./AppQueries";

const AppContainer: any = ({ data }: { data: any }) => (
  <ThemeProvider theme={theme}>
    <AppPresenter isLoggedIn={data.auth.isLoggedIn} />
  </ThemeProvider>
);

export default graphql(IS_LOGGED_IN)(AppContainer);
