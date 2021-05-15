# Back End

Problem queries look like this:

```js
  problems(problemInput: {
    operands: [
      {
        name: "Random Integer with Range",
        properties: [
          {
            value: [0, 100]
          }
        ],
        constraints: [
          "num => num % 5 === 0"
        ]
      },
      {
        name: "Random Integer with Range",
        properties: [
          {
            value: [0, 100]
          }
        ],
        constraints: [
          "num => num ** 0.5 === Math.floor(num ** 0.5)"
        ]
      }
    ]
    operator: "left, right => left - right"
    number: 10
    links: [
      {
        modifier: 0,
        target: 1,
        constraints: [
          "target => target <= modifier"
        ]
      }
    ]
  }) {
    problem
  }
```

Operand names are hard-coded. Use `availableOperands` query to find out what operands are coded at this point in time. 

Constraints represent extra properties you want an operand to have. For example, you may want a number to be a multiple of 5. This can be accomplished with the constraint `num => num % 5 === 0`. 

Properties are similar to constraints. They are hard-coded because they are applied at generation. For example, the `range` property on `Random Integer with Range` is used in its generator function to randomly generate a number within the bounds specified by the `range` property. 

The `operator` property represents the type of problem you want. They should be typed in that sort-of-javascript-arrow-function-notation as demo'd above. 

Later, solutions for problems will be computed using Wolfram's API, so make sure it can understand your operator!

Operator exmaples
- Addition: `"left, right => left + right"`
- Factor into prime: `"number => List divisors of number"`
- Integrals: `"integrand, lower, upper => integrate integrand from lower to upper"`

Number is the number of problems you want.

Links represent situations when you want one or more operands to depend on other operands. For example, you may want only positive results for a subtraction problem. Mathematically, the left number should be greater than the right. `right` is dependent on `left`. So we say `left` "modifies" the "target" `right`. Then this `link` looks like this

```js
  {
    modifier: 0,
    target: 1,
    constraints: [
      "target => target <= modifier"
    ]
  }
```

The numbers refer to the index of the modifier/target in the `operands` array. 

Here's an example for division: 
```js 
  {
    modifier: 1,
    target: 0,
    constraints: [
      "target => target % modifier === 0"
    ]
  }
```