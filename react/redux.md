# Redux

![Why we use flux/redux](https://2.bp.blogspot.com/-yj3h5POKq3c/XCCGUoQ0RLI/AAAAAAAAQ88/_5VpIs-O97IT0wKDySPbToD2xOfRO9C2gCLcBGAs/s1600/Bildschirmfoto-2017-12-01-um-08.53.32.png)

![Flux vs Redux](https://miro.medium.com/max/949/1*3lvNEQE4SF6Z1l-680cfSQ.jpeg)

![Redux](https://miro.medium.com/max/1400/0*95tBOgxEPQAVq9YO.png)

Documentation: https://redux.js.org

## Reducers

Reducers specify how the application's state changes in response to actions sent to the store. 
Remember that actions only describe what happened, but don't describe how the application's state changes.

Must be a pure function!
- does not change incoming parameters
- performs only one action


## Actions

Actions are payloads of information that send data from your application to your store. 
They are the only source of information for the store. You send them to the store using store.dispatch().


## Store

The store has the following responsibilities:

- Holds application state;
- Allows access to state via getState();
- Allows state to be updated via dispatch(action);
- Registers listeners via subscribe (listener); 
- Handles unregistering of listeners via the function returned by subscribe(listener). (Observer pattern - callback (subscribe))


How work Redux: store.js
```
export default class Store {
    constructor(updateState, state) {
        this._updateState = updateState;
        this._state = state;
        this._callbacks = [];
    }

    get state() {
        return this._state;
    }

    update(action) {
        this._state = this._updateState(this._state, action);
        this._callbacks.forEach(callback => callback());
    }

    subscribe(callback) {
        this._callbacks.push(callback);
        return () => this._callbacks = this._callbacks.filter(cb => cb !== callback);
    }
}
```

- reducer - state changing function
- dispach - (update)

redux.js
```
export function createStore(reducer = { 0 }, initialState) { //specify by default for reducer
    let state = initialState; 
    let callbacks = [];
    
    const getState = () => state;

    const dispatch = action => {
        state = reducer(state, action);
        callbacks.forEach(callback => callback());
    };

    const subscribe = callback => {
        callbacks.push(callback);
        return () => callbacks.filter(cb => cb !== callback);
    };

    dispath({}); // Error without

    return { getState, dispatch, subscribe };
}
```

## View

```
import React from 'react';
import ReactDOM from 'react-dom';

import {createStore} from 'redux'; //from installed library

const initialState = { count: 0 };

function reducer(state, action) {
    switch (action.type) {
        case 'INCREMENT':  return { count: state.count + action.amount };
        case 'DECREMENT': return { count: state.count - action.amount };
        case 'RESET': return { count: 0 };
        default: return state;
    }
}

//action creators
function increment(amount) {
    return { type: 'INCREMENT', amount };
}

function decrement(amount) {
    return { type: 'DECREMENT', amount };
}

function reset() {
    return { type: 'RESET' };
}
//action creators

const store = new Store(reduser, initialState);

class Counter extends React.Component {
    constructor(props) {
        super(props);

        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
    }

    componentDidMount() {
        store.subscribe(() => this.forceUpdate());
    }

    increment() {
        let amount = parseInt(this.refs.amount.value || 1); //by default
        store.dispatch(increment(amount));
    }

    decrement() {
        let amount = parseInt(this.refs.amount.value || 1); //by default
        store.dispatch(decrement(amount));
    }

    reset() {
        store.dispatch(reset());
    }

    renader() {
        const count = store.getState().count;
        return (
            <div className="counter">
                <span className="count">{count}</span>

                <div className="buttons">
                    <button className="increment" onClick={this.increment}>+</button>
                    <button className="decrement" onClick={this.decrement}>-</button>
                    <button className="reset" onClick={this.reset}>R</button>
                </div>

                <input type="text" ref="amount" defaultValue="1" > //REFERENCE
            </div>
        )
    }
}
```