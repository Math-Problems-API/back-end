const algebrite = require('algebrite');
const math = require('mathjs')

class SymbolicExpression {
  static name = 'SymbolicExpression';
  static binaryOperations = [
    { name: 'add', symbol: '+' },
    { name: 'subtract', symbol: '-' },
    { name: 'mutliply', symbol: '*' },
    { name: 'divide', symbol: '/' }
  ]

  constructor(expression, mathjs = false) {
    // algebrite.quote() simplifies fractions, e.g. quote(10/4) = 5/2
    // Use mathjs to form division expression instead as a workaround
    if(mathjs) {
      this.expression = math.parse(expression).toString({ parenthesis: 'none' })
      return;
    }
    this.expression = algebrite.quote(expression.toString()).toString()
  }

  static binaryOperation(name, simplify = false) {
    const { symbol } = SymbolicExpression
      .binaryOperations
      .find(op => op.name === name);

    return (left, right) => {
      const leftOperand = new SymbolicExpression(left).expression;
      const rightOperand = new SymbolicExpression(right).expression;
      const expression = `(${leftOperand}) ${symbol} (${rightOperand})`;

      const result = simplify ? algebrite.simplify(expression) : expression;

      if(name === 'divide') {
        return new SymbolicExpression(result, true);
      }

      return new SymbolicExpression(result);
    }
  }

  add(expression, simplify = false) {
    return SymbolicExpression.binaryOperation('add', simplify)(this.expression, expression);
  }

  subtract(expression, simplify = false) {
    return SymbolicExpression.binaryOperation('subtract', simplify)(this.expression, expression);
  }

  multiply(expression, simplify = false) {
    return SymbolicExpression.binaryOperation('multiply', simplify)(this.expression, expression);
  }

  divide(expression, simplify = false) {
    if(simplify) {
      return new SymbolicExpression(algebrite.quotient(this.expression, expression));
    }
    return SymbolicExpression.binaryOperation('divide')(this.expression, expression);
  }
}

// console.log(
//   new SymbolicExpression('x^2 + 2x + 1').divide('x', true)
// );

module.exports = SymbolicExpression;
