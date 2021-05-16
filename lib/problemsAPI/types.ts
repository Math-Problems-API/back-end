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
  properties?: Property[]
}

export type UnParsedRandomOperand = {
  name?: string,
  constraints?: string[],
  properties?: Property[]
}


// Generic Operator shape
// e.g. addition is ([left, right]) => `${left} + ${right}`
export type Operator = (props: Operand[]) => Problem;