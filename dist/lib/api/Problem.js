const additionProblem = (ops) => {
    return { problem: `${ops[0].value} + ${ops[1].value}` };
};
const generateOperand = (operand) => {
    const op = operand.generator(operand.properties);
    return op;
};
const myRange = {
    name: "range",
    value: [0, 100]
};
const intWithRange = (props) => {
    const range = props.find(p => p.name === "range");
    const lowerBound = range.value[0];
    const upperBound = range.value[1];
    const difference = upperBound - lowerBound;
    const value = Math.floor(Math.random() * difference + lowerBound);
    return { value };
};
const RandomIntWithRange = {
    generator: intWithRange,
    properties: [myRange]
};
const myInteger = generateOperand(RandomIntWithRange);
const myAdditionProblem = additionProblem([
    generateOperand(RandomIntWithRange),
    generateOperand(RandomIntWithRange)
]);
console.log(myAdditionProblem);
//# sourceMappingURL=Problem.js.map