# Components

## Functional and Class Components

```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```
This function is a component because it receives data in one object (“props”) as a parameter and returns a React element. We will call such components “functional”, since they are literally functions.

You can also define components as ES6 classes:

```
class Welcome extends React.Component {
  render() {
    return <h1>Привет, {this.props.name}</h1>;
  }
}
```

## Component Composition

Good style create components folder and subfolder for subelements (with the same name).

```
class Welcome extends React.Component {
  render() {
    return <h1>Hi, {this.props.name}</h1>;
  }
}

function App() {
  return (
    <div>
      <Welcome name="Mary" />
      <Welcome name="Lesha" />
      <Welcome name="Natali" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

