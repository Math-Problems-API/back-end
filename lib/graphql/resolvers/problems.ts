import { 
  RandomOperand,
  Problem
} from "../../problemsAPI/types";

import { 
  generateOperatorFunction, 
  findOperands,
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

    const operator = generateOperatorFunction(rawOperator);
    const randomOperands = findOperands(rawOperands, availableOperands);

    return generateProblems(operator, randomOperands, number);
  }
}
