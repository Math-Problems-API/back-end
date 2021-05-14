// Specific case
type Operand = {
  value: string | number
}

export type Problem = {
  problem: string | number,
  solution?: string | number
}

// const additionProblem = (ops: [Operand, Operand]): Problem => {
//   return { problem: `${ops[0].value} + ${ops[1].value}` };
// };


// Random Operand Generation
type Property = {
  value: number | number[] | string | string[]
}

export type RandomOperand = {
  name?: string,
  generator: (properties: Property[]) => Operand,
  properties: Property[]
}

const generateOperand = (operand: RandomOperand): Operand => {
  return operand.generator(operand.properties);
}


// Example

// We define a generator called intWithRange that knows
// how to work with range. 

// Represent range as an array
type myRange = {
  value: [number, number]
}

// const lessThan100: myRange = {
//   value: [0, 100]
// };

const intWithRange = (props: [myRange]): Operand => {
  const range = props[0];

  const lowerBound = range.value[0];
  const upperBound = range.value[1];

  const difference = upperBound - lowerBound;

  const value = Math.floor(Math.random() * difference + lowerBound);

  return { value };
};

// const RandomIntWithRange: RandomOperand = {
//   name: "Random Integer: Range",
//   generator: intWithRange,
//   properties: [lessThan100]
// };

// // Single instance
// const myAdditionProblem = additionProblem([
//   generateOperand(RandomIntWithRange),
//   generateOperand(RandomIntWithRange)
// ]);

// // Any number of addition problems
// const generateAddProblems = (number: number): Problem[] => {
//   return [...Array(number)].map(() => {
//     return additionProblem([
//       generateOperand(RandomIntWithRange),
//       generateOperand(RandomIntWithRange)
//     ]);
//   });
// };

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

// const operator = "left, right => left + right";

// const operands = [
//   { 
//     name: "Random Int with Range",
//     properties: [
//       { name: "range", value: [0, 100] }
//     ]
//   },
//   { 
//     name: "Random Int with Range",
//     properties: [
//       { name: "range", value: [0, 100] }
//     ]
//   },
// ];

// In this situation, we need some code to convert the
// operator string into a proper problem function like
// additionProblem

type Operator = (props: Operand[]) => Problem;

export const getOperatorFunction = (operator: string): Operator => {
  const [argList, result] = operator.split("=>");

  const args = argList.trim().split(", ");

  return (ops: Operand[]): Problem => {
    const problem = args.reduce((problem, arg) => {
      const argIndex: number = args.indexOf(arg);
      const operand = ops[argIndex];
      return problem.replace(arg, `${operand.value}`);
    }, result.trim());

    return { problem };
  };
};

// const addProblemFromGQL = getOperatorFunction(operator);


// // Now find the operands
const range: myRange = { value: [0, 1000] };

const RandomInt: RandomOperand = {
  name: "Random Int with Range",
  generator: intWithRange,
  properties: [range]
}

const availableOperands = [RandomInt];

export const findOperands = (operands: RandomOperand[]): RandomOperand[] => operands.map(o => {
  const { name, properties } = o;
  const op = availableOperands.find(o => o.name === name);

  if(!op) throw new Error(`Couldn't find operand with name ${name}`);

  const copy = { ...op };
  copy.properties = properties;
  return copy;
});

export const generateOperands = (ops: RandomOperand[]): Operand[] => ops.map(generateOperand);

export const generateProblem = (operator: Operator, ops: Operand[]): Problem => {
  return operator(ops);
}
