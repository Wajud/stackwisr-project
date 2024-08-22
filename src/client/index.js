import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

export const client = new ApolloClient({
  uri: "/graphql",
  // uri: "https://flyby-router-demo.herokuapp.com/",
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
      query {
        books {
          title
          author
        }
      }
    `,
  })
  .then((result) => console.log(result))
  .catch((err) => {
    console.log(err);
  });
