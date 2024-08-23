import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type User {
    name: String
    email: String
    phone: String
    company: String
    address: String
    companyInformation: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    users: [User]
  }
`;

const users = [
  {
    name: "Rooney Wayne",
    email: "rooney@utd.com",
    phone: "27999123",
    company: "MUFC",
    address: "2334 Manchester Road",
    companyInformation: "A football club",
  },
  {
    name: "Lampard Frank",
    email: "lampard@cfc.com",
    phone: "08123345586",
    company: "CFC",
    address: "1123 London Avenue",
    companyInformation: "A dance club",
  },
  {
    name: "Ronaldo Chris",
    email: "ronaldo@utd.com",
    phone: "4778696060",
    company: "MUFC",
    address: "2334 Manchester Road",
    companyInformation: "A football club",
  },
  {
    name: "Fabregas Fanta",
    email: "fabregas@ars.com",
    phone: "8906015273",
    company: "ARS",
    address: "1245 London Avenue",
    companyInformation: "A weapons store",
  },
  {
    name: "Gerrard Jerry",
    email: "gerrad@liv.com",
    phone: "2383372",
    company: "LIV",
    address: "1124 South London Road",
    companyInformation: "A museum",
  },
  {
    name: "Kompany Vincent",
    email: "kompany@city.com",
    phone: "826241729",
    company: "CITY",
    address: "9887 Manchester Road",
    companyInformation: "A Movie Theater",
  },
];

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    users: () => users,
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server ready at: ${url}`);
