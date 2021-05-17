import { VM } from "vm2";
import { Constraint, Operand, FirstOrderConstraint } from "../types";

const generateConstraint = (constraint: string): Constraint => {
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

export const generateConstraints = (constraints: string[]): Constraint[] => {
  return constraints.map(c => generateConstraint(c));
}

export const generateFirstOrderConstraint = (constraint: string): FirstOrderConstraint => {
  const [target, result] = constraint.split("=>").map(s => s.trim());

  return (modifier: Operand) => {
    const modifierRegExp = new RegExp("modifier", "g");

    const resultWithModifier = result.replace(modifierRegExp, `${modifier.value}`);

    const constraintString = [target, resultWithModifier].join(" => ");

    return generateConstraint(constraintString)
  }
} 
