# Objects

Zero

```
-0 === 0; //true
Object.is(0, -0); //false
```

NaN

```
NaN === NaN; //false
Object.is(NaN, NaN); //true

```

Object.assign

```
var o1 = { a: 1 };
var o2 = { b: 2 };
var o3 = { c: 3 };

var obj = Object.assign(o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }
```

```
var model = 'Ford';
var year = 1992;

var obj = {
  model,      //model: model,
  year,
  getPort(){} //getPort: function() {}
}

obj.model; //Ford
```

Before

```
function createSimpleObject(propName, propVal) {
  var obj = {};
  obj[propName] = propVal;
  return obj;
}
```

ES6

```
function createSimpleObject(propName, propVal) {
  return {
    [propName]: propVal, //attention [], without -> propName: red
  }
}

createSimpleObject('color', 'red');

//['member_' first.name]: first,
```

## Proxies

```
let unicorn = {
  legs: 4,
  color: "pink",
  horn: true,
  hornAttack: function(target) {
    return target.name + ' was obliterated!';
  }
}

var proxyUnicorn = new Proxy(unicorn, {
  get: function(target, property) {
    if (property === 'color'){
      return 'awesome ' + target[property];
    } else {
      return target[property];
    }
  }

  set: function(target, property, value){
    if (property === 'horn' && value === false){
      console.log("unicorn cannon ever lose its horn!");
    } else {
      target[property] = value;
    }
  }
});

proxyUnicorn.legs; //4
proxyUnicorn.color; //awesome brown

proxyUnicorn.color = 'white';
proxyUnicorn.horn = false; //cl("unicorn cannon ever lose its horn!")

var thief = {name: 'Rupert'};
thief.attack = unicorn.hornAttack;
thief.attack();

unicorn.hornAttack = new Proxy(unicorn.hornAttack, {
  apply: function(target, context, args) {
    if (context !== unicorn){
      return "Nobody can use unicorn horn attack!"
    } else {
      return target.apply(context, args);
    }
  }
})
```
