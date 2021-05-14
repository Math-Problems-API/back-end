"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
exports.default = graphql_1.buildSchema(`
  input Property {
    value: [Int!]!
  }

  input RandomOperand {
    name: String!
    properties: [Property!]
  }

  input Link {
    modifier: Int
    target: Int!
    constraints: [String!]!
  }

  input ProblemInput {
    operands: [RandomOperand!]!
    operator: String!
    links: [Link!]
    number: Int
  }

  type Problem {
    problem: String!
    solution: String
  }

  type RootQuery {
    helloWorld: String!
    problem(problemInput: ProblemInput): [Problem!]!
  }

  schema {
    query: RootQuery
  }
`);
//# sourceMappingURL=index.js.map