import {
  Problem,
  Operator,
  Operand,
} from "../types";

export const generateProblems = (operator: Operator, operandGroups: Operand[][]): Problem[] => {
  return operandGroups.map(operands => operator(operands));
};
