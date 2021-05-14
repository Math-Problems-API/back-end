import { buildSchema } from "graphql";

export default buildSchema(`
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
    helloWorld: String!
    problems(problemInput: ProblemInput): [Problem!]!
    availableOperands: [RandomOperand!]!
  }

  schema {
    query: RootQuery
  }
`);
