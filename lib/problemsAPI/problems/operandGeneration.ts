import { Constraint, Operand, RandomOperand, Generator } from "../types";

// Use a RandomOperand's generator and properties to
// generate an Operand

const generateOperand = (operand: RandomOperand): Operand => {
  return operand.generator(operand.properties);
};

export const constrainer = (constraints: Constraint[], operand: Operand): boolean => {
  return constraints.reduce((pass, constraint) => {
    if(!constraint(operand)) return false;
    return pass;
  }, true);
}

// I'd really like to have partial application here
const makeGeneratorWithConstraints = (generator: Generator, maxIterations = 10000): Generator => {
  return (operand: RandomOperand): Operand => {
    let passes = false, iterations = 0, value;

    while(!passes) {
      if(iterations > maxIterations) throw new Error("Couldn't generate operand")

      value = generateOperand(operand);
      const passesThisIteration = constrainer(operand.constraints, value);

      iterations += 1;

      if(passesThisIteration) passes = true;
    }

    return value;
  }
}

export const generateOperandWithConstraints = makeGeneratorWithConstraints(generateOperand, 10000);

// Generate a list of Operands from a list of RandomOperands
export const generateOperands = (ops: RandomOperand[], generator: Generator): Operand[] => ops.map(generator);

export const generateOperandGroups = (ops: RandomOperand[], number: number, generator: Generator): Operand[][] => {
  return [...Array(number)].map(() => generateOperands(ops, generator));
}
