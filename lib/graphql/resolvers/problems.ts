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
  addLinksToGroupGenerator,
  generateOperandsWithConstraints, 
  makeGroupsGenerator, 
  makeOperandGroups
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

    console.log("HI")
    

    const operator = generateOperator(rawOperator);
    const operands = findOperands(rawOperands, availableOperands);
    const links = generateLinks(rawLinks);

    const generateGroupWithLinks = addLinksToGroupGenerator(generateOperandsWithConstraints, links);
    const generateGroups = makeGroupsGenerator(generateGroupWithLinks);

    const randomOperandGroups = makeOperandGroups(operands, number);
    const operandGroups = generateGroups(randomOperandGroups);

    return generateProblems(operator, operandGroups);
  }
}
