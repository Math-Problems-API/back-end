import { VM } from "vm2";
import { Constraint, Operand } from "../problemsAPI/types";

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

const generateConstraints = (constraints: string[]): Constraint[] => {
  return constraints.map(c => generateConstraint(c));
}

export default generateConstraints;
