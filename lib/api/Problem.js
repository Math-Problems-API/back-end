const algebrite = require('algebrite');
const { VM } = require('vm2');
const math = require('mathjs')
const RandomInteger = require('./RandomInteger');

// The operator IS the function that tells
// the problem how to put it together! Just
// pass this instead of making and object of
// a bunch of different ones

class Problem {
  constructor({ operator, operands, links = [], virtual = false }) {
    this.operator = operator;
    this.operands = operands;
    this.links = links;
    this.virtual = virtual;
  }
  getProblems(number) {
    return [...Array(number)].map(() => this.getProblem());
  }

  getProblem() {
    // Keep track of operand values
    const values = [];

    // Modifiers affect targets. Need to generate
    // modifiers first for targets.
    const modifiers = this.links.reduce((mods, link) => {
      const { modifier } = link;
      if(modifier !== null) mods.push(modifier);
      return mods;
    }, []);

    // Evaluate modifiers
    modifiers.forEach(mod => {
      values[mod] = this.operands[mod].getRandom();
    });

    // Make new operands and keep them here
    const targets = {};

    this.operands.forEach((op, index) => {
      const links = this.links
        .filter(link => link.target === index);

      // Link constraints get run here
      // Need VM

      const extraConstraints = links.reduce((consts, link) => {
        const vm = new VM({ sandbox: { 
          values,
          link
        } });

        const { constraints } = link;

        return [
          ...consts, 
          ...vm.run(`
            [${constraints}]
              .map(c => {
                return c().toString().replace('modifier', values[link.modifier].expression)
              })
          `)
        ]
      }, []);

      if(links.length > 0) {
        targets[index] = new op.constructor({
          ...op,
          constraints: [
            ...op.constraints,
            ...extraConstraints
          ]
        })
      }
    });

    // Evaluate targets
    Object.keys(targets).forEach(index => {
      values[index] = targets[index].getRandom()
    });

    // Evaluate Remaining
    this.operands.forEach((op, index) => {
      if(values[index] !== undefined) return;
      values[index] = op.getRandom();
    });

    // Somehow convert the operands list into
    // an algebrite/mathjs function

    const expression = this.operator(values.map(v => v.expression)).toString()

    return {
      problem: expression,
      solution: algebrite.run(expression)
    }
  }
}

module.exports = Problem;
