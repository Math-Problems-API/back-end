"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Problem_1 = require("../../problemsAPI/Problem");
const index_1 = __importDefault(require("../../problemsAPI/operands/index"));
exports.default = {
    problems: ({ problemInput }) => {
        const { operands: rawOperands, operator: rawOperator, number } = problemInput;
        const operator = Problem_1.generateOperatorFunction(rawOperator);
        const randomOperands = Problem_1.findOperands(rawOperands, index_1.default);
        return Problem_1.generateProblems(operator, randomOperands, number);
    }
};
//# sourceMappingURL=problems.js.map