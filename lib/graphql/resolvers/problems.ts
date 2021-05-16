import { 
  RandomOperand,
  Problem,
  UnParsedRandomOperand
} from "../../problemsAPI/types";

import { 
  findOperands,
  generateOperands,
  generateProblems,
  makeGeneratorWithConstraints
} from "../../problemsAPI/Problem";

import availableOperands from "../../problemsAPI/operands/index";

import generateOperator from "../../utils/generateOperator";

type ProblemQuery = {
  operands: UnParsedRandomOperand[],
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

    const operands = generateOperands(randomOperands, makeGeneratorWithConstraints(10000));

    return generateProblems(operator, operands, number);
  }
}
