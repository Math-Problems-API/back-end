"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateProblem = exports.generateOperands = exports.findOperands = exports.getOperatorFunction = void 0;
const generateOperand = (operand) => {
    return operand.generator(operand.properties);
};
// const lessThan100: myRange = {
//   value: [0, 100]
// };
const intWithRange = (props) => {
    const range = props[0];
    const lowerBound = range.value[0];
    const upperBound = range.value[1];
    const difference = upperBound - lowerBound;
    const value = Math.floor(Math.random() * difference + lowerBound);
    return { value };
};
const getOperatorFunction = (operator) => {
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
exports.getOperatorFunction = getOperatorFunction;
// const addProblemFromGQL = getOperatorFunction(operator);
// // Now find the operands
const range = { value: [0, 1000] };
const RandomInt = {
    name: "Random Int with Range",
    generator: intWithRange,
    properties: [range]
};
const availableOperands = [RandomInt];
const findOperands = (operands) => operands.map(o => {
    const { name, properties } = o;
    const op = availableOperands.find(o => o.name === name);
    if (!op)
        throw new Error(`Couldn't find operand with name ${name}`);
    const copy = Object.assign({}, op);
    copy.properties = properties;
    return copy;
});
exports.findOperands = findOperands;
const generateOperands = (ops) => ops.map(generateOperand);
exports.generateOperands = generateOperands;
const generateProblem = (operator, ops) => {
    return operator(ops);
};
exports.generateProblem = generateProblem;
//# sourceMappingURL=Problem.js.map