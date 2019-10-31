# Variables and Parameters

## let

- block scope {}
- global scope
- func scope

let - block scope
var - func scope

```
var doWork1 = function(flag){
    //var x = undefined
    if (flag){
        var x = 3;
    }
    return x;
}

doWork(false); //undefined

var doWork2 = function(flag){
    //var x = undefined
    if (flag){
        let x = 3;
    }
    return x;
}

doWork(false); //Reference error
```

for

```
var doWork1 = function(){
    for(var i = 0; i < 10; i++){

    }
    return i;
}

doWork1(); //10

var doWork2= function(){
    for(let i = 0; i < 10; i++){

    }
    return i;
}

doWork2(); //Reference error
```

## let

```
const MAX_SIZE = 10;
MAX_SIZE = 12; //SyntaxError
expect(MAX_SIZE).toBe(10);
```

```
var doWork1 = function(){
    var x = 12;
    var x = 10;
    return x; //10 OK
}

var doWork1 = function(){
    const x = 12; //or let
    var x = 10; //SyntaxError
    return x;
}
```

## Destructuring

```
let [, x, y, z] = [1, 2, 3]; //skip first

[x, y] = [y, x]; //swap

expect(x).toBe(3);
expect(y).toBe(2);
expect(z).toBeUndefined(2);
```

```
{x: z, y: y} = {x: "xxx", y: "yyy"}; //{x: z, y} = {x: "xxx", y: "yyy"};
z //"xxx"
y //"yyy"
```

```
let doWork = function(url, {data, cache}){
    return data;
}

let result = doWork("api/test", {data: "test", cache: false});

result //test
```

## Default Parameter Value

Before

```
let doWork = function(name){
    name = name || "Scott";
    return name;
}
```

ES6

```
let doWork = function(name = "Scott"){
    return name;
}
```

```
let doWork = function(a = 1, b = 2, c = 3){
    return [a, b, c];
}

let [a, b, c] = doWork(5, undefined)

a //5
b //NO undefined - 2
c //3
```

## Rest Parameters

Before

```
let sum = function() {
    let result = 0;
    for (let i = 0; i < arguments.length; i++)
    {
        result += arguments[i];
    }
    return result;
};

let result = sum(1, 2, 3)
```

ES6

```
let sum = function( ...numbers ) { //rest (name, ...numbers) numbers.forEach( n => result+= n )
    let result = 0;
    for (let i = 0; i < numbers.length; i++)
    {
        result += numbers[i];
    }
    return result;
};

let result = sum(1, 2, 3)
```

## Spread Operator

```
let doWork = function(x, y, z){
    return x + y + z;
}

var result = doWork(...[1, 2, 3]); //6
```

```
var a = [4, 5, 6];
var b = [1, 2, 3, ...a, 7, 8, 9]
```

## Template Literals

String concatination before

```
let category = "music";
let id = 2112;

let url = "http://apiserver/" + category + "/" + id;
```

ES6

```
let url = `http://apiserver/${category}/${id}`;
```
