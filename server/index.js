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
    phone: "+227999123",
    company: "Wayne Tech Solutions",
    address: "2334 Manchester Road",
    companyInformation:
      "Pioneering tech solutions, offering cutting-edge software development and IT consulting services.",
  },
  {
    name: "Lampard Frank",
    email: "lampard@cfc.com",
    phone: "+233745586",
    company: "Frank Healthies",
    address: "1123 London Avenue",
    companyInformation:
      "Sustainable products designed to enhance environmental health and promote eco-friendly living.",
  },
  {
    name: "Ronaldo Chris",
    email: "ronaldo@utd.com",
    phone: "+786960860",
    company: "Chris Marketing",
    address: "2334 Manchester Road",
    companyInformation:
      "Creative marketing strategies that drive brand growth and increase market presence.",
  },
  {
    name: "Fabregas Fanta",
    email: "fabregas@ars.com",
    phone: "+890601273",
    company: "Fanta Meals",
    address: "1245 London Avenue",
    companyInformation:
      "Serving delicious, locally-sourced cuisine with a focus on quality and sustainability.",
  },
  {
    name: "Gerrard Jerry",
    email: "gerrad@liv.com",
    phone: "+238337562",
    company: "Jerry Legals",
    address: "1124 South London Road",
    companyInformation:
      "Expert legal advice and representation tailored to meet individual and business needs.",
  },
  {
    name: "Kompany Vincent",
    email: "kompany@city.com",
    phone: "+826241729",
    company: "Vince Financial Advisory",
    address: "9887 Manchester Road",
    companyInformation:
      "Transforming financial planning with advanced tools and personalized advisory services.",
  },
  {
    name: "Lionel Messi",
    email: "leo@messi.arg",
    phone: "+173494922",
    company: "Leo Health Services",
    address: "1178 Sao Paulo",
    companyInformation:
      "Providing comprehensive healthcare services with a commitment to patient-centered care.",
  },
  {
    name: "Xabi Alonso",
    email: "xalonso@madrid.xtar",
    phone: "+839202729",
    company: "Xabi Energies",
    address: "3310 Alcantra",
    companyInformation:
      "Leading the charge in renewable energy solutions for a sustainable future.",
  },
  {
    name: "Davido 30BG",
    email: "songs@davido.com",
    phone: "+162390922",
    company: "The David Construction",
    address: "6543 Victoria Island",
    companyInformation:
      "Delivering high-quality construction projects with a focus on precision and client satisfaction.",
  },
  {
    name: "Taiye Taiwo",
    email: "ttaiwo@naija.com",
    phone: "+710283742",
    company: "Double-T Designs",
    address: "1239 Ikeja Along",
    companyInformation:
      "Creating visually stunning designs that elevate brands and captivate audiences.",
  },
  {
    name: "Mr Money",
    email: "aololade@music.com",
    phone: "+812364389",
    company: "Vibe Logistics",
    address: "1245 Lekki Road",
    companyInformation:
      "Efficient logistics and supply chain solutions designed for seamless operations and timely delivery.",
  },
  {
    name: "Aliko Dangote",
    email: "adangote@gmail.au",
    phone: "+908764621",
    company: "Elite Education Services",
    address: "7654 Gwagwalada",
    companyInformation:
      "Offering top-tier educational programs and resources for student success and lifelong learning.",
  },
  {
    name: "Femi Otedola",
    email: "fotedola@forte.oil",
    phone: "+754127300",
    company: "Forte Spa",
    address: "9887 Lagos Road",
    companyInformation:
      "Luxurious spa services aimed at relaxation, rejuvenation, and holistic wellness.",
  },
  {
    name: "Muhammed Alli",
    email: "malli@boxing.ring",
    phone: "+237651324",
    company: "Alli I.T Solutions",
    address: "765 Nigerian Route",
    companyInformation:
      "Innovative IT solutions and tech support designed to enhance business operations and efficiency.",
  },
  {
    name: "Usain Bolt",
    email: "ubolt@track.speed",
    phone: "+837262312",
    company: "Bolt Travels",
    address: "9887 Jamaica Land",
    companyInformation:
      "KExpert travel planning services ensuring memorable and personalized vacation experiences.",
  },
  {
    name: "Annalise Keating",
    email: "akeating@law.court",
    phone: "+817393902",
    company: "Keating Construction",
    address: "890 Manhattan Road",
    companyInformation:
      "Creative architectural designs combining aesthetics and functionality for modern living spaces.",
  },
  {
    name: "Raymond Reddington",
    email: "rred@concierge.crime",
    phone: "+232343938",
    company: "The Red Agency",
    address: "923 FBI Road",
    companyInformation:
      "Driving online success with comprehensive digital marketing and SEO strategies.",
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
  listen: { port: 8800 },
});

console.log(`Server ready at: ${url}`);
