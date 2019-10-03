# Components 

## Functional and Class Components

```
function Welcome(props) {
  return <h1 className="Title" style={{backgroundColor: "#44014C", color: "white"}} >Hello, {props.name}</h1>;
}
```
This function is a component because it receives data in one object (“props”) as a parameter and returns a React element. We will call such components “functional”, since they are literally functions.

You can also define components as ES6 classes:

```
class Welcome extends React.Component {
  render() {
    return <h1 className="Title" style={{backgroundColor: "#44014C", color: "white"}} >Привет, {this.props.name}</h1>;
  }
}
```

### Props and data transfer

```
import React from 'react';

function Article(props) {
    const {article} = props;
    const body = <section>{article.text}</section>
        return (
            <div>
                <h2>title</h2>
                {body}
                <h3>Creation date: {(new Date()).toDateString()}</h3>
            </div>
        );
}
 
export default Article;

<Article article={data}/>
```

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
    constructor(props){
        super(props)

        this.state = {
            isOpen: false
        }

        this.handleClick = handleClick.bind(this);
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

    handleClick = () => {
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







