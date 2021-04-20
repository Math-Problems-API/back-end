const algebrite = require('algebrite');
const SymbolicExpression = require('./SymbolicExpression');

class RandomInteger {
  static maxIterations = 100000;

  constructor({ range = [0, 10], constraints = [] }) {
    this.range = range;
    this.constraints = constraints;
  }

  getRandom() {
    return RandomInteger.getRandom({ constraints: this.constraints, range: this.range })
  }

  static getRandom({ constraints, range }) {
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
      const passed = RandomInteger.checkContraints(random, constraints);
      if(passed) constraintsAreNotSatisfied = false;
      iterations += 1;
    }

    return new SymbolicExpression(random);
  }

  static checkContraints(number, constraints) {
    let satisfiesContraints = true;
    constraints.forEach(constraint => {
      if(!constraint(number)) satisfiesContraints = false;
    })
    return satisfiesContraints;
  }
}

module.exports = RandomInteger

// console.log(
//   new RandomInteger({
//     range: [0, 100],
//     constraints: [
//       num => num > 10,
//       num => num % 2 === 0,
//       num => num % 3 === 1
//     ]
//   }).getRandom()
// );
