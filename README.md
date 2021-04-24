# back-end

## What's working currently?

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
