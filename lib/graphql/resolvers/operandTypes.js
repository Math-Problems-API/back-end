const operands = ["RandomInteger", "RandomRealNumber", "RandomComplexNumber"];

const opObject = operands.reduce((obj, op) => {
  return {
    ...obj,
    [op]: op
  }
}, {});

console.log(opObject);

module.exports = {
  operandTypes: (args, parent) => {
    
    return opObject;
  }
}