# Hooks

New way to write react components.
Manage state in react functional component.
Hooks are functions with which you can “hook” to the state and methods of the React life cycle from functional components.
Hooks do not work inside classes - they give you the ability to use React without classes.

Hooks are JavaScript functions that impose two additional rules:

Hooks should only be called at the top level. Do not call hooks inside loops, conditions, or nested functions.
Hooks should only be called from the functional components of React. Do not call hooks from regular JavaScript functions. There is only one exception where you can call hooks from - these are your custom hooks. We will talk about them later.

## Functional

- Props in, JSX out
- Great for presentation
- Focused on one/few purpose(s)

conversion is annoying

## Class-based (lifecycle hooks can be hard to use)

- Uses props and state
- Buisness logic goes in here
- Orchestrates components

## Functional with hooks

- Functional components
- Hooks replace class-only functionalities

Version hire React 16.8

### useState

- for managin state

```
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div>
        <p>Вы кликнули {this.state.count} раз(а)</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Нажми на меня
        </button>
      </div>
    );
  }
}
```

```
import React, { useState } from 'react';

function Example() {
  // Объявление новой переменной состояния «count»
  const [count, setCount] = useState(0); //this.state.count, this.setState

  return (
    <div>
      <p>Вы кликнули {count} раз(а)</p>
      <button onClick={() => setCount(count + 1)}>
        Нажми на меня
      </button>
    </div>
  );
}
```

### useEffect

- for handling side effect (eventListener or http request)
  You most likely have previously requested data, made subscriptions, or manually changed the DOM from the React component. We regard these operations as “side effects” (or abbreviated as “effects”), since they can affect the operation of other components and cannot be performed during rendering.

It performs the same role as componentDidMount, componentDidUpdate and componentWillUnmount in React classes, combining them into a single API.

By default, React launches effects after each render, including the first render.

```
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    document.title = `Вы нажали ${this.state.count} раз`;
  }

  componentDidUpdate() {
    document.title = `Вы нажали ${this.state.count} раз`;
  }

  render() {
    return (
      <div>
        <p>Вы нажали {this.state.count} раз</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Нажми на меня
        </button>
      </div>
    );
  }
}
```

```
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // componentDidMount and componentDidUpdate:
  useEffect(() => {
    document.title = `Вы нажали ${count} раз`;
  });

  return (
    <div>
      <p>Вы нажали {count} раз</p>
      <button onClick={() => setCount(count + 1)}>
        Нажми на меня
      </button>
    </div>
  );
}
```

If necessary, you can return from the effect a function that tells the effect how to perform a “reset” after itself.
In this case, it is very important to perform a reset so that there are no memory leaks!

```
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // Указываем, как сбросить этот эффект:
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Загрузка...';
  }
  return isOnline ? 'В сети' : 'Не в сети';
}
```

```
class FriendStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

   componentDidUpdate(prevProps) {
    // Отписаться от предыдущего friend.id
    ChatAPI.unsubscribeFromFriendStatus(
      prevProps.friend.id,
      this.handleStatusChange
    );
    // Подписаться на следующий friend.id
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    });
  }

  render() {
    if (this.state.isOnline === null) {
      return 'Загрузка...';
    }
    return this.state.isOnline ? 'В сети' : 'Не в сети';
  }
}
```

```
useEffect(() => {
  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };
}, [props.friend.id]);
```

If you want to run an effect and reset it only once (when mounting and unmounting), you can pass an empty array ([]) as the second argument. (componentDidMount and componentWillUnmount)

Not using componentDidUpdate properly is one of the most common sources of bugs in React applications.

Otimization

```
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `Вы нажали ${this.state.count} раз`;
  }
}
```

useEffect optimization

```
useEffect(() => {
  document.title = `Вы нажали ${count} раз`;
}, [count]); // Перезапускать эффект только если count поменялся
```

Sometimes you need to reuse the same state logic in multiple components. Traditionally, two approaches have been used: higher-order components and render-props.

### Custom hook

useFriendStatus:

The states of these components are in no way dependent on each other.
Hooks are a way to reuse state logic, not state itself.

in hooks folder

```
import React, { useState, useEffect } from 'react';

function useFriendStatus(friendID) {  //use...  hook
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}

```

```
function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```

