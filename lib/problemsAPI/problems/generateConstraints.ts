import { VM } from "vm2";
import { Constraint, Operand, FirstOrderConstraint } from "../types";

// These functions take data from GraphQL related to constraints
// and turn them into functions that the problem-generation
// functions can understand

const constraintFromString = (constraint: string): Constraint => {
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

const firstOrderConstraintFromString  = (constraint: string): FirstOrderConstraint => {
  const [target, result] = constraint.split("=>").map(s => s.trim());

  return (modifier: Operand) => {
    const modifierRegExp = new RegExp("modifier", "g");

    const resultWithModifier = result.replace(modifierRegExp, `${modifier.value}`);

    const constraintString = [target, resultWithModifier].join(" => ");

    return constraintFromString(constraintString)
  }
};

type Generator = (cons: string) => Constraint | FirstOrderConstraint;

const makeConstraintsGenerator = (generator: Generator) => {
  return (constraints: string[]) => constraints.map(c => generator(c));
};

export const generateConstraints = makeConstraintsGenerator(constraintFromString);

export const firstOrderConstraints = makeConstraintsGenerator(firstOrderConstraintFromString);
