import ApolloClient, { Operation } from "apollo-boost";

const client = new ApolloClient({
  clientState: {
    defaults: {
      auth: {
        __typename: "Auth",
        isLoggedIn: Boolean(localStorage.getItem("jwt")),
      },
    },
    resolvers: {
      Mutation: {
        logUserIn: (_, { token }, { cache: localCache }) => {
          localStorage.setItem("jwt", token);
          localCache.writeData({
            data: {
              auth: {
                __typename: "Auth",
                isLoggedIn: true,
              },
            },
          });
          return null;
        },
        logUserOut: (_, __, { cache: localCache }) => {
          localStorage.removeItem("jwt");
          localCache.writeData({
            data: {
              auth: {
                __typename: "Auth",
                isLoggedIn: false,
              },
            },
          });
          return null;
        },
      },
    },
  },
  request: async (operation: Operation) => {
    operation.setContext({
      headers: {
        "X-JWT": localStorage.getItem("jwt") || "",
      },
    });
  },
  uri: "http://localhost:4000/graphql",
});

export default client;
