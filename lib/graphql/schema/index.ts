import { buildSchema } from "graphql";

export default buildSchema(`
  input PropertyInput {
    value: [Int!]!
  }

  input RandomOperandInput {
    name: String!
    properties: [PropertyInput!]
    constraints: [String!]
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

  type Operator {
    name: String!
    value: String!
  }

  type RootQuery {
    problems(problemInput: ProblemInput): [Problem!]!
    availableOperands: [RandomOperand!]!
    availableOperators: [Operator!]
    availableOperatorViews: [String!]!
  }

  schema {
    query: RootQuery
  }
`);
