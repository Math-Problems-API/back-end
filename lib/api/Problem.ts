// GraphQL

// problem(probemInput: ProblemInput: {
//   operands: ["RandomIntWithRange", "RandomIntWithRange"],
//   operator: "left, right => left + right",
//   number: 3
// }) {
//   problem
//   solution
// } 

// In this situation, we need some code to convert the
// operator string into a proper problem function like
// additionProblem

type Operator = (props: Operand[]) => Problem;

const getOperatorFunction = (operator: string): Operator => {
  const [argList, result] = operator.split("=>");

  const args = argList.trim().split(", ");

  return (ops: Operand[]): Problem => {
    const problem = args.reduce((problem, arg) => {
      const argIndex: number = args.indexOf(arg);
      const operand = ops[argIndex];
      return problem.replace(arg, `${operand.value}`);
    }, result);

    return { problem };
  };
};

const addProblemFromGQL = getOperatorFunction("left, right => left + right");



// Specific case
type Operand = {
  value: string | number
}

type Problem = {
  problem: string | number,
  solution?: string | number
}

const additionProblem = (ops: [Operand, Operand]): Problem => {
  return { problem: `${ops[0].value} + ${ops[1].value}` };
};


// Random Operand Generation
type Property = {
  name: string,
  value: number | number[] | string | string[]
}

type RandomOperand = {
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
const lessThan100: Property = {
  name: "range",
  value: [0, 100]
};

const intWithRange = (props: Property[]): Operand => {
  const range = props.find(p => p.name === "range");

  const lowerBound = range.value[0];
  const upperBound = range.value[1];

  const difference = upperBound - lowerBound;

  const value = Math.floor(Math.random() * difference + lowerBound);

  return { value };
};

const RandomIntWithRange: RandomOperand = {
  generator: intWithRange,
  properties: [lessThan100]
};

// Single instance
const myAdditionProblem = addProblemFromGQL([
  generateOperand(RandomIntWithRange),
  generateOperand(RandomIntWithRange)
]);

// Any number of addition problems
const generateAddProblems = (number: number): Problem[] => {
  return [...Array(number)].map(() => {
    return additionProblem([
      generateOperand(RandomIntWithRange),
      generateOperand(RandomIntWithRange)
    ]);
  });
};

console.log(myAdditionProblem);
