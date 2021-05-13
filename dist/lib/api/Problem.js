// A problem is a function from a bunch of domains 
// ("operands") to something...
const RandomInteger = {
    name: "Random Integer",
    description: "A positive integer less than 100",
    generator: props => {
        const range = props.find(p => p.name === "range").value || [0, 100];
        const lowerBound = range[0];
        const upperBound = range[1];
        const difference = upperBound - lowerBound;
        const number = Math.floor(Math.random() * difference + lowerBound);
        return { value: number };
    }
};
const myRange = {
    name: "range",
    value: [0, 1000],
};
console.log(RandomInteger.generator([myRange]));
//# sourceMappingURL=Problem.js.map