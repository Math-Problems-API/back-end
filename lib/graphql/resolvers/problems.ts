import { 
  Problem,
  UnParsedLink,
  UnParsedRandomOperand
} from "../../problemsAPI/types";

import { 
  findOperands, 
  generateLinks, 
  generateOperator 
} from "../../problemsAPI/problems/dataAPI";

import availableOperands from "../../problemsAPI/operands/index";

import { generateProblems } from "../../problemsAPI/problems/problems";

import {
  generateOperandsWithConstraints, 
  makeGroupsGenerator, 
  makeOperandGroups
} from "../../problemsAPI/problems/operands";

import { addLinksToGroupGenerator } from "../../problemsAPI/problems/links";



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
    const randomOperands = findOperands(rawOperands, availableOperands);
    const links = generateLinks(rawLinks);

    const generateGroupWithLinks = addLinksToGroupGenerator(generateOperandsWithConstraints, links);

    const generateGroups = makeGroupsGenerator(generateGroupWithLinks);

    const randomOperandGroups = makeOperandGroups(randomOperands, number);
    const operandGroups = generateGroups(randomOperandGroups);

    return generateProblems(operator, operandGroups);
  }
}
