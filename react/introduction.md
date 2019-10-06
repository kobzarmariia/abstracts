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
import React from "react"; // { Component }
import ReactDOM from "react-dom";

class Layout extends React.Component { // Component
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

### Portals (modal windows)

```
class MyPortal extends Component {

  el = document.createElement('div');

  componentDidMount() {
    document.body.createElement('div');
  }

  componentWillUnmount() {
    document.body.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.prop.children, el)
  }
}
```
