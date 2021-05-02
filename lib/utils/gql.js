const { graphqlHTTP: gql } = require('express-graphql');
const schema = require('../graphql/schema/index');
const rootValue = require('../graphql/resolvers/index');

module.exports = gql({ schema, rootValue, graphiql: true });
