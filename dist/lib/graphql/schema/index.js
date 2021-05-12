"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
exports.default = graphql_1.buildSchema(`
  type Operand {
    id: String!
    constraints: [String!]!
  }

  type Problem {
    problem: String!
    solution: String!
  }

  type Link {
    modifier: Int
    target: Int!
    constraints: [String!]!
  }

  input BinaryOperatorInput {
    operands: [Operand!]!
    operator: String!
    links: [Link!]
    number: Int
  }

  type RootQuery {
    helloWorld: String!
    binaryOperator(binaryOperatorInput: BinaryOperatorInput): [Problem!]!
  }

  schema {
    query: RootQuery
  }
`);
//# sourceMappingURL=index.js.map