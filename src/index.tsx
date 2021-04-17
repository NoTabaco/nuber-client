import React from "react";
import { ApolloProvider } from "react-apollo";
import ReactDOM from "react-dom";
import client from "./apollo";
import App from "./Components/App";
import { GlobalStyle } from "./global-styles";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <GlobalStyle />
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
