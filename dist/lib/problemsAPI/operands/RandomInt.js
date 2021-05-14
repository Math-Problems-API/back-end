"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const range = { value: [0, 1000] };
const intWithRange = (props) => {
    const range = props[0];
    const lowerBound = range.value[0];
    const upperBound = range.value[1];
    const difference = upperBound - lowerBound;
    const value = Math.floor(Math.random() * difference + lowerBound);
    return { value };
};
const RandomInt = {
    name: "Random Int with Range",
    generator: intWithRange,
    properties: [range]
};
exports.default = RandomInt;
//# sourceMappingURL=RandomInt.js.map