"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOperands = exports.generateOperatorFunction = exports.generateProblems = void 0;
// Use a RandomOperand's generator and properties to
// generate an Operand
const generateOperand = (operand) => {
    return operand.generator(operand.properties);
};
// Generate a list of Operands from a list of RandomOperands
const generateOperands = (ops) => ops.map(generateOperand);
const generateProblems = (operator, ops, number) => {
    return [...Array(number)].map(() => operator(generateOperands(ops)));
};
exports.generateProblems = generateProblems;
// Munge the operator field form a problems query into an
// Operator type function
const generateOperatorFunction = (operator) => {
    const [argList, result] = operator.split("=>");
    const args = argList.trim().split(", ");
    return (ops) => {
        const problem = args.reduce((problem, arg) => {
            const argIndex = args.indexOf(arg);
            const operand = ops[argIndex];
            return problem.replace(arg, `${operand.value}`);
        }, result.trim());
        return { problem };
    };
};
exports.generateOperatorFunction = generateOperatorFunction;
// Given some data matching the shape of RandomOperand[]
// and a list of available RandomOperands, find the RandomOperands
// in the available list, set the properties according to the
// given data, then return the new list of RandomOperands
// If no RandomOperand by that name is found, throw error
// Do this so it makes it back to the user ¯\_(ツ)_/¯
const findOperands = (operands, available) => operands.map(o => {
    const { name, properties } = o;
    const op = available.find(o => o.name === name);
    if (!op)
        throw new Error(`Couldn't find operand with name ${name}`);
    const copy = Object.assign({}, op);
    copy.properties = properties;
    return copy;
});
exports.findOperands = findOperands;
//# sourceMappingURL=Problem.js.map