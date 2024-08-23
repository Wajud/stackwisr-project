import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
      query {
        users {
          name
          email
          phone
          company
          address
          companyInformation
        }
      }
    `,
  })
  .then((result) => console.log(result))
  .catch((err) => {
    console.log(err);
  });
