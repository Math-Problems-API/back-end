// Generating Problems
export type Operand = {
  value: string | number
}

export type Problem = {
  problem: string | number,
  solution?: string | number
}

export type Operator = (props: Operand[]) => Problem;

export type Generator = (ops: RandomOperand) => Operand;
export type GroupGenerator = (ops: RandomOperand[]) => Operand[];
export type GroupsGenerator = (ops: RandomOperand[][]) => Operand[][];


// Generating Operands
export type RandomOperand = {
  name?: string,
  generator: (properties: Property[]) => Operand,
  constraints?: Constraint[],
  properties?: Property[],
  value?: string | number
}

export type Property = {
  value: number | number[] | string | string[]
}

export type Constraint = (value: Operand) => boolean;

export type Link = {
  modifier: number,
  target: number,
  constraints: FirstOrderConstraint[]
}

export type FirstOrderConstraint = (modifier: Operand) => Constraint;


// Parsing GraphQL Data
export type UnParsedRandomOperand = {
  name: string,
  constraints?: string[],
  properties?: Property[]
}

export type UnParsedLink = {
  target: number,
  modifier: number,
  constraints: string[]
}
