const { VM } = require('vm2');

const math = require('mathjs');
const algebrite = require('algebrite');
const api = require('../../api/index');
const Problem = require('../../api/Problem');

module.exports = {
  addition: args => {
    const { left, right, links, number } = args.binaryInput;

    const leftConstructor = findOperand(left.name);
    const rightConstructor = findOperand(right.name);

    if(!leftConstructor) {
      throw new Error(`${left.name} does not exist (yet)`)
    }

    if(!rightConstructor) {
      throw new Error(`${right.name} does not exist (yet)`)
    }

    const leftRange = left.range ? JSON.parse(left.range) : [0, 100]

    const leftOperand = new leftConstructor({
      range: leftRange,
      constraints: left.constraints
    });

    // Feed constraints to VM and check???
    

    const rightRange = right.range ? JSON.stringify(right.range) : [0, 100]

    const rightOperand = new rightConstructor({
      range: rightRange,
      constraints: right.constraints
    });

    const additionProblem = new Problem({
      operator: operands => {
        return algebrite.quote(
          `(${operands[0]}) + (${operands[1]})`
        );
      },
      operands: [leftOperand, rightOperand],
      links
    });

    return {
      problems: additionProblem.getProblems(number)
    }
  },
  binary: args => {
    console.log('Hi');
    const { 
      left,
      right,
      links,
      number = 1,
      operator = '+' 
    } = args.binaryInput;

    const leftConstructor = findOperand(left.name);
    const rightConstructor = findOperand(right.name);

    if(!leftConstructor) {
      throw new Error(`${left.name} does not exist (yet)`)
    }

    if(!rightConstructor) {
      throw new Error(`${right.name} does not exist (yet)`)
    }

    const leftRange = left.range ? JSON.parse(left.range) : [0, 100]

    const leftOperand = new leftConstructor({
      range: leftRange,
      constraints: left.constraints
    });

    const rightRange = right.range ? JSON.parse(right.range) : [0, 100]

    const rightOperand = new rightConstructor({
      range: rightRange,
      constraints: right.constraints
    });

    const binaryOperatorProblem = new Problem({
      operator: operands => {
        if(operator === '/' || operator === '*') {
          return math.parse(
            `${operands[0]} ${operator} ${operands[1]}`
          )
        }
        return algebrite.quote(
          `(${operands[0]}) ${operator} (${operands[1]})`
        );
      },
      operands: [leftOperand, rightOperand],
      links
    });

    return {
      problems: binaryOperatorProblem.getProblems(number).map(p => p.toString())
    }
  }
}

function findOperand(operand) {
  return api.find(op => op.name === operand);
}
