"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConstraintsChecker = exports.generator = void 0;
const vm2_1 = require("vm2");
const generator = (range) => {
    const lowerBound = range[0];
    const upperBound = range[1];
    const differnece = upperBound - lowerBound;
    return Math.floor(Math.random() * differnece + lowerBound);
};
exports.generator = generator;
const getConstraintsChecker = (constraints) => {
    return (number) => {
        const vm = new vm2_1.VM({ sandbox: { number } });
        return vm.run(`
    [${constraints}].reduce((passes, constraint) => {
      if(!constraint(number)) passes = false;
      return passes;
    }, true);
    `);
    };
};
exports.getConstraintsChecker = getConstraintsChecker;
//# sourceMappingURL=RandomInteger.js.map