# Animation

- dynamic class creation
- using css transition and animation

```
.Modal{
  ...
  transition: all 0.3s ease-out;
}

  .ModalOpen { //dispay: block
    opacity: 1;
    transform: translateY(0);
  }

  .ModalClosed { //dispay: none
    opacity: 0;
    transform: translateY(-100%);
  }

@keyframes openModel {
  0%{
    opacity: 0;
    transform: translateY(-100%);
  }
  50%{
    opacity: 1;
    transform: translateY(90%); //jump (50% - 90% )
  }
  100%{
    opacity: 0;
    transform: translateY(0);
  }
}

//Rewrite .ModalOpen same for .ModalClose

.ModalOpen {
  animation: openModal 0.4s ease-out forwards; //forward - not repeat
}

```

But modal pages always in DOM!

Decision:

```
 {this.state.modalIsOpen ? <Backdrop show /> : null}
```

But for modal it is bad desition (React not waiting for close animation)

Decision:

- connecting third-party libraries

in App.js add Transition component from react-transition-group

There are 4 main states a Transition can be in:

'entering' - 'entered'
'exiting' - 'exited'

```
import Transition from 'react-transition-group/Transition'

<Transition
  in={this.state.showBlock} //if in showBlock - true (visible) timeout - how long
  timeout={1000}
  mountOnEnter
  unMountOnExit> //remove from DOM
  {state => <p
  style={{opacity: state === 'exiting' ? 0 : 1, transition: 'opacity 1s ease-out'
   }}>{state}</p>} //state - exiting (depending state change  style)
</Transition>
```

Example for Modal

```
<Transition
mountOnEnter
unmountOnExit
in={this.state.modalIsOpen} //props.show
timeout={300}
>
{state => (<Modal show={state} closed={this.closeModal} />)}
</Transition>

const modal = props => {
  const cssClasses = [
    "Modal",
    props.show === 'entering'
    ? "ModalOpen"
    : props.show === 'exiting' ? "ModalClosed" : null
  ]
}
```

Backdrop UI component:

```
import React from 'react';

import './Backdrop.css';

const backdrop = (props) => {
    const cssClasses = ['Backdrop', props.show ? 'BackdropOpen' : 'BackdropClosed']; //checkIsBackdropOpen

    return <div className={cssClasses.join(' ')}></div>;
};

export default backdrop;
```

Modal UI component:
If we wanter diferent timint in enter or exit add animationTiming.
Change className(s) without conditionals use classNames arg. (CSSTransition)

```
import React from "react";
import CSSTransition from "react-transition-group/CSSTransition";

import "./Modal.css";

const animationTiming = {
    enter: 400,
    exit: 1000
};

const modal = props => {
  return (
    <CSSTransition
        mountOnEnter
        unmountOnExit
        in={props.show} //check modalIsOpen
        timeout={animationTiming}
        classNames={{   //"fade-slide" fade-slide-enter fade-slide-enter-active fade-slide-exit fade-slide-exit-active
            enter: '',  //custom classNames
            enterActive: 'ModalOpen',
            exit: '',
            exitActive: 'ModalClosed'  //+ appear appearActive
        }}>
          <div className="Modal">
            <h1>A Modal</h1>
            <button className="Button" onClick={props.closed}>  //close Modal
              Dismiss
            </button>
          </div>
    </CSSTransition>
  );
};

export default modal;
```

CSS

```
.Modal {
    position: fixed;
    z-index: 200;
    border: 1px solid #eee;
    box-shadow: 0 2px 2px #ccc;
    background-color: white;
    padding: 10px;
    text-align: center;
    box-sizing: border-box;
    top: 30%;
    left: 25%;
    width: 50%;
    transition: all 0.3s ease-out;
}

.ModalOpen {
    animation: openModal 0.4s ease-out forwards;
}

.ModalClosed {
    animation: closeModal 1s ease-out forwards;
}

.fade-slide-enter {  //classNames="fade-slide"

}

.fade-slide-enter-active {
    animation: openModal 0.4s ease-out forwards;
}

.fade-slide-exit {

}

.fade-slide-exit-active {
    animation: closeModal 1s ease-out forwards;
}

@keyframes openModal {
    0% {
        opacity: 0;
        transform: translateY(-100%);
    }
    50% {
        opacity: 1;
        transform: translateY(90%);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes closeModal {
    0% {
        opacity: 1;
        transform: translateY(0);
    }
    50% {
        opacity: 0.8;
        transform: translateY(60%);
    }
    100% {
        opacity: 0;
        transform: translateY(-100%);
    }
}
```

App.js (Transition component )

```
import React, { Component } from "react";
import Transition from "react-transition-group/Transition";

import "./App.css";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";

class App extends Component {
  state = {
    modalIsOpen: false, //in the begining
    showBlock: false
  };

  showModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    return (
      <div className="App">
        <h1>React Animations</h1>
        <button
          className="Button"
          onClick={() =>
            this.setState(prevState => ({ showBlock: !prevState.showBlock }))}
        >
          Toggle
        </button>
        <br />
        <Transition
          in={this.state.showBlock}
          timeout={1000}
          mountOnEnter
          unmountOnExit
          onEnter={() => console.log('onEnter')}
          onEntering={() => console.log('onEntering')}
          onEntered={() => console.log('onEntered')}
          onExit={() => console.log('onExit')}
          onExiting={() => console.log('onExiting')}
          onExited={() => console.log('onExited')}
        >
          {state => (
            <div
              style={{
                backgroundColor: "red",
                width: 100,
                height: 100,
                margin: "auto",
                transition: "opacity 1s ease-out",
                opacity: state === "exiting" ? 0 : 1
              }}
            />
          )}
        </Transition>
        <Modal show={this.state.modalIsOpen} closed={this.closeModal} />  //Attention
        {this.state.modalIsOpen ? <Backdrop show /> : null} //Attention (if modal open)
        <button className="Button" onClick={this.showModal}>
          Open Modal
        </button>
        <h3>Animating Lists</h3>
        <List />
      </div>
    );
  }
}

export default App;
```

TransitionGroup use in lists (use with Transition)

```
import React, { Component } from "react";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition";

import "./List.css";

class List extends Component {
  state = {
    items: [1, 2, 3]
  };

  addItemHandler = () => {
    this.setState(prevState => {
      return {
        items: prevState.items.concat(prevState.items.length + 1)
      };
    });
  };

  removeItemHandler = selIndex => {
    this.setState(prevState => {
      return {
        items: prevState.items.filter((item, index) => index !== selIndex)
      };
    });
  };

  render() {
    const listItems = this.state.items.map((item, index) => (
      <CSSTransition key={index} classNames="fade" timeout={300}>
        <li
          className="ListItem"
          onClick={() => this.removeItemHandler(index)}>
          {item}
        </li>
      </CSSTransition>
    ));

    return (
      <div>
        <button className="Button" onClick={this.addItemHandler}>
          Add Item
        </button>
        <p>Click Item to Remove.</p>
        <TransitionGroup component="ul" className="List">  //choose component
          {listItems}
        </TransitionGroup>
      </div>
    );
  }
}

export default List;
```

## Alternatives

### React-Motion

Real world phisics (for hard animation)

https://github.com/chenglou/react-motion

### React-Move

https://react-move.js.org/#/

Complex animations

### React router transition (Animated Switch)

https://www.npmjs.com/package/react-router-transition
