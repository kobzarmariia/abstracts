# Functional

## Arrow functions

Before

```
let add = (x, y){
  return x + y;
}
```

ES6

```
let add = (x, y) => x + y;
let square = x => x * x;
let three = () => 3;

square(add(2, three())); //25
```

forEach

```
var numbers = [1,1,1,1];

var sum = 0;
numbers.forEach(n => sum += n);
```

Map

```
var doubled = numbers.map(n => n*2);
```

Async

```
let self = this;
self.name = "Chris";  //this.name

setTimeuot(function(){
  expect(self.name).toBe("Chris"); // this.name -> error here
  done()
}, 15)
```

=>

```
this.name = "Chris";

setTimeuot(() => { //see this name
  expect(this.name).toBe("Chris");
  done()
}, 15)
```

## Iterables and Iterators

Every object - iterable

Iterable - collection [1,2,3]
Iterator - next() {value: 1, done: false} {value: 2, done: false} {value: 3, done: false} {value: undefined, done: true}

```
	let sum = 0;
  let numbers = [1,2,3,4];

  sum = 0;
  for(let i =0; i < numbers.length; i++){    // for
    sum += numbers[i];
  }
  expect(sum).toBe(10);
```

for in (KEYS, index)

```
  sum = 0;
  for(let i in numbers) {    // for in (keys)
    sum += numbers[i];
  }
  expect(sum).toBe(10);
```

Iterator

```
sum = 0;

let iterator = numbers.values();
let next = iterator.next();
while (!next.done){
  sum += next.value;
  next = iterator.next();
}
```

for of (VAL)

```
  sum = 0;
  for(let i of numbers) {
    console.log(i);
    //sum += n;
  }
  expect(sum).toBe(10);
```

Symbol

```
s = Symbol();
x = {};
x[s] = 'Name';
```

Iterator in object (ArrayIterator)

```
  class Company {
    constructor() {
      this.employees = [];
    }

    addEmployees(...names) {
      this.employees = this.employees.concat(names);
    }

    [Symbol.iterator]() {           //iterator
      return new ArrayIterator(this.employees);
    }
  }

  class ArrayIterator {
    constructor(array) {
      this.array = array;
      this.index = 0;
    }

    next(){
      var result = { value: undefined, done: true };
      if(this.index < this.array.length) {
        result.value = this.array[this.index];
        result.done = false;
        this.index += 1;
      }
      return result;
    }
  }

  let count = 0;
  let company = new Company();
  company.addEmployees("Tim", "Sue", "Joy", "Tom");

  for(let employee of company) {
    count += 1;
  }

  expect(count).toBe(4);
```

## Generators

```
let numbers = function*() {
  yield 1; //return multible values
  yield 2;
  yield 3;
  yield 4;
}
```

```
let numbers = function*(start, end) {
  for(let i = start; i <= end; i++){
    yield  i;
  }
}
```

```
let sum = 0;
let iterator = numbers(1, 4); //numbers();
let next = iterator.next();
while(!next.done){
  sum += next.value;
  next = iterator.next();
}

sum; //10
```

Simple

```
let x = numbers();
x.next(); //{value: 1, done: false}
x.next(); //{value: 2, done: false}
numbers().next(); ////{value: 1, done: false}

```

```
let sum = 0;
for(let n of numbers(1,5)){
  sum += n;
}
```

Iterator in object (generator)

```
  class Company {
    constructor() {
      this.employees = [];
    }

    addEmployees(...names) {
      this.employees = this.employees.concat(names);
    }

    *[Symbol.iterator]() {
      //return new ArrayIterator(this.employees);
      for (let e of this.employees){
        yield e;
      }
    }
  }

  let filter = function*(items, predicate){
    for(let item of items){
      if(predicate(item)){
        yield item;
      }
    }
  };

  let take = function*(items, number){
    let count = 0;
    if(number < 1) return;
    for(let item of items){
      console.log("take", item);
      yield item;
      count += 1;
      if (count >= number){
        return;
      }
    }
  }

  let company = new Company();
  company.addEmployees("Tim", "Sue", "Joy", "Tom");

  for(let employee of take(filter(company, e => e[0] == 'S'), 1)) {   // (let employee of company) "Sue"
    count += 1;
  }
```

range

```
let range = function*(start, end) {
  let current = start;
  while(current <= end){
    //yield current;
    //current += 1;
    let delta = yield current;
    current += delta || 1;
  }
}

let range2 = function(start, end) {
  let current = start;
  let first = true;
  return{
    next(delta = 1) {
      let result = { value: undefined, done: true };
      if (!first){
        current += delta;
      }
      if(current <= end){
        result.value = current;
        result.done = false;
      }
      first = false;
      return result;
    }
  }
}

let result = [];
let iterator = range(1, 10);
let next = iterator.next();
while(!next.done){
  result.push(next.value);
  next = iterator.next(2); //attention
}

expect(result).toEqual([1, 3, 5, 7, 9]);
```

## Array Comprehensions

```
let numbers = [];
for (let n of [1,2,3]){
  numbers.push(n * n);
}
expect(numbers).toEqual([1, 4, 9]);
```

With comprehensions

```
var numbers = [for (n of [1, 2, 3]) n * n];

expect(numbers).toEqual([1, 4, 9]);
```

```
[for (x of object) x]
[for (x of object) if (condition) x]
[for (x of object) for (y of object) x + y]
```

```
var numbers = [for (n of [1, 2, 3]) if (n > 1) n * n];

expect(numbers).toEqual([4, 9]);
```

```
let filter = function*(items, predicate){
  yield [for (item of items) if(predicate(item)) item];    // yield ["Tim", "Sue"...]
  yield* [for (item of items) if(predicate(item)) item];   // yield "Tim"; yield "Sue"...

   // for(let item of items){
   // if(predicate(item)){
   //   yield item;
   // }
   // }
};
```
