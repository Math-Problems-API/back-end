"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Problem_1 = require("../../api/Problem");
exports.default = {
    problem: ({ problemInput }) => {
        console.log(problemInput);
        const { operands: rawOperands, operator: rawOperator } = problemInput;
        const operator = Problem_1.getOperatorFunction(rawOperator);
        const randomOperands = Problem_1.findOperands(rawOperands);
        return [Problem_1.generateProblem(operator, Problem_1.generateOperands(randomOperands))];
    }
};
//# sourceMappingURL=problem.js.map