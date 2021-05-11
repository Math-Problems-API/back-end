import { buildSchema } from "graphql";

export default buildSchema(`
  type RootQuery {
    helloWorld: String!
  }

  schema {
    query: RootQuery
  }
`);
