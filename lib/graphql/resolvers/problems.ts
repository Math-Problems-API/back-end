import { 
  Problem,
  UnParsedLink,
  UnParsedRandomOperand
} from "../../problemsAPI/types";

import { 
  findOperands,
  generateProblems
} from "../../problemsAPI/problems";

import availableOperands from "../../problemsAPI/operands/index";

import generateOperator from "../../problemsAPI/problems/generateOperator";

type ProblemQuery = {
  operands: UnParsedRandomOperand[],
  operator: string,
  links: UnParsedLink[],
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
      links: rawLinks,
      number
    } = problemInput;

    const operator = generateOperator(rawOperator);
    const operands = findOperands(rawOperands, availableOperands);

    return generateProblems(operator, operands, number);
  }
}
