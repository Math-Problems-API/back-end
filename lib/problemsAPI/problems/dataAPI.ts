import { 
  RandomOperand, 
  UnParsedRandomOperand, 
  Operator, 
  Operand, 
  Problem, 
  Constraint,
  FirstOrderConstraint,
  UnParsedLink,
  Link
} from "../types";

import { VM } from "vm2";

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

// Munge the operator field from a problems query into an
// Operator function
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

// Similar to generateOperator, but this returns code that is
// actually run, e.g. 17 % 3 === 0. 
export const constraintFromString = (constraint: string): Constraint => {
  const [rawArg, rawResult] = constraint.split("=>");

  const trimmedArg = rawArg.trim();

  if(rawResult.match("for") || rawResult.match("while")) {
    return () => true;
  }

  return (operand: Operand): boolean => {
    const argRegex = new RegExp(trimmedArg, "g");

    const result = rawResult.replace(argRegex, `${operand.value}`);
    
    const vm = new VM({ sandbox: { operand: operand.value } });

    const computedResult = vm.run(result);

    if(typeof computedResult !== "boolean") return true;

    return computedResult;
  }
};

export const firstOrderConstraintFromString  = (constraint: string): FirstOrderConstraint => {
  const [target, result] = constraint.split("=>").map(s => s.trim());

  return (modifier: Operand) => {
    const modifierRegExp = new RegExp("modifier", "g");

    const resultWithModifier = result.replace(modifierRegExp, `${modifier.value}`);

    const constraintString = [target, resultWithModifier].join(" => ");

    return constraintFromString(constraintString)
  }
};

const generateConstraints = (constraints: string[]): Constraint[] => constraints.map(c => constraintFromString(c));

export const firstOrderConstraints = (constraints: string[]): FirstOrderConstraint[] => constraints.map(c => firstOrderConstraintFromString(c));

export const generateLinks = (links: UnParsedLink[] = []): Link[] => {
  return links.map(l => {
    const constraints = firstOrderConstraints(l.constraints);
    return { ...l, constraints };
  });
}
