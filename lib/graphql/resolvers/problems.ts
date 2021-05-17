import { 
  Problem,
  UnParsedLink,
  UnParsedRandomOperand
} from "../../problemsAPI/types";

import { 
  generateProblems
} from "../../problemsAPI/problems";

import availableOperands from "../../problemsAPI/operands/index";

import generateOperator from "../../problemsAPI/problems/generateOperator";

import {
  generateOperandGroups, 
  generateOperandWithConstraints 
} from "../../problemsAPI/problems/operandGeneration";



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

    const operandGroups = generateOperandGroups(operands, number, generateOperandWithConstraints);

    return generateProblems(operator, operandGroups);
  }
}
