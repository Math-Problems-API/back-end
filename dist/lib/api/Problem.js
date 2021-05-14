// GraphQL
const getOperatorFunction = (operator) => {
    const [argList, result] = operator.split("=>");
    const args = argList.trim().split(", ");
    console.log(args);
    return (ops) => {
        const problem = args.reduce((problem, arg) => {
            const argIndex = args.indexOf(arg);
            const operand = ops[argIndex];
            return problem.replace(arg, `${operand.value}`);
        }, result);
        return { problem };
    };
};
const addProblemFromGQL = getOperatorFunction("left, right => left + right");
const additionProblem = (ops) => {
    return { problem: `${ops[0].value} + ${ops[1].value}` };
};
const generateOperand = (operand) => {
    return operand.generator(operand.properties);
};
// Example
// We define a generator called intWithRange that knows
// how to work with range. 
// Represent range as an array
const lessThan100 = {
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
    properties: [lessThan100]
};
// Single instance
const myAdditionProblem = addProblemFromGQL([
    generateOperand(RandomIntWithRange),
    generateOperand(RandomIntWithRange)
]);
// Any number of addition problems
const generateAddProblems = (number) => {
    return [...Array(number)].map(() => {
        return additionProblem([
            generateOperand(RandomIntWithRange),
            generateOperand(RandomIntWithRange)
        ]);
    });
};
console.log(myAdditionProblem);
//# sourceMappingURL=Problem.js.map