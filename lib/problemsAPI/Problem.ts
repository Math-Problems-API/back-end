import generateConstraints from "../utils/generateConstraints";
import {
  Problem,
  Operand,
  RandomOperand,
  Operator,
  Constraint,
  UnParsedRandomOperand
} from "./types";

// Use a RandomOperand's generator and properties to
// generate an Operand
const generateOperand = (operand: RandomOperand): Operand => {
  return operand.generator(operand.properties);
};


// Generate a list of Operands from a list of RandomOperands
export const generateOperands = (ops: RandomOperand[]): Operand[] => ops.map(generateOperand);

export const generateProblems = (operator: Operator, ops: Operand[], number: number): Problem[] => {
  return [...Array(number)].map(() => operator(ops));
};


// Given some data matching the shape of RandomOperand[]
// and a list of available RandomOperands, find the RandomOperands
// in the available list, set the properties according to the
// given data, then return the new list of RandomOperands

// If no RandomOperand by that name is found, throw error
// Do this so it makes it back to the user ¯\_(ツ)_/¯
export const findOperands = (operands: UnParsedRandomOperand[], available: RandomOperand[]): RandomOperand[] => operands.map(o => {
  const { name, properties, constraints: rawConstraints } = o;
  const op = available.find(o => o.name === name);

  if(!op) throw new Error(`Couldn't find operand with name ${name}`);

  const constraints = generateConstraints(rawConstraints);

  const copy = { ...op };
  copy.properties = properties;
  copy.constraints = constraints;

  return copy;
});

export const constrainer = (constraints: Constraint[], operand: Operand): boolean => {
  return constraints.reduce((pass, constraint) => {
    if(constraint(operand)) return false;
    return pass;
  }, true);
}