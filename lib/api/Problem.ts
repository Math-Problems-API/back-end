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

// Munge the operator field form a problems query into an
// Operator type function
export const getOperatorFunction = (operator: string): Operator => {
  const [argList, result] = operator.split("=>");

  const args = argList.trim().split(", ");

  return (ops: Operand[]): Problem => {
    const problem = args.reduce((problem, arg) => {
      const argIndex: number = args.indexOf(arg);
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
export const findOperands = (operands: RandomOperand[], available: RandomOperand[]): RandomOperand[] => operands.map(o => {
  const { name, properties } = o;
  const op = available.find(o => o.name === name);

  if(!op) throw new Error(`Couldn't find operand with name ${name}`);

  const copy = { ...op };
  copy.properties = properties;
  return copy;
});

// Generate a list of Operands from a list of RandomOperands
export const generateOperands = (ops: RandomOperand[]): Operand[] => ops.map(generateOperand);

// Generate a Problem given an Operator and a list of Operands
export const generateProblem = (operator: Operator, ops: Operand[]): Problem => {
  return operator(ops);
}
