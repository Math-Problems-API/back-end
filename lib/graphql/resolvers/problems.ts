import { 
  RandomOperand,
  Problem,
  getOperatorFunction, 
  findOperands, 
  generateProblem, 
  generateOperands 
} from "../../api/Problem";

import availableOperands from "../../api/operands/index";

type ProblemQuery = {
  operands: RandomOperand[],
  operator: string,
  number: number
}

type ProblemInput = {
  problemInput: ProblemQuery
}

export default {
  problems: ({ problemInput }: ProblemInput): Problem[] => {
    const { 
      operands: rawOperands, 
      operator: rawOperator 
    } = problemInput;

    const operator = getOperatorFunction(rawOperator);
    const randomOperands = findOperands(rawOperands, availableOperands);

    return [generateProblem(operator, generateOperands(randomOperands))];
  }
}