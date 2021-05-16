import {
  Problem,
  Operand,
  RandomOperand,
  Operator
} from "./types";

// Use a RandomOperand's generator and properties to
// generate an Operand
const generateOperand = (operand: RandomOperand): Operand => {
  return operand.generator(operand.properties);
}


// Generate a list of Operands from a list of RandomOperands
export const generateOperands = (ops: RandomOperand[]): Operand[] => ops.map(generateOperand);

export const generateProblems = (operator: Operator, ops: Operand[], number: number): Problem[] => {
  return [...Array(number)].map(() => operator(ops));
};


// Munge the operator field from a problems query into an
// Operator type function

export const generateOperator = (operator: string): Operator => {
  const [argList, result] = operator.split("=>");

  const args = argList.trim().split(", ");

  return (ops: Operand[]): Problem => {
    const problem = args.reduce((problem, arg) => {
      const argIndex = args.indexOf(arg);
      const operand = ops[argIndex];
      return problem.replace(arg, `${operand.value}`);
    }, result.trim());

    return { problem };
  };
};


// Given some data matching the shape of RandomOperand[]
// and a list of available RandomOperands, find the RandomOperands
// in the available list, set the properties according to the
// given data, then return the new list of RandomOperands

// If no RandomOperand by that name is found, throw error
// Do this so it makes it back to the user ¯\_(ツ)_/¯
export const findOperands = (operands: RandomOperand[], available: RandomOperand[]): RandomOperand[] => operands.map(o => {
  const { name, properties } = o;
  const op = available.find(o => o.name === name);

  if(!op) throw new Error(`Couldn't find operand with name ${name}`);

  const copy = { ...op };
  copy.properties = properties;
  return copy;
});
