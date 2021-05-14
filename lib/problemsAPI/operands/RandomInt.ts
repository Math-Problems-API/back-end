import { Operand, RandomOperand } from "../types";

type myRange = {
  value: [number, number]
}

const range: myRange = { value: [0, 1000] };

const intWithRange = (props: [myRange]): Operand => {
  const range = props[0];

  const lowerBound = range.value[0];
  const upperBound = range.value[1];

  const difference = upperBound - lowerBound;

  const value = Math.floor(Math.random() * difference + lowerBound);

  return { value };
};

const RandomInt: RandomOperand = {
  name: "Random Int with Range",
  generator: intWithRange,
  properties: [range]
}

export default RandomInt;
