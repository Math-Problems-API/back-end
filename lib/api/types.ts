export type Operand = {
  value: string | number
}

export type Problem = {
  problem: string | number,
  solution?: string | number
}

export type Property = {
  value: number | number[] | string | string[]
}

export type RandomOperand = {
  name?: string,
  generator: (properties: Property[]) => Operand,
  properties: Property[]
}

export type Operator = (props: Operand[]) => Problem;
