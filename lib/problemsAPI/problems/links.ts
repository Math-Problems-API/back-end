import { Constraint, GroupGenerator, Link, Operand, RandomOperand } from "../types";
import { generateOperandWithConstraints } from "./operands";

export const addLinks = (operands: RandomOperand[], links: Link[]): RandomOperand[] => {
  const operandsWithModifiers = generateModifiers(operands, links);
  return addLinkConstraints(operandsWithModifiers, links);
};


// A convenience so that the links functions can
// work with RandomOperands
const giveRandomOperandValue = (random: RandomOperand, operand: Operand): RandomOperand => {
  const { value } = operand;
  return { ...random, value };
}

// Generate all of the RandomOperands whose index in operands
// shows up in one of the links 
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
      return giveRandomOperandValue(op, computed);
    }
    return op;
  })
};

// Make a new RandomOperand with some extra constraints
const addConstraints = (operand: RandomOperand, newConstraints: Constraint[]): RandomOperand => {
  const { constraints: oldConstraints } = operand;

  const constraints = [...oldConstraints, ...newConstraints];

  return { 
    ...operand, 
    constraints
  }
};

// I'm lying here. This function can't just take any array of RandomOperands and Links.
// Not sure how to deal with this yet.
const addLinkConstraints = (operands: RandomOperand[], links: Link[]): RandomOperand[] => {
  let ops = operands;

  links.forEach(link => {
    const { modifier, target, constraints } = link;
    
    const { value } = operands[modifier];
    const computedConstraints = constraints.map(c => c({ value }));
    const newOperand = addConstraints(operands[target], computedConstraints);

    ops = [...ops.slice(0, target), newOperand, ...ops.slice(target + 1)]
  });

  return ops;
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
