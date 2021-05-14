"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Problem_1 = require("../../api/Problem");
const index_1 = __importDefault(require("../../api/operands/index"));
exports.default = {
    problems: ({ problemInput }) => {
        const { operands: rawOperands, operator: rawOperator } = problemInput;
        const operator = Problem_1.getOperatorFunction(rawOperator);
        const randomOperands = Problem_1.findOperands(rawOperands, index_1.default);
        return [Problem_1.generateProblem(operator, Problem_1.generateOperands(randomOperands))];
    }
};
//# sourceMappingURL=problems.js.map