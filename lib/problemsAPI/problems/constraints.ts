import { 
  Constraint, 
  Generator, 
  Operand, 
  RandomOperand 
} from "../types";

// Checks constraints by giving each a particular value
export const constraintsCheck = (constraints: Constraint[], operand: Operand): boolean => {
  return constraints.reduce((pass, constraint) => {
    if(!constraint(operand)) return false;
    return pass;
  }, true);
}

// Takes a generator function. Wraps it in a constraint checker
// after it iterates maxIterations times, throw error 
export const makeGeneratorWithConstraints = (generator: Generator, maxIterations = 10000): Generator => {
  return (operand: RandomOperand): Operand => {
    let passes = false, iterations = 0, value: Operand;

    while(!passes) {
      if(iterations > maxIterations) throw new Error("Couldn't generate operand")

      value = generator(operand);
      const passesThisIteration = constraintsCheck(operand.constraints, value);

      iterations += 1;

      if(passesThisIteration) passes = true;
    }

    return value;
  }
}

// Make a new RandomOperand with some extra constraints
export const addConstraints = (operand: RandomOperand, newConstraints: Constraint[]): RandomOperand => {
  const { constraints: oldConstraints } = operand;
  const constraints = [...oldConstraints, ...newConstraints];
  return { 
    ...operand, 
    constraints
  }
}
