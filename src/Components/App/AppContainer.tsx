import { graphql } from "react-apollo";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "styled-components";
import { theme } from "../../typed-components";
import AppPresenter from "./AppPresenter";
import { IS_LOGGED_IN } from "./AppQueries.local";

const AppContainer: any = ({ data }: { data: any }) => (
  <HelmetProvider>
    <ThemeProvider theme={theme}>
      <AppPresenter isLoggedIn={data.auth.isLoggedIn} />
    </ThemeProvider>
    <ToastContainer draggable={true} position={"bottom-center"} />
  </HelmetProvider>
);

export default graphql(IS_LOGGED_IN)(AppContainer);
