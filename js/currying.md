# Currying

Partial application.

```
curry(fn)(arg1)(arg2)(arg3); //call in arg3
```

```
function curry(fn, ...args)
{
  return function(arg){
    const allArgs = args.concat(arg);

    if (allArgs.length >= fn.length) {
      return fn(...allArgs);
    } else {
      return curry(fn, ...allArgs);
    }
  }
}

function mult3(x, y, z){ return x * y * z }

mult3(2, 3, 4); //24

curry(mult3); //return func

curry(mult3)(2); //return func
curry(mult3)(2)(3); //return func
curry(mult3)(2)(3)(4); //return 24

const log = (logger, level, message) => logger(`${level}: ${message}`);

const clientLogger = curry(log)(console.log);

const clientLoggerWarning = clientLogger('WARNING');

clientLoggerWarning("message");
```

```
function curry(func) {

  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };

}

function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);

alert( curriedSum(1, 2, 3) );
alert( curriedSum(1)(2,3) );
alert( curriedSum(1)(2)(3) );
```

Currying is the transformation of functions so that they take arguments not like
f(a, b, c) -> f(a)(b)(c)

```
function curry(f) {
  return function(a) {
    return function(b) {
      return f(a, b);
    };
  };
}

function sum(a, b) {
  return a + b;
}

let carriedSum = curry(sum);

alert( carriedSum(1)(2) ); // 3
```
