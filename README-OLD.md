# back-end

GraphQL API for constructing math problems. 

# What's working currently?

5/14

Migrated stuff to TypeScript in a functional style. There is some repeated `type` definitions, because I don't know how to write one type for GQL and TypeScript. 

Currently only gets one problem. 


5/2/21

Presets implemented. Get all presets or create a new preset using the GraphQL endpoint. 

```js
query {
  presets {
    name
    query
  }
}

mutation {
  createPreset(presetInput: {
    name: "easy addition"
    query: "{ binary(binaryInput: { ... }) { ... } }"
  }) {
    name
    query
  }
}
```

Ask for problems generated by the query string in a preset using its name in the `/presets/:name` route. Currently names have to be unqiue.


4/26/21

Added `binary` query. Looks like this:

```js
{
  binary(binaryInput: {
    left: {
      name: "RandomInteger"
      range: "[5, 100]"
      constraints: [
        "num => num % 5 === 0"
      ]
    }
    right: {
      name: "RandomInteger"
      range: "[0, 100]"
      constraints: [
        "num => num % 3 === 1"
      ]
    }
    operator: '-'
    links: [
      {
        modifier: 0,
        target: 1,
        constraints: [
          "modifier => target => target < modifier"
        ]
      }
    ]
    number: 10
  }) {
    problem
    solution
  }
}

```

This query returns 10 subtraction problems where the first number is a multiple of 5, the second number is one more than a multiple of 3, and the result is positive.  


Thoughts:
  - Is it possible for GraphQL to "know" what operands are avaiable? Currently, the user has to input a "name" property for left/right. Possible to have some sort of auto-fill in GraphiQL like for the (static) schema things?
  - Use Admin route to add presets that every user can see.
  - Allow users to create presets for later use. 

# Links Explanation

For a subtraction problem, you may want the answer to always be positive. How does this happen mathematically? It can interpreted two ways: the left operand is greater than the right or the right is less than the left. Either way, one operand depends on the other.

The indepedent operand is called the `modifier` and the dependent operand is called the `target`

These relationships are called `links` in the API and they look like this:

```js
  {
    modifier: 0,
    target: 1,
    constraints: [
      "modifier => target => target < modifier"
    ]
  }
```

The values for `modifier` and `target` are their indices in the array of operands that gets passed to the `Problem` constructor. For binary operations, `left` has index `0` and `right` has index `1`. 

`constraints` is similar to constraints on `RandomIntegers` except that they are higher-order functions. These functions return constraint functions. The so-called "modifiers" are computed first, then the higher-order constraints are called with their respective modifier values, then the constraint functions that are returned are added to the constraints on their respective targets. 

For example, using the link above, the left operand would be compute first since it is a modifier. Say it returns `37`. Then, the constraint is called with `modifier = 37` which returns `target => target < 37`. This constraint is added to the constraints on the target, the right operand. In this way, the right operand is guaranteed* to be less than the left. 

\* You can get yourself into trouble pretty easily! What if the left operand is `0`?


# More General Queries?

Right now, the binary operand operator functions are defined like this
```js
  operands => algebrite.quote(`${operands[0]} ${symbol} ${operands[1]}`)
```

The query is limited because it only accepts `left` and `right` operands, but we could do an array of operands. Then, we need to tell the Problem class how to combine the operands with an `operator` function, so more user input is required. Maybe the query could look like this

```js
{
  binary(binaryInput: {
    operands: [
      {
        name: "RandomInteger"
        range: [0, 100]
      },
      {
        name: "RandomInteger"
        range: [0, 100]
      }
    ]
    number: 10
    operator: "operands => operands[0] + operands[1]"
    links: [
      {
        modifier: 0
        target: 1
        constraints: [
          "modifier => target => target <= modifier"
        ]
      }
    ]
  }) {
    problem
    solution
  }
}
```

This is more versatile, and it makes the usage of indices in `links` more clear than before. 

Problems
- How do we deal with different operands having different properties? Polynomials may have degree and Integers have the range property, so do we include every property (and make them optional) in the `Operand` GraphQL type? Seems verbose. This will get harder to understand with more operand properties. 
- Need to make sure `operator` function's return value does not get evaluated by Node, mathjs, algebrite, or whatever ends up parsing it. For example, the `operator` function `operands => operands[0] + operands[1]` returns `2 + 3` and not `6`. 
- What language can be used across all types of operators? How can I tell the API to integrate `f(x) = x^2` from 0 to 1 in a string? Ideally, it'd be something like LaTeX. Is there something that can parse LaTeX expressions and evaluate them when needed?
- Currently `range` is just a string. Change it to array of two `Int`s.


# Notes

5/13/21

---
Split development into two problem sets:
- Generating problems
- Generating solutions and solution verification

I want to decouple getting and checking solutions from the problem generation since it's causing a lot of headache. 

The interface between problems and solutions is something (prolly a function) that looks at the problems statement and computes an answer. 

This is easy for four function problems since JavaScript knows how to evaluate "2 + 3" but what about "integrate x^2 from 0 to 1" or "factor 12" or "list divisors of 16"?

I think wolfram may be good for this. 



5/14

---
What's the difference between `Property` and `Constraint`? 

Here, I think it's useful to think of properties as being applied at generation,
whereas constraints are checks applied after generation. Constraints check, fail,
generate, check again. 

It's easier to write constraints, but properties make things run faster. 


## Generating Problems

- randomly generate operands
- make a "problem statement", e.g. something like "add 2 to 3" or "2 + 3 = ?" or "2 + 3"

