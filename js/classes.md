# Classes

## Classes vs Prototype

Before

```
  var Employee = function() {} ; //constructor function

  Employee.prototype = {
    doWork: function() {  //acces from every object
      return "complete!";
    },

    getName: function() {
      return "Scott";
    }
  };

  var e = new Employee();
  expect(e.doWork()).toBe("complete!");
```

ES6

```
  class Employee {

    constructor(name) {
      this._name = name;
    }

    doWork() {
      return "complete!";
    }

    getName() {
      return this._name;
    }
  }

  let e = new Employee("Scott");

  expect(e.doWork()).toBe("complete!");
  expect(e.getName()).toBe("Scott");
```

## Getter and Setter (incapsulation, add validation, changing data)

```
  class Employee {

    constructor(name) {
      this.name = name; //this._name = name;
    }

    doWork() {
      return "complete!";
    }

    get name() {
      return this._name.toUpperCase;
    }

    set name(newValue) {
      // if (newValue){}
      this._name = newValue;
    }
  }

  let e = new Employee("Scott");

  e.name;
  e.name = "Chris";
```

## Inheritance (reuse) + super + instanceof

Employee is a Person
Circle is a Shape
Car is a Vehicle
Car is a Engine (NO Car has a Engine)

```
  class Person { //extends Object
    constructor(name) {
      this.name = name;
    }

    get name() {
      return this._name;
    }

    set name(newValue) {
      if (newValue){
        this._name = newValue;
      }
    }

    doWork() {
      return `${this.name} is working!`;
    }

    toString() {
      return this.name;
    }
  }

  let e = new Employee("Scott");

  e.toString();

  class Employee extends Person {
    constructor(name, title) {
      super(name);  //Person constructor or this.name = name; (but in Repson can be validaton)
      this._title = title;
    }

    get title() {
      return this._title;
    }

    doWork() {
      super(); //looking for doWork return super() + "paid";
      //super.doWork();
      return `${this._title}`;
    }
  }

  let makeEveryoneWork = function(...people){
  var results = [];
  for (var i = 0; i < people.length; i++) {
    if(people[i] instanceof Person){        // if(people[i].doWork)
      results.push(people[i].doWork());
    }
  };
    return results;
  }

  expect(makeEveryoneWork(p1, e1, {})).toEqual(["free", "paid"]);
```
