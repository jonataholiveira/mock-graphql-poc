const { ApolloServer, MockList } = require("apollo-server");
const faker = require("faker");

const typeDefs = `
    type Cat {
        id: ID!
        name: String!
        age: Int!
        nice: Boolean
    }

    type Query {
        allCats: [Cat!]!
    }
`;

const mocks = {
  Query: () => ({
    allCats: () => new MockList([1, 20])
  }),
  ID: () => faker.random.uuid(),
  Int: () => faker.random.number({ min: 1, max: 25 }),
  String: () => faker.name.firstName(),
  Boolean: () => faker.random.boolean()
};

const resolvers = {
  Query: {
    allCats: () => [
      {
        name: "Bubastis"
      },
      {
        name: "Muezza"
      }
    ]
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  mocks,
  mockEntireSchema: false
});

server.listen().then(({ url }) => console.log(`Server running on port ${url}`));