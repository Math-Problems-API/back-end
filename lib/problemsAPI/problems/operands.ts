import { 
  Constraint, 
  Operand, 
  RandomOperand, 
  Generator, 
  GroupGenerator, 
  Link, 
  GroupsGenerator 
} from "../types";

import { makeGeneratorWithConstraints } from "./constraints";


// Generating Operands

// Use a RandomOperand's generator and properties to
// generate an Operand
const generateOperand: Generator = operand => {
  const { value } = operand;
  if(value !== undefined) return { value };
  return operand.generator(operand.properties);
};

// Make an array consisting of number copies of the ops array
export const makeOperandGroups = (ops: RandomOperand[], number: number): RandomOperand[][] => {
  return [...Array(number)].map(() => ops);
};

// Given a generator, make a GroupGenerator that generates
// an array of RandomOperands. 
export const makeGroupGenerator = (generator: Generator): GroupGenerator => (ops: RandomOperand[]): Operand[] => ops.map(generator);

// Make a GroupsGenerator from a GroupGenerator that generates
// an array of RandomOperand arrays. 
export const makeGroupsGenerator = (generator: GroupGenerator): GroupsGenerator => groups => groups.map(generator);


// Specific generators

// Add constraints to generateOperand
export const generateOperandWithConstraints = makeGeneratorWithConstraints(generateOperand, 10000);

// GroupGenerator with Constraints
export const generateOperandsWithConstraints = makeGroupGenerator(generateOperandWithConstraints);

// Groups version
export const generateGroupsWithConstraints = makeGroupsGenerator(generateOperandsWithConstraints);
