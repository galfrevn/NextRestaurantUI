import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://restaurant-graphql-backend.herokuapp.com/",
  cache: new InMemoryCache(),
});

export default client;
