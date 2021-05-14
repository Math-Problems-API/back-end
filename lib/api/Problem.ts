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
  const op = operand.generator(operand.properties);
  return op;
}


// Example

// We define a generator called intWithRange that knows
// how to work with range. 

// Represent range as an array
const lessThan100: Property = {
  name: "range",
  value: [0, 100]
}

// intWithRange has to know how to use lessThan100
// Sure, we can parametrize the generation of one 
// property like range. Convert everything to constraints?
// No
// Properties are supposed to deal with the generation of 
// the number. Constraints attempt to check additional properties
// only after the number has been generated. 
// So, I think a good way to do this is to IN README
const intWithRange = (props: Property[]): Operand => {
  const range = props.find(p => p.name === "range");

  const lowerBound = range.value[0];
  const upperBound = range.value[1];

  const difference = upperBound - lowerBound;

  const value = Math.floor(Math.random() * difference + lowerBound);

  return { value };
}

const RandomIntWithRange: RandomOperand = {
  generator: intWithRange,
  properties: [lessThan100]
}

const myAdditionProblem = additionProblem([
  generateOperand(RandomIntWithRange),
  generateOperand(RandomIntWithRange)
]);

console.log(myAdditionProblem);


