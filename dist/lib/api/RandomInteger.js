"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vm2_1 = require("vm2");
const generator = (range) => {
    const lowerBound = range[0];
    const upperBound = range[1];
    const differnece = upperBound - lowerBound;
    return Math.floor(Math.random() * differnece + lowerBound);
};
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
console.log(generator([0, 100]));
//# sourceMappingURL=RandomInteger.js.map