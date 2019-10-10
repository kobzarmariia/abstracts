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

- independent part of the application
- contains a piece of logic
- describes his view
- can be used many times

Stateful (Containers)
class XY extends Component

- Access to state
- Lifecycle hooks
- Access State and Props via 'this'

```
import React from "react"; // { Component }
import ReactDOM from "react-dom";

class Layout extends React.Component { // Component
  state = {
    persons: [
      {...}
    ]
  }

  nameChangedHandeler = (event, id) => {
    ...
  }

    render() {
        return (
            <h1>Hello World<\h1>
        );
    }
}

const app = document.getElementById('app');

ReactDOM.render(<Layout/>, app);
```

Functional component (try to use them as often as possible)

Stateless
const XY = (props) => {...}

- access props via 'props'

```
const persons = (props) => props.persons.map((person, index) =>
  return <Person
    click={() => props.clicked(index)}
    name={person.name}
    age={person.age}
    key={person.id}
    changed={(event) => props.changed(event, person.id)}
  />
);

export default persons;
```

#### High Order Components

Extending the functionality of a component by wrapping it in HOK

If everywhere repeats (for example same className):

```
const AppLink = (props) => ({
  render: () => (
    <Link {...props} activeClassName="active" />
  )
})

class Lesson extends Component {
  render() {
    return (
      <Router>
        <nav>
          <AppLink to='/'>Home</AppLink>
          <AppLink to='/portfolio'>Portfolio</AppLink>
        </nav>
      </Router>
    )
  }
}
```

Preloader

```
const isEmpty = (prop) => (
  prop === null ||
  prop === undefined ||
  (prop.hasOwnProperty('length') && prop.length === 0 ) ||
  (prop.constructor === Object && Object.keys(prop).length === 0)
);

const LoadingHOC = (loadingProp) => (WrappedComponent) => {
  return class LoadingHOC extends Component {
    render () {
      return isEmpty(this.props[loadingProp]) ?
      <div className="loader" />
      : <WrapperComponent {...this.props} />
    }
  }
}

class AppComponentUI extends Component {
  render() {
    return (
      <div>{this.props.data.title}</div>
    );
  }
}

const AppComponent = LoadingHOC('data')(AppComponentUI);

class Lesson extends Component {
  state = {
    data: {},
  }

  componentDidMount() {
    fetch('http:...')
    .then(response => response.json())
    .then(response => this.updateState(data))
  }

  updateState = (data) => {
    window.setTimeout(() => {
      this.setState({ data })
    });
  }

  render() {
    return (
      <AppComponent data={this.state .data}>
  }
}

```

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

### Сonditional rendering

Inside JSX we cant use (if else) syntax

Logical multiplication

```
{val && <span>We have val</span>}
```

Ternary operator

```
{val >= 10 ? <h2>Grate than 10</h2> : <h3>Less than <em>10</em></h3>}
```

Tabs

```
handleTab = (e) => {
  this.setState({
    activeTab: +e.target.getAttribute('data-name'),
  })
}

render() {
  const { activeTab } = this.state
  return (
    <Fragment> // !invisible wrapper
      <button data-name={1} onClick={this.handleTab}>Tab1</button> //bad style
      <button data-name={2} onClick={this.handleTab}>Tab2</button>
      <button data-name={3} onClick={this.handleTab}>Tab3</button>
      {activeTab === 1 ? <Tab1 /> : activeTab === 2 ? <Tab2 /> : <Tab3 />}
    </Fragment>
  )
}
```

### List & key

Unique property - key

```
const TABS_BTN = [
  {
    dataName: 1,
    title: 'Tab1',
  },
  {
    dataName: 1,
    title: 'Tab2',
  }
  ...
]

{TABS_BTN.map(({ dataName, title}) => { //method map
  <button
    key={`${dataName}-${title}`} //generate unique property (1-Tab1)
    data-name={dataName}
    onClick={this.handleTab}
  >{title}</button>
})}
```

### Style

