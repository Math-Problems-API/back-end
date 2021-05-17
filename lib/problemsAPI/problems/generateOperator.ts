import { Operator, Operand, Problem } from "../types";

// Munge the operator field from a problems query into an
// Operator type function

const generateOperator = (operator: string): Operator => {
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

export default generateOperator;
