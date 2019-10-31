# Modules

Hide information

## An IIFE Module

- organize
- controll visibility

```
(function(target) {

  var privateDoWork = function(name){
    return name + " is working";
  };

  var Employee = function(name){
    this.name = name;
  };

  Employee.prototype = {
    doWork: function() {
      return privateDoWork(this.name);
    }
  }

  target.Employee = Employee; //exports.Employee = Employee;

}(window));
```

## Common JS

```
var Employee = require("./Employee").Employee;

var e1 = new Employee("Scott");
console.log(e1.doWork());
```

## AMD

```
// employee.js

define(function(){
  var privatedoWork = function () {...};

  var Employee = function (name) {...};

  return Employee;
})


define(["employee"], function(Employee){
  var e = new Employee("Scott");
})
```

## ES6 Modules

```
export class Employee {
	constructor(name) {
		this._name = name;
	}

	get name() {
		return this._name;
	}

	doWork() {
		return `${this._name} is working`;
	}
}
```

```
import {Employee} from './es/employee.js';

var e = new Employee("Scott");
e.doWork();
```

default

```
export default class Employee{...}

import factory from "./... "
```

## Hiding the details

```
let privateFunction = function() {...}

let s_name = Symbol();

export class Employee {
	constructor(name) {
		this[s_name] = name;   //this._name = name; -> problem is e._name = "Joy";
	}

	get name() {
		return this[s_name]; //this._name;
	}

	doWork() {
		return `${this.name} is working`;
	}
}
```

Symbol

```
let id1 = Symbol("id");
let id2 = Symbol("id");

alert(id1 == id2); // false
```

Company.js

```
import {Employee} from "./employee";

export class Company {
	hire(...names) {
		this.employees = names.map(
			n => new Employee(n));
	}
	doWork() {
		return [for (e of this.employees) e.doWork()];
	}
}
```

main.js

```
import {Company} from "./company";

let company = new Company();
company.hire("Joy", "Sue", "Tim", "Tom");
document.write(company.doWork());  //"Joy is working,Sue is ..."
```

```
import "./es6/main";
```
