import { buildSchema } from "graphql";

export default buildSchema(`
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
