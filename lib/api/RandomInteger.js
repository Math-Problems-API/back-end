const algebrite = require('algebrite');
const { VM, NodeVM } = require('vm2');
const SymbolicExpression = require('./SymbolicExpression');

class RandomInteger {
  static name = 'RandomInteger';
  static maxIterations = 10000;

  constructor({ range = [0, 100], constraints = [] }) {
    this.range = range;
    this.constraints = constraints;
  }

  getRandom() {
    return RandomInteger.getRandom({ constraints: this.constraints, range: this.range, virtual: true })
  }

  static getRandom({ constraints, range, virtual = false }) {
    const lowerBound = range[0];
    const upperBound = range[1];
    const randomRange = upperBound - lowerBound;

    let random;
    let iterations = 0;
    let constraintsAreNotSatisfied = true;

    while(constraintsAreNotSatisfied) {
      if(iterations > RandomInteger.maxIterations) {
        const constraintsList = constraints.reduce((list, constraint) => {
          list += `\n\t${constraint}`;
          return list;
        }, `\n\trange: [${range[0]}, ${range[1]}]`);

        throw new Error(`\nCould not generate random integer with these constraints: ${constraintsList}. \nAre there conflicting constraints?`)
      }

      random = Math.floor(Math.random() * randomRange + lowerBound);

      let passed;
      if(virtual) passed = RandomInteger.virtualCheckConstraints(random, constraints);
      else passed = RandomInteger.checkContraints(random, constraints);

      if(passed) constraintsAreNotSatisfied = false;
      iterations += 1;
    }

    return new SymbolicExpression(random);
  }

  static checkContraints(number, constraints) {
    return constraints.reduce((passes, constraint) => {
      if(!constraint(number)) passes = false;
      return passes;
    }, true);
  }

  static virtualCheckConstraints(number, constraints) {
    const vm = new VM({ sandbox: { number } });

    const filteredConstraints = constraints
      .filter(c => !c.match(/["while","for"]/))

    const result = vm.run(`
      [${filteredConstraints}].reduce((passes, constraint) => {
        if(!constraint(number)) passes = false;
        return passes;
      }, true);
    `);

    return result;
  }
}

module.exports = RandomInteger

