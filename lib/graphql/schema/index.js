const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type Problem {
  expression: String!
}

input BinaryOperationInput {
  left: Operand!
  right: Operand!
  links: [Link!]
}

input Operand {
  name: String!
  constraints: [String!]!
  range: String
}

input Link {
  modifier: Int
  target: Int!
  constraints: [String!]!
}

type RootQuery {
  addition(binaryInput: BinaryOperationInput): Problem!
  operandTypes: [String!]!
}

schema {
  query: RootQuery
}
`)

// Sample query?
//
// {
//   addition(binaryInput: {
//     left: {
// 			name: "RandomInteger"
//       constraints: 
//     }
//     right: {
// 			name: "RandomInteger"
//       constraints: [
//         {
//           name: "RandomInteger"
//           value: "range: [0, 100], num => num % 2 === 1"
//         }
//       ]
//     }
//   }) {
//     expression
//   }
// }