```
import { useState } from 'react';

export const useFormInput = () => {
  const [value, setValue] = useState('');
  const [validity, setValidity] = useState(false);

  const inputChangeHandler = event => {
    setValue(event.target.value);
    if (event.target.value.trim() === '') {
      setValidity(false);
    } else {
      setValidity(true);
    }
  };

  return { value: value, onChange: inputChangeHandler, validity };
};
```

in Todo.js

```
import { useFormInput } from "../hooks/forms ";

const todoInput = useFormInput();

<input
    type="text",
    placeholder="Todo"
    onChange={todoInput.onChange }
    value={todoInput.validity}
    style={{ backgroundcolor: todoInput.validity === true  ? 'transparent : 'red'}}
/>

const todoName = todoInput.value;
```

### useContext

- for giving access to context data

```
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = React.createContext(themes.light);

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);

  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      Я стилизован темой из контекста!
    </button>
  );
}
```

Context allows you to transfer data through the component tree without the need to transmit props at intermediate levels.

The context is designed to convey data that can be called “global” for the entire tree of React components (for example, the current authenticated user, UI theme, or selected language).

### useReducer

makes it possible to control the internal state of a more complex component using a reducer.

```
function Todos() {
  const [todos, dispatch] = useReducer(todosReducer);
  // ...
```

The useReducer hook is usually preferable to useState when you have complex state logic that includes multiple values, or when the next state depends on the previous one.

```
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

### useMemo

useMemo will recalculate the memoized value only when the value of any of the dependencies has changed.

```
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

### useRef

```
const refContainer = useRef(initialValue);

function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` указывает на смонтированный элемент `input`
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Установить фокус на поле ввода</button>
    </>
  );
}
```

## Example

```
import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

const todo = props => {
    // const inputState = useState('');
    //useState only on top without if condition
    const [todoName, setTodoName] = useState('');
    const [submittedTodo, setSubmittedTodo] = useState(null);
   // const [todoList, setTodoList] = useState([]);

    // const [todoState, setTodoState] = useState({userInput: '', todoList: []})

    useEffect(() => {  //after finish every render sycle
        axios.get('http...')
            .then(res => {
                console.log(res);
                const todoData = result.data; //list of object
                const todos = [];
                for (const key in todoData) {
                    todos.push({id: key, name: todoData[key].name});
                }
                setTodoList(todos);
            }).catch(err => {
                console.log(err)
            })
        return () => {
            console.log('Cleanup'); //before each rerender
        };
    }, []);

    /* second arg, before execute func ([todoName] check if that arg changed we call func) without args - infinitive loop (every render cycle ) (like componentDidMount - []) loads onse */

    const mouseMoveHandler = event => {
        console.log(event.clientX, event.clientY);
    };

    useEffect(() => {
        document.addEventListener('mousemove', mouseMoveHandler);
        return () => {
            document.removeEventListener('mousemove', mouseMoveHandler); //cleanup [] - unmount
        };
    }, []);

    const inputChangeHandler = (event) => {
        setTodoName(event.target.value); //new value inputState[1](event.target.value)
        // setTodoState({userInput: event.target.value, todoList: todoState.todoList})
    };

    const todoAddHandler = () => {
        //
        // setTodoState({userInput: todoState.userInput , todoList: todoState.todoList.concat(todoState.userInput)})
        axios.post('http.../todos.json', {name: todoName});
            .then(res => {
                setTimeout(() => {
                    //if we immediatly add the new item (second rewrite first)
                    //useEffect(() => { if (submittedTodo) { setTodoList(todoList.concat(submittedTodo))}}, [submittedTodo]);
                    const todoItem = { id: res.data.name, name: todoName };
                    //setTodoList(todoList.concat(todoItem));
                    setSubmittedTodo(todoItem);
                }, 3000);
            }).catch(err => {
                console.log(err )
            })
    };

    return(
        <>
            <input type="text" placeholder="ToDo" onChange={inputChangeHandler} value={todoName}>
            //value={inputState[0]} value={todoState.userInput}
            <button type="button" onClick={todoAddHandler}>Add</button>
            <ul>
                {todoList.map(todo => <li key={todo.id}>{todo.name }</li >)}
            </ul>
        </>
    )
}
```

New Todo.js with reduser (useReducer, useRef, useMemo)
useReduser vs useState

```
import React, { useState, useEffect, useReducer, useRef, useMemo } from 'react';
import axios from 'axios';

