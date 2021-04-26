# back-end

GraphQL API for constructing math problems. 

# What's working currently?

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

---
Addition problems with random, constrained integers. Queries look like this:

```js
query {
  addition(binaryInput: {
    left: {
      name: "RandomInteger"
      range: "[10, 100]"
      constraints: [
        "num => num % 3 === 0"
      ]
    }
    right: {
      name: "RandomInteger"
      constraints: [
        "num => num % 5 === 0"
      ]
    }
  }) {
    expression
  }
}
```

Thoughts:
  - Is it possible for GraphQL to "know" what operands are avaiable? Currently, the user has to input a "name" property for left/right. Possible to have some sort of auto-fill in GraphiQL like for the (static) schema things?
  - Probably do a "binary operation" route instead of add/subtract/etc... 

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
