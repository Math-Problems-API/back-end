const { buildSchema } = require('graphql');

const operands = ["RandomInteger", "RandomRealNumber", "RandomComplexNumber", 
"RandomFixedMatrix"];

const operandsString = operands.reduce((str, op) => {
  str += `${op}: String!\n`;
  return str;
}, '');

module.exports = buildSchema(`

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

input PresetInput {
  name: String!
  query: String!
}

type Problem {
  problem: String!
  solution: String! 
}

type OperandType {
  ${operandsString}
}

type Preset {
  name: String!
  query: String!
}

type RootQuery {
  binary(binaryInput: BinaryInput): [Problem]!
  preset(name: String!): [Problem!]!
  presets: [Preset!]!
  operandTypes: OperandType!
}

type RootMutation {
  createPreset(presetInput: PresetInput): Preset!
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`);