import List from './List';
import { useFormInput } from '../hooks/forms';

const todo = props => {
  const [inputIsValid, setInputIsValid] = useState(false);
  // const [todoName, setTodoName] = useState('');
  // const [submittedTodo, setSubmittedTodo] = useState(null);
  // const [todoList, setTodoList] = useState([]);
  // const [todoState, setTodoState] = useState({ userInput: '', todoList: [] });
  // const todoInputRef = useRef();
  const todoInput = useFormInput();

  const todoListReducer = (state, action) => {
    switch (action.type) {
      case 'ADD':
        return state.concat(action.payload);
      case 'SET':
        return action.payload;
      case 'REMOVE':
        return state.filter(todo => todo.id !== action.payload);
      default:
        return state;
    }
  };

  const [todoList, dispatch] = useReducer(todoListReducer, []);

  useEffect(() => {
    axios.get('https://test-3e15a.firebaseio.com/todos.json').then(result => {
      console.log(result);
      const todoData = result.data;
      const todos = [];
      for (const key in todoData) {
        todos.push({ id: key, name: todoData[key].name });
      }
      dispatch({ type: 'SET', payload: todos });
    });
    return () => {
      console.log('Cleanup');
    };
  }, []);

  const mouseMoveHandler = event => {
    console.log(event.clientX, event.clientY);
  };

  const inputValidationHandler = event => {
    if (event.target.value.trim() === '') {
      setInputIsValid(false);
    } else {
      setInputIsValid(true);
    }
  };

  // useEffect(() => {
  //   document.addEventListener('mousemove', mouseMoveHandler);
  //   return () => {
  //     document.removeEventListener('mousemove', mouseMoveHandler);
  //   };
  // }, []);

  // useEffect(
  //   () => {
  //     if (submittedTodo) {
  //       dispatch({ type: 'ADD', payload: submittedTodo });
  //     }
  //   },
  //   [submittedTodo]
  // );

  // const inputChangeHandler = event => {
  //   // setTodoState({
  //   //   userInput: event.target.value,
  //   //   todoList: todoState.todoList
  //   // });
  //   setTodoName(event.target.value);
  // };

  const todoAddHandler = () => {
    // setTodoState({
    //   userInput: todoState.userInput,
    //   todoList: todoState.todoList.concat(todoState.userInput)
    // });

    const todoName = todoInput.value;

    axios
      .post('https://test-3e15a.firebaseio.com/todos.json', { name:   })
      .then(res => {
        setTimeout(() => {
          const todoItem = { id: res.data.name, name: todoName };
          dispatch({ type: 'ADD', payload: todoItem });
        }, 3000);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const todoRemoveHandler = todoId => {
    axios
      .delete(`https://test-3e15a.firebaseio.com/todos/${todoId}.json`)
      .then(res => {
        dispatch({ type: 'REMOVE', payload: todoId });
      })
      .catch(err => console.log(err));
  };

  return (
    <React.Fragment>
      <input
        type="text"
        placeholder="Todo"
        onChange={todoInput.onChange}
        value={todoInput.value}
        style={{ backgroundColor: todoInput.validity === true ? 'transparent' : 'red' }}
      />
      <button type="button" onClick={todoAddHandler}>
        Add
      </button>
      {useMemo(
        () => (
          <List items={todoList} onClick={todoRemoveHandler} />
        ),
        [todoList]
      )}
    </React.Fragment>
  );
};

export default todo;
```

App.js

```
import React, { useState } from 'react';

import Todo from './components/Todo';
import Header from './components/Header';
import Auth from './components/Auth';
import AuthContext from './auth-context';

const app = props => {
  const [page, setPage] = useState('auth');
  const [authStatus, setAuthStatus] = useState(false);

  const switchPage = pageName => {
    setPage(pageName);
  };

  const login = () => {
    setAuthStatus(true);
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ status: authStatus, login: login }}>  //set value to context here
        <Header
          onLoadTodos={switchPage.bind(this, 'todos')}
          onLoadAuth={switchPage.bind(this, 'auth')}
        />
        <hr />
        {page === 'auth' ? <Auth /> : <Todo />} //swith between two pages
      </AuthContext.Provider>
    </div>
  );
};

export default app;
```

auth-context.js (createContex)

```
import React from 'react';

const authContext = React.createContext({ status: false, login: () => {} });

export default authContext;
```
