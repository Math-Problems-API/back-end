import { RandomOperand, UnParsedRandomOperand } from "../types";
import { generateConstraints } from "./generateConstraints";

// Given some data matching the shape of RandomOperand[]
// and a list of available RandomOperands, find the RandomOperands
// in the available list, set the properties according to the
// given data, then return the new list of RandomOperands

// If no RandomOperand by that name is found, throw error
// Do this so it makes it back to the user ¯\_(ツ)_/¯
export const findOperands = (operands: UnParsedRandomOperand[], available: RandomOperand[]): RandomOperand[] => operands.map(o => {
  const { name, properties, constraints: rawConstraints = []} = o;
  const op = available.find(o => o.name === name);

  if(!op) throw new Error(`Couldn't find operand with name ${name}`);

  const constraints = generateConstraints(rawConstraints);

  const copy = { ...op };
  copy.properties = properties;
  copy.constraints = constraints;

  return copy;
});