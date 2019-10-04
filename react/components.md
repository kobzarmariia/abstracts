# Components 

## Functional and Class Components (statefull and stateless)

```
function Welcome(props) {
  return <h1 className="Title" style={{backgroundColor: "#44014C", color: "white"}} >Hello, {props.name}</h1>;
}
```
This function is a component because it receives data in one object (“props”) as a parameter and returns a React element. We will call such components “functional”, since they are literally functions.

You can also define components as ES6 classes:

```
class Welcome extends Component {
  render() {
    return <h1 className="Title" style={{backgroundColor: "#44014C", color: "white"}} >Привет, {this.props.name}</h1>;
  }
}
```

### Props and data transfer

! Do not change external variables and do not change what comes in props !

```
import articles from '../fixtures'

articles = articles.slice()
```

! Good style working with immutable data !
 For example, an array is an object and upon transfer as props (PureComponent) doesn't see a change.

 ```
import articles from '../fixtures'

<ArticleList articles={this.state.reverted ? articles.slice().reverse() : articles}>

revert = () => {
    this.setState({
        reverted: !this.state.reverted
    })
}
```

#### Prop types (props validation) and default props

```
import PropTypes from 'prop-types'

const Counter = ({ counter, func, string, number }) => { //destruction (dood style)
    console.log(props);
    return <h1>(`Counter component. Counter value is: ${props.counter}`)</h1> //values will be dynamically updated
} 

Counter.propTypes = {
    counter: PropTypes.number.isRequired, //Required props
    func: PropTypes.func,
    number: PropTypes.number,
    string: PropTypes.string,
}

Counter.defaultProps = { //!for optional props
    func: () => {},
    number: 0,
    string: '',
}
```

and other types:

```
Сomponent.propTypes = {
    node: PropTypes.node, //what can be rendered (numbers, strings) 
    children: PropTypes.element, //another element ! <Lesson><Counter /></Lesson> (always it is can be children)
    instance: PropTypes.instanceOf(Constructor), //for example Date
    elem: PropTypes.oneOf(['val1', 'val2']), 
    elem: PropTypes.oneOfType({ 
        PropTypes.string,
        PropTypes.number,
    }),
    array: PropTypes.arrayOf(PropTypes.string), //array of string 
    object: PropTypes.objectOf(PropTypes.number), //object of number
    obj: PropTypes.shape({ //object (whith their field)
        color: PropTypes.string,
        fontSize: PropTypes.number,
        lineHeight: PropTypes.number,
    }),
}
```

{Recat.cloneElement(children, {counter: this.state.counter})}

### Class component

Good style create components folder and subfolder for subelements (with the same name).

```
import React, {Component} from 'react';

class Article extends Component {
    render() {
        const {article} = this.props; //attention this.props
        const body = <section>{article.text}</section>
            return (
                <div>
                    <h2>title</h2>
                    {body}
                    <h3>Creation date: {(new Date()).toDateString()}</h3>
                </div>
            );
    }
}

export default Article;
```

#### State (state change)

Recommended style:

```
import React, {Component} from 'react';

class Article extends Component {
    constructor(props){  // but here we can bind state with props
        super(props)

        this.state = {
            isOpen: false
        }

        this.handleClick = handleClick.bind(this); // bind context here
    }

    render() {
        const {article} = this.props; // destruction
        const body = this.state.isOpen && <section>{article.text}</section>;
            return (
                <div>
                    <h2>
                        {article.title}
                        <button onClick={handleClick}>
                            {this.state.isOpen ? 'close' : 'open'}
                        </button>
                    </h2>
                    {body}
                    <h3>Creation date: {(new Date()).toDateString()}</h3>
                </div>
            );
    }

    function handleClick() {
        this.setState({
            isOpen: !this.stat.isOpen
        });
    }
}

export default Article;
```

Experiental style:

```
import React, {Component} from 'react';

class Article extends Component {
    state = {
        isOpen: true
    }

    render() {
        const {article} = this.props;
        const body = this.state.isOpen && <section>{article.text}</section>;
            return (
                <div>
                    <h2>
                        {article.title}
                        <button onClick={handleClick}>
                            {this.state.isOpen ? 'close' : 'open'}
                        </button>
                    </h2>
                    {body}
                    <h3>Creation date: {(new Date()).toDateString()}</h3>
                </div>
            );
    }

    handleClick = () => { // without bind, use arrow function 
        this.setState({
            isOpen: !this.stat.isOpen
        });
    }
}

export default Article;

```

Do not change state directly

```
// Wrong
this.state.comment = 'Hi';

// Right
this.setState({comment: 'Hi'});

```

If we make a setState() at the top of the virtual tree - the entire application is rebuilt.

#### Default events

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
#### Reverse data flow

Child element changes state of parent. Pass method to child.

#### State raising

We transfer all the state to the parent and pass it to the child as props.







