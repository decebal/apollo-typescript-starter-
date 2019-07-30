import { makeExecutableSchema } from 'apollo-server';

const BaseQuery = `
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

const executableSchema = Object.values({}).reduce(
  (builder, schema) => {
    return builder;
  },
  {
    typeDefs: [BaseQuery],
    resolvers: [],
  }
);

// @ts-ignore
export default makeExecutableSchema(executableSchema);
