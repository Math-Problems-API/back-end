// A problem is a function from a bunch of domains 
// ("operands") to something...

type Operand = {
  name: string,
  properties: Property[],
  description?: string
}

type Property = {
  name: string,
  description: string
}

type Operands = {
  operands: Operand[]
}

const integer: Operand = {
  name: "Integer",
  properties: [
    { name: "range", description: "a lower bound and upper bound" }
  ]
}

