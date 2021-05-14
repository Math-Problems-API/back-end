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

const generateOperand = (operand: RandomOperand): Operand => {
  return operand.generator(operand.properties);
}

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

export const findOperands = (operands: RandomOperand[], available: RandomOperand[]): RandomOperand[] => operands.map(o => {
  const { name, properties } = o;
  const op = available.find(o => o.name === name);

  if(!op) throw new Error(`Couldn't find operand with name ${name}`);

  const copy = { ...op };
  copy.properties = properties;
  return copy;
});

export const generateOperands = (ops: RandomOperand[]): Operand[] => ops.map(generateOperand);

export const generateProblem = (operator: Operator, ops: Operand[]): Problem => {
  return operator(ops);
}
