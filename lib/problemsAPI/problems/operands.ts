import { Constraint, Operand, RandomOperand, Generator, GroupGenerator, Link, GroupsGenerator } from "../types";

// Use a RandomOperand's generator and properties to
// generate an Operand
const generateOperand = (operand: RandomOperand): Operand => {
  const { value } = operand;
  if(value !== undefined) return { value };
  return operand.generator(operand.properties);
};

// Checks constraints by giving each a particular value
export const constrainer = (constraints: Constraint[], operand: Operand): boolean => {
  return constraints.reduce((pass, constraint) => {
    if(!constraint(operand)) return false;
    return pass;
  }, true);
}

// Takes a generator function. Wraps it in a constraint checker
// maxIterations is the number at which an error will be thrown.
// Maybe make this case up to the user. 
const makeGeneratorWithConstraints = (generator: Generator, maxIterations = 10000): Generator => {
  return (operand: RandomOperand): Operand => {
    let passes = false, iterations = 0, value;

    while(!passes) {
      if(iterations > maxIterations) throw new Error("Couldn't generate operand")

      value = generator(operand);
      const passesThisIteration = constrainer(operand.constraints, value);

      iterations += 1;

      if(passesThisIteration) passes = true;
    }

    return value;
  }
}

export const generateOperandWithConstraints = makeGeneratorWithConstraints(generateOperand, 10000);

// Generate a list of Operands from a list of RandomOperands
export const makeGroupGenerator = (generator: Generator): GroupGenerator => (ops: RandomOperand[]): Operand[] => ops.map(generator);

export const makeGroupsGenerator = (generator: GroupGenerator): GroupsGenerator => groups => groups.map(generator);

export const generateOperandsWithConstraints = makeGroupGenerator(generateOperandWithConstraints);

export const makeOperandGroups = (ops: RandomOperand[], number: number): RandomOperand[][] => {
  return [...Array(number)].map(() => ops);
}

export const generateGroupsWithConstraints = makeGroupsGenerator(generateOperandsWithConstraints);

const addValue = (random: RandomOperand, operand: Operand): RandomOperand => {
  const { value } = operand;
  return { ...random, value };
}

export const generateModifiers = (operands: RandomOperand[], links: Link[]): RandomOperand[] => {
  const modifiers = links.reduce((modifiers, link) => {
    const { modifier } = link;
    if(typeof modifier === "number" && !modifiers.includes(modifier)) {
      return [...modifiers, modifier];
    }
    return modifiers;
  }, []);

  return operands.map((op, index) => {
    if(modifiers.includes(index)) {
      const computed = generateOperandWithConstraints(op);
      return addValue(op, computed);
    }
    return op;
  })
};

// Make a new RandomOperand with extra constraints
const addConstraints = (operand: RandomOperand, newConstraints: Constraint[]): RandomOperand => {
  const { constraints: oldConstraints } = operand;

  const constraints = [...oldConstraints, ...newConstraints];

  return { 
    ...operand, 
    constraints
  }
};

// I'm lying here. This function can't just take any array of RandomOperands and Links.
// Not sure how to deal with this.
const addLinkConstraints = (operands: RandomOperand[], links: Link[]): RandomOperand[] => {
  let ops = operands;

  links.forEach(link => {
    const { modifier, target, constraints } = link;
    const { value } = operands[modifier];
    const computedConstraints = constraints.map(c => c({ value }));
    const newOperand = addConstraints(operands[target], computedConstraints);

    ops = [...ops.slice(target), newOperand, ...ops.slice(target + 1)]
  });

  return ops;
};

export const addLinks = (operands: RandomOperand[], links: Link[]): RandomOperand[] => {
  const operandsWithModifiers = generateModifiers(operands, links);
  return addLinkConstraints(operandsWithModifiers, links);
};

const addLinksToOperandGroup = (operands: RandomOperand[], links: Link[]): RandomOperand[] => {
  const opsWithModifiers = generateModifiers(operands, links);
  return addLinkConstraints(opsWithModifiers, links);
};

export const addLinksToGroupGenerator = (generator: GroupGenerator, links: Link[]): GroupGenerator => {
  return (operands: RandomOperand[]): Operand[] => {
    const opsWithLinks = addLinksToOperandGroup(operands, links);
    return generator(opsWithLinks);
  }
};

