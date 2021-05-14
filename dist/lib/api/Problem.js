const additionProblem = (ops) => {
    return { problem: `${ops[0].value} + ${ops[1].value}` };
};
const generateOperand = (operand) => {
    return operand.generator(operand.properties);
};
const lessThan100 = {
    value: [0, 100]
};
const intWithRange = (props) => {
    const range = props[0];
    const lowerBound = range.value[0];
    const upperBound = range.value[1];
    const difference = upperBound - lowerBound;
    const value = Math.floor(Math.random() * difference + lowerBound);
    return { value };
};
const RandomIntWithRange = {
    name: "Random Integer: Range",
    generator: intWithRange,
    properties: [lessThan100]
};
// Single instance
const myAdditionProblem = additionProblem([
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
// console.log("Single Problem: ", myAdditionProblem);
// console.log("Ten Problems: ", generateAddProblems(10));
// GraphQL
// Here's a query
// problem(problemInput: {
//   operands: [
//      { 
//        name: "Random Integer: Range",
//        properties: [
//          { name: "range", value: [0, 100] }
//        ]
//      },
//      { 
//        name: "Random Integer: Range",
//        properties: [
//          { name: "range", value: [0, 100] }
//        ]
//      },
//   ],
//   operator: "left, right => left + right",
//   number: 3
// }) {
//   problem
//   solution
// } 
const operator = "left, right => left + right";
const operands = [
    {
        name: "Random Int with Range",
        properties: [
            { name: "range", value: [0, 100] }
        ]
    },
    {
        name: "Random Int with Range",
        properties: [
            { name: "range", value: [0, 100] }
        ]
    },
];
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
const addProblemFromGQL = getOperatorFunction(operator);
// Now find the operands
const range = { value: [0, 1000] };
const RandomInt = {
    name: "Random Int with Range",
    generator: intWithRange,
    properties: [range]
};
const availableOperands = [RandomInt];
const foundOperands = operands.map(o => {
    const { name, properties } = o;
    const op = availableOperands.find(o => o.name === name);
    if (!op)
        throw new Error(`Couldn't find operand with name ${name}`);
    const copy = Object.assign({}, op);
    copy.properties = properties;
    return copy;
});
const generated = foundOperands.map(o => generateOperand(o));
const problems = addProblemFromGQL(generated);
console.log(problems);
//# sourceMappingURL=Problem.js.map