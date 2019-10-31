# JS (ES6)

ES1 - 1997
ES2 — 1998
ES3 - 1999
ES4
ES5 - 2009

- getters setters
- strict mode
- JSON

ES6/ES2015

- let const
- destructive assignment
- arrow functions
- pattern lines
- symbol iterator
- yield - generator functions
- promise
- Rest/Spread

ES7/ES2016

- exponentiation operator \*\*
- Array.prototype.includes, which checks if the passed argument is contained in the array.

ES8/ES017

- async/await
- padStart() padEnd()
- Object.getOwnPropertyDescriptors()
- Atomics

ES9/ES2018

- Asynchronous iteration
- Promise.finally()
- Named Regular Expression Capture Groups

```
const
  reDate = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/,
  match  = reDate.exec('2018-04-30'),
  year = match.groups.year,  // 2018
  month  = match.groups.month, // 04
  day = match.groups.day; // 30
```

ES10/ES2019

## Contents:

1. [Variables and Parameters](./variables_and_parameters.md)
2. [Classes](./classes.md)
3. [Functional](./functional.md)
4. [Built-in objects](./built_in_object.md)
5. [Asynchronous](./asynchronous.md)
6. [Objects](./objects.md)
7. [Modules](./modules.md)
8. [Currying](./currying.md)
