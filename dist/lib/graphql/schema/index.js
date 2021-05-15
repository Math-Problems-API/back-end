"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
exports.default = graphql_1.buildSchema(`
  input PropertyInput {
    value: [Int!]!
  }

  input RandomOperandInput {
    name: String!
    properties: [PropertyInput!]
  }

  input LinkInput {
    modifier: Int
    target: Int!
    constraints: [String!]!
  }

  input ProblemInput {
    operands: [RandomOperandInput!]!
    operator: String!
    links: [LinkInput!]
    number: Int
  }

  type Problem {
    problem: String!
    solution: String
  }

  type Property {
    value: [Int!]!
  }

  type RandomOperand {
    name: String!
    properties: [Property!]
  }

  type RootQuery {
    problems(problemInput: ProblemInput): [Problem!]!
    availableOperands: [RandomOperand!]!
  }

  schema {
    query: RootQuery
  }
`);
//# sourceMappingURL=index.js.map