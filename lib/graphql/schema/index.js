const { buildSchema } = require('graphql');

const operands = ["RandomInteger", "RandomRealNumber", "RandomComplexNumber", 
"RandomFixedMatrix"];

const operandsString = operands.reduce((str, op) => {
  str += `${op}: String!\n`;
  return str;
}, '');

module.exports = buildSchema(`

type Problem {
  problems: [String!]
}

input BinaryInput {
  left: Operand!
  right: Operand!
  links: [Link!]
  number: Int
  operator: String
}

input Operand {
  name: String!
  constraints: [String!]
  range: String
}

input Link {
  modifier: Int
  target: Int!
  constraints: [String!]!
}

type OperandType {
  ${operandsString}
}

type RootQuery {
  addition(binaryInput: BinaryInput): Problem!
  binary(binaryInput: BinaryInput): Problem!
  operandTypes: OperandType!
}

schema {
  query: RootQuery
}
`);
