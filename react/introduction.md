# Introduction

## React is a JavaScript library for building user interfaces.

### Workspace Setup

Create React App is a comfortable environment for learning React, and is the best way to start building a new single-page application in React.

```
npx create-react-app my-app
cd my-app
npm start
```

Or you can set up enviroment by yourself.
Use Babel, Webpack...

### Component

The core of React is everything is a component.

```
import React from "react";
import ReactDOM from "react-dom";

class Layout extends React.Component {
    render() {
        return (
            <h1>Hello World<\h1>
        );
    }
}

const app = document.getElementById('app');

ReactDOM.render(<Layout/>, app);
```

- independent part of the application
- contains a piece of logic
- describes his view
- can be used many times

### JSX

JSX it is a syntax extension to JavaScript.
In the example below, we declare a variable called name and then use it inside JSX by wrapping it in curly braces:

```
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```
After compilation, each JSX expression becomes a normal JavaScript function call, the result of which is a JavaScript object.

```
const element = (
  <h1 className="greeting">
    Hi
  </h1>
);

const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hi'
);
```