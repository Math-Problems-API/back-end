import { graphqlHTTP } from "express-graphql";
import schema from "../graphql/schema/index";
import rootValue from "../graphql/resolvers/index";

export default graphqlHTTP({ schema, rootValue, graphiql: true });