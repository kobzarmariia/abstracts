# Animation

- dynamic class creation
- connecting third-party libraries

Library 'react-transition-group' 

https://reactcommunity.org/react-transition-group/

```
import { TransitionGroup, CSSTransition } from 'react-transition-group';
```

Example:

```
import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from "react-transition-group";

import './styles.css';

class Lesson extends React.Component {
  state = {
    isLogoVisible: false
  };

  toggleLogo = () => {
    this.setState({
      isLogoVisible: !this.state.isLogoVisible
    });
  };

  render() {
    const { isLogoVisible } = this.state;
    return (
      <div className="wrapper">
        <div>
          <h2>Do you want to see React logo?</h2>
          <input type="radio" name="logo" checked={isLogoVisible} onChange={this.toggleLogo} />Yes
          <input type="radio" name="logo" checked={!isLogoVisible} onChange={this.toggleLogo} />No
        </div>
        <TransitionGroup>
          {isLogoVisible && (
            <CSSTransition classNames="option">
              <div>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/640px-React-icon.svg.png" />
              </div>
            </CSSTransition>
          )}
        </TransitionGroup>
      </div>
    );
  }
}

export default Lesson;
```

styles.css

```
.option-enter {
  opacity: 0;
}
.option-enter.option-enter-active {
  opacity: 1;
  transition: opacity 2s ease;
}
.option-exit {
  opacity: 1;
}
.option-exit.option-exit-active {
  opacity: 0;
  transition: opacity 2s ease;
}
```

## Animation life cicle
