# Redux

![Why we use flux/redux](https://2.bp.blogspot.com/-yj3h5POKq3c/XCCGUoQ0RLI/AAAAAAAAQ88/_5VpIs-O97IT0wKDySPbToD2xOfRO9C2gCLcBGAs/s1600/Bildschirmfoto-2017-12-01-um-08.53.32.png)

![Flux vs Redux](https://miro.medium.com/max/949/1*3lvNEQE4SF6Z1l-680cfSQ.jpeg)

Redux 
- has only one state
- stor only for reading
- clear functions (action, reducers) manupulated date inside himself and return new data 

Add module: redux, react-redux

![Redux](https://miro.medium.com/max/1400/0*95tBOgxEPQAVq9YO.png)

Documentation: https://redux.js.org

Application state and interface management

## ToDo List

index.js
```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './24_redux_todo_app/App.js';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './24_redux_todo_app/store';

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));
registerServiceWorker();
```

App.js (root component)
```
import React, { Fragment } from 'react';

import ToDo from './containers/todo/todo';
import Title from './components/title/title';

const App = () => (
  <Fragment>
    <Title title="ToDo App" />
    <ToDo />
  </Fragment>
);

export default App;
```

constants.js
```
export const ADD_TASK = 'ADD_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';
export const COMPLETE_TASK = 'COMPLETE_TASK';
export const CHANGE_FILTER = 'CHANGE_FILTER';
```

### Containers (folder)

Same component where we connect to redux and manipulating with data and where we can do request to another (Business logic)

Folder todo - + todo.css

todo.jsx (import - input, list, footer components)
```
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addTask } from '../../actions/actionCreator'

class ToDo extends Component {
    state = {
        activeFilter: 'all', //filter tag
        taskText: ''
    }

    handleInputChange = ({ target: { value }}) => {
        this.setState({
            taskText: value,
        })
    }

    addTask = ({ key }) => {
        const { taskText } = this.state;

        if (taskText.length > 3 && key === 'Enter') {
            const { addTask } = this.props;

            addTask((new Date()).getTime(), taskText, false);

            this.state({
                taskText: '',
            })
        }

    render() {
        const { activeFilter, taskText } = this.state;
        const { tasks } = this.prop;
        const tasksList = [];
        const isTasksExist = taskList && taskList.length > 0;

        return (
            <div className="todo-wrapper">
                <ToDoInput onKeyPress onChange={this.handleInputChange} value={taskText}/> 
                {isTaskExist && <ToDoList taskList={tasks} >}
                {isTaskExist && <Footer amount={tasks.length} activeFilter={activeFilter} >}
            </div>
        );
    }
}

export default connect(state => ({
    tasks: state.tasks,
}), { addTask })(ToDo);
```

### Components (folder)

footer.jsx
```
import React from 'react';
import PropTypes from 'prop-types';

import './footer.css';

const FILTERS_BTN = [
  {
    text: 'All',
    id: 'all',
  },
  {
    text: 'Active',
    id: 'active',
  },
  {
    text: 'Completed',
    id: 'completed'
  }
];

const Footer = ({ amount, activeFilter, changeFilter }) => (
  <div className="footer">
    <span className="amount">{`${amount} Tasks left`}</span>
    <div className="btn-group">
      {FILTERS_BTN.map(({ text, id }) => (
        <button
          onClick={() => {changeFilter(id)}}
          key={id}
          className={id === activeFilter ? "filter-btn active" : 'filter-btn'}
        >{text}</button>
      ))}
    </div>
  </div>
);

Footer.propTypes = {
  amount: PropTypes.number,
  activeFilter: PropTypes.string,
  changeFilter: PropTypes.func,
}

Footer.defaultProps = {
  changeFilter: () => {},
  amount: 0,
  activeFilter: 'all',
}

export default Footer;
```

title.jsx
```
import React from 'react';
import PropTypes from 'prop-types';

import './title.css';

const Title = ({ title }) => (
  <h1 className="title">{title}</h1>
);

Title.propTypes = {
  title: PropTypes.string,
}

Title.defaultProps = {
  title: 'Simple title',
}

export default Title;
```

todo-input.jsx
```
import React from 'react';
import PropTypes from 'prop-types';

import './todo-input.css';

const ToDoInput = ({ value, onChange, onKeyPress }) => (
  <div className="todo-input-wrapper">
    <i className="fas fa-plus" />
    <input
      className="todo-input"
      placeholder="Click to add task"
      onChange={onChange}
      value={value}
      onKeyPress={onKeyPress}
    />
  </div>
);

ToDoInput.propTypes = {
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  value: PropTypes.string,
}

ToDoInput.defaultProps = {
  onChange: () => {},
  onKeyPress: () => {},
  value: '',
}

export default ToDoInput;
```

todo-list.jsx
```
import React from 'react';
import PropTypes from 'prop-types';

import ToDoItem from '../todo-item/todo-item';

import './todo-list.css';

const ToDoList = ({ tasksList, removeTask, completeTask }) => (
  <ul className="todo-list">
    {tasksList.map(({ id, text, isCompleted }) => (
      <ToDoItem completeTask={completeTask} removeTask={removeTask} id={id} key={id} text={text} isCompleted={isCompleted} />
    ))}
  </ul>
);

ToDoList.propTypes = {
  tasksList: PropTypes.array,
  removeTask: PropTypes.func,
  completeTask: PropTypes.func,
}

ToDoList.defaultProps = {
  tasksList: [],
  removeTask: () => {},
  completeTask: () => {},
}

export default ToDoList;
```

todo-item.jsx

```
import React from 'react';
import PropTypes from 'prop-types';

import './todo-item.css';

const ToDoItem = ({ text, isCompleted, removeTask, id, completeTask }) => (
  <li className="todo-item">
    <i onClick={() => completeTask(id)} className={isCompleted ? 'mark far fa-check-circle' : 'mark far fa-circle'} />
    <span className={isCompleted ? 'completed text' : 'text'}>{text}</span>
    <i onClick={() => removeTask(id)} className="fas fa-times" />
  </li>
);

ToDoItem.propTypes = {
  text: PropTypes.string,
  isCompleted: PropTypes.bool,
  removeTask: PropTypes.func,
  id: PropTypes.number,
}

ToDoItem.defaultProps = {
  text: '',
  isCompleted: false,
  removeTask: () => {},
  id: 0,
}

export default ToDoItem;
```
#### Add REDUX

index.js (Provider)
```
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './../store';

ReactDOM.render((
    <Provider store={store}> //accepts store (state) wraps the entire application
        <App />
    </Provider>
), document.getElementById('root'));
```

store.js (createStore, compose)
```
import { createStore, compose } from 'redux';
import rootReducer from './reducers/index';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = //if application in dev mode - add redux devtool
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
/* eslint-enable */

const configureStore = preloadedState => (
    createStore( // create store here
        rootReduser,
        preloadedState, //initial state
        composeEnhancers() 
    )
)

const store = configureStore({});
```

### Reducers (folder)

divide by tasks 

index.js
```
import { combineReducers } from 'redux';
import tasks from './tasks';
import filters from './filters';

const rootReducer = combineReducers({ tasks, filters });

export default rootReducer;

```

tasks.js (clean function)
```
import { ADD_TASK, REMOVE_TASK, COMPLETE_TASK } from '../../constants';
import { load } from 'redux-localstorage-simple';

let TASKS = load({ namespace: 'todo-list' });

if (!TASKS || !TASKS.tasks || !TASKS.tasks.length) {
  TASKS = {
    tasks: [],
  }
}
/*
const TASKS = [
  {
    id: 1,
    text: 'Learn ReactJS',
    isCompleted: true,
  },
  {
    id: 2,
    text: 'Learn Redux',
    isCompleted: false,
  },
  {
    id: 3,
    text: 'Learn React Router',
    isCompleted: false,
  }
];*/

const tasks = (state = TASKS.tasks, { id, text, isCompleted, type }) => {
  switch (type) {
    case ADD_TASK :
      return [
        ...state, {
          id,
          text,
          isCompleted,
        }
      ];
    case REMOVE_TASK:
        return [...state].filter(task => task.id !== id);
      case COMPLETE_TASK:
          return [...state].map(task => {
            if(task.id === id) {
              task.isCompleted = !task.isCompleted;
            }
            return task;
          });
    default:
      return state;
  }
}

export default tasks;
```

filters.js
```
import { CHANGE_FILTER } from '../../constants';

const BASE_FILTER = 'all';

const filter = (state = BASE_FILTER, { type, activeFilter }) => {
  switch (type) {
    case CHANGE_FILTER:
      return activeFilter;
      break;
    default:
      return state;
  }
}

export default filter;
```

### Actions (folder)

actionCreator.js
```
import { ADD_TASK, REMOVE_TASK, COMPLETE_TASK, CHANGE_FILTER } from '../../constants';

export const addTast = (id, text, isCompleted) => ({
  type: ADD_TASK,
  id,
  text,
  isCompleted
});

export const removeTask = id => ({
  type: REMOVE_TASK,
  id
});

export const completeTask = id => ({
  type: COMPLETE_TASK,
  id
});

export const changeFilter = activeFilter => ({
  type: CHANGE_FILTER,
  activeFilter,
})
```

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