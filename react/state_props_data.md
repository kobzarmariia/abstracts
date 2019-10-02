# State, Props & Data

## State

```
import React from 'react';

import Footer from './Footer';
import Header from './Header';

export default class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: "Will"};
    }
    render() { 
        setTimeout(() => {
            this.setState({name: Bob});
        })
        return (
            <div>
                {this.state.name}
                <Header />
                <Footer />
            </div>
        );
    }
}
 
export default Layout;
```

Do not change state directly

```
// Wrong
this.state.comment = 'Hi';

// Right
this.setState({comment: 'Hi'});

```

## Props

You can't change props.

```
<Header name={'Some thing'} title={title}/>

// In Header component
<div>`{this.props.name} {this.props.title}`<div/>
```



