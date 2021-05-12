import { buildSchema } from "graphql";

export default buildSchema(`
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
