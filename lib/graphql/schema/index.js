const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type Operand {
  name: String!
  constraints: [Constraint!]!
}

type Constraint {
  name: String!
  value: String!
}

input BinaryOperationInput {
  left: Operand!
  right: Operand!
}

type RootQuery {
  addition(
    binary: BinaryOperationInput
  )
}
`)