```
import './styles.css';
const styles = {color: 'red', textTransform: 'uppercase'}

<button style={{color: 'red', textTransform: 'uppercase'}}></button>
<button style={styles}></button>
<button className='import-style'></button>
```

We can apply styles dynamically.
Inside render by condition.

```
if (..)
style[':hover'] = {
BackgroundColor: 'salmon',
Color: 'black'
}
```

npm run eject
(add config folder)

webpack.config.dev

```
test: /\.css$/,
...
options: {
  importLoaders: 1,
  modules: true,
  localIdentName: '[name]__[local]__[hash:base64:5]'
}
```

add same to config prod file!

Then you can ude uniq class names.

```
import classes from './App.css'

className = {classes.App}
```

#### Radium

npm i radium

```
import React, { Component } from "react";
import "./App.css";
import Radium, { StyleRoot } from "radium";  //that`s because i use
import Person from "./Person/Person";

class App extends Component {
  ...
render() {
    const style = {
      backgroundColor: "green",
      color: "white",
      font: "inherit",
      border: "1px solid blue",
      padding: "8px",
      cursor: "pointer",
      ":hover": {
        backgroundColor: "lightgreen",
        color: "black"
      }
    };

    let persons = null;

    if (this.state.showPersons) {
      ...
      style.backgroundColor = "red";
      style[":hover"] = {  //attention
        backgroundColor: "salmon",
        color: "black"
      };
    }

    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push("red"); // classes = ['red']
    }
    if (this.state.persons.length <= 1) {
      classes.push("bold"); // classes = ['red', 'bold']
    }

    return (
      <StyleRoot>
        <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p className={classes.join(" ")}>This is really working!</p>
          <button style={style} onClick={this.togglePersonsHandler}>
            Toggle Persons
          </button>
          {persons}
        </div>
      </StyleRoot>
    );
  }
}

export default Radium(App);
```

Media query

```
import React from 'react';
import Radium from 'radium';

import './Person.css';

const person = ( props ) => {
    const style = {
        '@media (min-width: 500px)': {
            width: '450px'
        }
    };
    return (
        <div className="Person" style={style}>
            <p onClick={props.click}>I'm {props.name} and I am {props.age} years old!</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name} />
        </div>
    )
};

export default Radium(person);
```

### Portals (modal windows)

```
class MyPortal extends Component {

  el = document.createElement('div');

  componentDidMount() {
    document.body.createElement('div'); //where
  }

  componentWillUnmount() {
    document.body.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, el)
  }
}


// <MyPortal><span>TEXT</span></MyPortal>
```

### Context

Before - passed on props from parent to child element
Context - skips intermediate levels
As an option to solve the problem - Redux

```
const TitleContext = React.createContext(); //create context

const LevelThree = () => (
  <TitleContext.Consumer>
    { title => <h1>{title}</h1>}   //({ title, subtitle }) => ( <Fragment> <h1>{title}</h1> <h1>{subtitle}</h1> </Fragment>)
  </TitleContext.Consumer>
)
const LevelTwo = () => <LevelThree />
const LevelOne= () => <LevelTwo />

class Lesson etends Component {
  render () {
    return (
      <TitleContext.Provider value="Simple title"> //in value transmit object {{ title: 'One', subtitle: 'Two' }}
        <LevelOne />
      </TitleContext.Provider >
    );
  }
}
```

### Debugging

Sources tab - F12 - debug
Add breackpoint - data in object (can check)

Current state of components or props - react-devtool (you can check component)

On finction body:

```
if (condition) {
  throw new Error('Smth wrong');
}
```

Add ErrorBoudary (if that code can ahve some problem)

```
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  state = {
    hasError: false;
    errorMessage: ''
  }

  componentDidCatch = (error, info) => {
    this.setState({hasError: true, errorMessage: error});
  }

  render() {
    if (this.state.hasError){
      return <h1>{this.state.errorMessage}</h1>;
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;

// than wrap component

<ErrorBoundary>
  <Person ... />
</ErrorBoundary>
```
