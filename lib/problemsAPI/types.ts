// Specific instance of a RandomOperand
export type Operand = {
  value: string | number
}

// Problem shape. solution is optional; not assuming
// we'll be able to generate solutions for every
// problem
export type Problem = {
  problem: string | number,
  solution?: string | number
}

// Properties are used according to the definition of
// a generator function
export type Property = {
  value: number | number[] | string | string[]
}


export type Constraint = (value: Operand) => boolean;


// Generates an Operand according to its given
// properties and the definition of the generator
export type RandomOperand = {
  name?: string,
  generator: (properties: Property[]) => Operand,
  constraints?: Constraint[],
  properties?: Property[],
  value?: string | number
}

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


// Generic Operator shape
// e.g. addition is ([left, right]) => `${left} + ${right}`
export type Operator = (props: Operand[]) => Problem;

export type Generator = (ops: RandomOperand) => Operand;

export type Link = {
  modifier: number,
  target: number,
  constraints: FirstOrderConstraint[]
}

export type FirstOrderConstraint = (modifier: Operand) => Constraint;
