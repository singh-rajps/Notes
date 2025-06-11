import express from 'express';
import graphqlHTTP from 'express-graphql';
import { makeExecutableSchema } from 'graphql-tools';

const app = express(); // ❌ Removed ": express.Application"
const port = 4001;

let typeDefs = [`
  type Query {
    hello: String
  }

  type Mutation {
    hello(message: String): String
  }
`];

let helloMessage = 'World!'; // ❌ Removed ": String"

let resolvers = {
  Query: {
    hello: () => helloMessage
  },
  Mutation: {
    hello: (_, helloData) => {
      helloMessage = helloData.message;
      return helloMessage;
    }
  }
};

app.use(
  '/graphql',
  graphqlHTTP({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    graphiql: true
  })
);

app.listen(port, () => console.log(`Node GraphQL API listening on port ${port}!`));
