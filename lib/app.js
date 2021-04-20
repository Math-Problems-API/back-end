const express = require('express');
const cors = require('cors');
const { graphqlHTTP: gql } = require('express-graphql');
const app = express();

const schema = require('./graphql/schema/index');
const rootValue = require('./graphql/resolvers/index')

app.use(express.json());
app.use(cors());

app.use('/gql', gql({ schema, rootValue, graphiql: true }));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'))

module.exports = app;
