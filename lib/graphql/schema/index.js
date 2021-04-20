const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type Problem {
  expression: String!
}

input Operand {
  name: String!
  constraints: [Constraint!]!
}

input Constraint {
  name: String!
  value: String!
}

input BinaryOperationInput {
  left: Operand!
  right: Operand!
}

type RootQuery {
  addition(binaryInput: BinaryOperationInput): Problem!
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
//       constraints: [
//         {
//           name: "RandomInteger"
//           value: "range: [0, 100], num => num % 2 === 1"
//         }
//       ]
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