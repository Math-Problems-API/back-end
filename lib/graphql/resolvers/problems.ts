import { 
  Problem,
  UnParsedLink,
  UnParsedRandomOperand
} from "../../problemsAPI/types";

import { 
  generateProblems
} from "../../problemsAPI/problems/generateProblems";

import availableOperands from "../../problemsAPI/operands/index";

import generateOperator from "../../problemsAPI/problems/generateOperator";

import {
  generateOperandGroups, 
  generateOperandWithConstraints 
} from "../../problemsAPI/problems/operands";

import { findOperands } from "../../problemsAPI/problems/findOperands";
import { generateLinks } from "../../problemsAPI/problems/generateConstraints";



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
    const links = generateLinks(rawLinks);

    // Generate Modifiers
    // Add link constraints
    // Generate the rest

    const operandGroups = generateOperandGroups(operands, number, generateOperandWithConstraints);

    return generateProblems(operator, operandGroups);
  }
}
