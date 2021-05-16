import { 
  RandomOperand,
  Problem
} from "../../problemsAPI/types";

import { 
  generateOperator, 
  findOperands,
  generateOperands,
  generateProblems
} from "../../problemsAPI/Problem";

import availableOperands from "../../problemsAPI/operands/index";

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
      operator: rawOperator,
      number
    } = problemInput;

    const operator = generateOperator(rawOperator);
    const randomOperands = findOperands(rawOperands, availableOperands);
    const operands = generateOperands(randomOperands);

    return generateProblems(operator, operands, number);
  }
}
