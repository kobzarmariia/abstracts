# Life Cycle

## React lifecycle methods +16.3

http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

### New methods

getDerivedStateFromProps - replacement componentWillReceiveProps

sync state & props

getSnapshotBeforeUpdate - phase before changes in VDOM

## React lifecycle methods less 16.3

![Life cycle React image](https://hackernoon.com/hn-images/1*sn-ftowp0_VVRbeUAFECMA.png)

### Initialization

The component is setting up the initial state in the constructor, which can be changed later by using thesetState method.

### Mounting

Used to send requests to receive data.
But he didn’t have time to execute and the rendering is performed 2 times.

componentWillMount() (!deprecated)
It is usually used to obtain the necessary data (from the server)
Server - Website Rendering
componentDidMount()
It is usually used to respond to data occurrences or hang liceners.
Client - Website Rendering
only called once, good for sideeffect (request)

### Updation (statte & props)

componentWillReceiveProps(nextProps) (!deprecated)
It is usually used:

- when we tied state with props
- article arrived and you need to download data from the server

```
//Article class start
constructor(props) {
    super(props)

    this.state = {
        isOpen: props.defaultOpen //props to state
    }
}
componentWillReceiveProps(nextProps) {
    if (nextProps.defaultOpen !== this.props.defaultOpen) this.setState({
        isOpen: nextProps.defautOpen
    })
}
//Article class end

import React from 'react';
import Article from '../Article';

export default function ArticleList({ articles }) {
    const articleElements = articles.map([article, index] =>
        <li key={article.id} className="arrticle-list_li">
            <Article article = {article} defaulOpen = {index === 0}/> //true only when index equal zero
        </li>
    )
    return (
        <ul>
            {articleElements}
        </ul>
    )
}
```

shouldComponentUpdate(nextProps, nextState, nextContext)

Do we need to rebuild a virtual DOM for this component or not.
Allows you to optimize components! (can`t use setState())

```
// add in Article
shouldComponentUpdate(nextProps, nextState) {
    return this.state.isOpen !== nextState.isOpen //willUpdate we call only when it is necessary
}
```

But there can be a conflict (we must track all changes props and state). Can be used PureComponent (class Article extends PureComponents).
He implements a method shouldComponentUpdate.

componentWillUpdate(nextProps, nextState) (!deprecated)
Now we will rebuild, we have ready props and state
queries should not be written

componentDidUpdate(prevProps, prevState, nextContext)
only one (side effect here it's OK)

### Unmounting

componentWillUnmount()
Сlear subscriptions
Clear set timeout set interval

```
componentDidMount() {
              this.timerId = setInterval(
                ()=> this.tick(),
                1000
              );
            }

componentWillUnmount() {
              clearInterval(this.timerId);
            }
```
