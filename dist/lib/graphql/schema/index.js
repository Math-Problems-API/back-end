"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
exports.default = graphql_1.buildSchema(`
  type RootQuery {
    helloWorld: String!
  }

  schema {
    query: RootQuery
  }
`);
//# sourceMappingURL=index.js.map