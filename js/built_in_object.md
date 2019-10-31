# Built-in objects

## Numbers

```
//octal(8 - (0, 1, 2, 3, 4, 5, 6,  7) 154368=1·8^4+5·8^3+4·8^2+3·8^1+6·8^0=6942(10)) and hexadecimal(16 - A(10)) numbers
var a = 10;
var hexd = 0xa;
```

Octal

```
var octal = 071; //57 "0"-prefixed (7*8^1 + 1*8^0 = 56 + 1 = 57)
parseInt(071); //57
var octal = 0o71;
```

Bin

```
var bin = 0b1101; //13
```

ParseInt

```
Number.parseInt("3").toBe(3);
Number.parseFloat("3.5").toBe(3.5);
```

isFinite

```
isFinite(Infinity);  // false

isFinite(0);         // true
isFinite(2e64);      // true

isFinite("1");         // true
Number.isFinite("1");  // false
```

isNaN

```
isNaN("NaN");        //true
Number.isNaN("NaN"); //false
```

isInteger

```
isInteger(1);       //true
isInteger(1.0);     //true
isInteger(1.5);     //false
```

Number.MAX_SAFE_INTEGER & MIX_SAFE_INTEGER (9007199254740991 & -9007199254740991)

```
Number.isSafeInteger(9007199254740991);
```

## Math

```
Math.floor( 45.95); //  45
Math.floor(-45.95); // -46

Math.round(20.49); //20
Math.round(20.5); //21
Math.round(-20.5); //20

Math.cbrt(2);  // 1.2599210498948734

Math.max(10, 20);   //  20
Math.max(-10, -20); // -10

Math.sign(3);     //  1
Math.sign(-3);    // -1
Math.sign('-3');  // -1
Math.sign(0);     //  0
Math.sign(-0);    // -0
Math.sign(NaN);   // NaN

Math.trunc(13.37);    // 13
Math.trunc(42.84);    // 42
Math.trunc(0.123);    //  0
Math.trunc(-0.123);   // -0
Math.trunc('-1.123'); // -1
Math.trunc(NaN);      // NaN
Math.trunc('foo');    // NaN

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));  //[0, 1)
}
```

## Arrays

```
[4,5,10].find(item => item > 8); //10
[4,5,10].findIndex(item => item > 8); //2


//arr.fill(value[, start = 0[, end = this.length]])
[1, 2, 3].fill(4);        // [4, 4, 4]
[1, 2, 3].fill(4, 1);     // [1, 4, 4]
[1, 2, 3].fill(4, 1, 2);  // [1, 4, 3]


//arr.copyWithin(target, start[, end = this.length])
[1, 2, 3, 4, 5].copyWithin(0, 3);   // [4, 5, 3, 4, 5]
[1, 2, 3, 4, 5].copyWithin(0, 3, 4);  // [4, 2, 3, 4, 5] 3,4 - source indexes
```

Array

```
var ary = new Array(3);
var ofAry = Array.of(3);
ary.length = 3;
ofAry.length = 1;
```

## Set (unic)

```
var mySet = new Set();

mySet.add(1); // Set { 1 }
mySet.add(5); // Set { 1, 5 }
mySet.add(5); // Set { 1, 5 }
mySet.add("some text"); // Set { 1, 5, 'some text' }

mySet.has(1); // true
mySet.size; // 3
mySet.delete(5); // удаляет 5 из set

var myArr = Array.from(mySet);     // [1, "some text", {"a": 1, "b": 2}]
mySet2 = new Set([1,2,3,4]);
```

## Map

```
var myMap = new Map();

var keyObj = {},
    keyFunc = function () {},
    keyString = "a string";

// задание значений
myMap.set(keyString, "value associated with 'a string'");
myMap.set(keyObj, "value associated with keyObj");
myMap.set(keyFunc, "value associated with keyFunc");

myMap.size; // 3

// получение значений
myMap.get(keyString);    // "value associated with 'a string'"
myMap.get(keyObj);       // "value associated with keyObj"
myMap.get(keyFunc);      // "value associated with keyFunc"

myMap.get("a string");   // "value associated with 'a string'"
                         // потому что keyString === 'a string'
myMap.get({});           // undefined, потому что keyObj !== {}
myMap.get(function() {}) // undefined, потому что keyFunc !== function () {}
```

## WeakMap & WeakSet

```
let john = { name: "John" };

let map = new Map();
map.set(john, "...");

john = null; //map.keys()
```

WeakMap

```
let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null;
```
