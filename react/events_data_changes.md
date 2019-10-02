# Events & Data Changes

## Events

Use camelCase

```
<button onClick={activateLasers}>
  Do smth!
</button>
```

## Default events

You cannot prevent the default event handler by returning false. You must explicitly call preventDefault.

```
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link is clicked');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click on me!
    </a>
  );
}
```

## Bind
reactjs.org recomend bind in the constructor or use the syntax of class fields to avoid performance issues. For example, in the following cases.

```
function ActionLink() {
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

// recomendation
    this.handleClick = this.handleClick.bind(this);
  }

    handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);

```








