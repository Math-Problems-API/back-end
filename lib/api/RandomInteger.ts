import { VM } from "vm2";

export const generator = (range: [number, number]): number => {
  const lowerBound = range[0];
  const upperBound = range[1];
  const differnece = upperBound - lowerBound;

  return Math.floor(Math.random() * differnece + lowerBound);
};

export const getConstraintsChecker = (constraints: string[]) => {
  return (number: number): boolean => {
    const vm = new VM({ sandbox: { number }});

    return vm.run(`
    [${constraints}].reduce((passes, constraint) => {
      if(!constraint(number)) passes = false;
      return passes;
    }, true);
    `)
  }
};
