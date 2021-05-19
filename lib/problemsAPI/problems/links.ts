import { GroupGenerator, Link, Operand, RandomOperand } from "../types";
import { generateOperandWithConstraints } from "./operands";
import { addConstraints } from "./constraints";


// apply addLinks functionality to a GroupGenerator
export const addLinksToGroupGenerator = (generator: GroupGenerator, links: Link[]): GroupGenerator => {
  return (operands: RandomOperand[]): Operand[] => {
    const opsWithLinks = addLinksToOperandGroup(operands, links);
    return generator(opsWithLinks);
  }
};


// Helper Functions

// Group version of addLinks
const addLinksToOperandGroup = (operands: RandomOperand[], links: Link[]): RandomOperand[] => {
  const opsWithModifiers = generateModifiers(operands, links);
  return addLinkConstraints(opsWithModifiers, links);
};

// A convenience so that the links functions can work 
// with RandomOperands. The generator used in operands.ts
// deals with this.
const giveRandomOperandValue = (random: RandomOperand, operand: Operand): RandomOperand => {
  const { value } = operand;
  return { ...random, value };
}

// For each modifier value on a link, generate the
// RandomOperand with that index
const generateModifiers = (operands: RandomOperand[], links: Link[]): RandomOperand[] => {
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

// Compute the constraints on each link using the values
// of the modifiers in operands. 

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
