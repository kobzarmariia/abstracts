# Features

## Next.js

https://github.com/zeit/next.js/

```
npm install --save next react react-dom
```

and add a script to your package.json like this:

```
{
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
  }
}
```

Routing

```
import Link from 'next/router';
import Router from 'next/router';

<p>Go to: <Link href="/auth"><a>Auth</a></Link></p>
<button onClick={() => Router.push('/auth')}>Go to Auth</button>
```

File-system routing: ./pages (folder) + components folder

Styling

We bundle styled-jsx to provide support for isolated scoped CSS.

```
function HelloWorld() {
  return (
    <div>
      Hello world
      <p>scoped!</p>
      <style jsx>{` //Attention
        p {
          color: blue;
        }
        div {
          background: red;
        }
        @media (max-width: 600px) {
          div {
            background: blue;
          }
        }
      `}</style>
      <style global jsx>{`
        body {
          background: black;
        }
      `}</style>
    </div>
  )
}

export default HelloWorld
```

Custom error handling

404 or 500 errors are handled both client and server side by a default component \_error.js (in pages folder)

```
import React from 'react'

const Error = () => (
  <div>
    <h1>Error</h1>
    <p>Try go to: <Link href="/"><a>home</a></Link></p>
  </div>
)

export default Error
```

Fetching data and component lifecycle

Init props before page is loaded.

Using a function component:

```
import fetch from 'isomorphic-unfetch'

function Page({ stars }) {
  return <div>Next stars: {stars}</div>
}

Page.getInitialProps = async ({ req }) => {
  const res = await fetch('https://api.github.com/repos/zeit/next.js')
  const json = await res.json()
  return { stars: json.stargazers_count }
}

export default Page
```

Using a class component:

```
import React from 'react'

class HelloUA extends React.Component {
  static async getInitialProps({ req }) {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    return { userAgent }
  }

  render() {
    return <div>Hello World {this.props.userAgent}</div>
  }
}

export default HelloUA
```

## Redux Saga

An alternative to redux-thunk (async action). Move all side effect actions in saga. (action only pure action creator)

https://redux-saga.js.org/docs/introduction/BeginnerTutorial.html

```
npm i redux-saga
```

auth.js action

sagas folder - auth.js

```
import { delay } from "redux-saga";
import { put, call } from "redux-saga/effects";
import axios from "axios";

import * as actions from "../actions/index";

//async
export function* logoutSaga(action) {
  yield call([localStorage, "removeItem"], "token"); //await
  yield call([localStorage, "removeItem"], "expirationDate");
  yield call([localStorage, "removeItem"], "userId");
  yield put(actions.logoutSucceed());
  //return {type: actionTypes.AUTH_LOGOUT}
  //yield put({type: actionTypes.AUTH_LOGOUT})
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000); //setTimeout
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  };
  let url =
    "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB5cHT6x62tTe-g27vBDIqWcwQWBSj3uiY";
  if (!action.isSignup) {
    url =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB5cHT6x62tTe-g27vBDIqWcwQWBSj3uiY";
  }
  try {
    const response = yield axios.post(url, authData);

    const expirationDate = yield new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("expirationDate", expirationDate);
    yield localStorage.setItem("userId", response.data.localId);
    yield put(
      actions.authSuccess(response.data.idToken, response.data.localId)
    );
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    yield put(actions.authFail(error.response.data.error));
  }
}

// + export const AUTH_INITIATE_LOGOUT = 'AUTH_INITIATE_LOGOUT'; -> AUTH_LOGOUT
```

run in action

```
export const logout = () => {
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT
  }
}

export const logoutSucceed () => {
    return {
    type: actionTypes.AUTH_LOGOUT
  }
}
```

in saga folder index.js

```
import { takeEvery, all, takeLatest } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";
import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  authCheckStateSaga
} from "./auth";
import { initIngredientsSaga } from "./burgerBuilder";
import { purchaseBurgerSaga, fetchOrdersSaga } from "./order";

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
  ]);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
  yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
  yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}
```

index.js

```
import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware, compose, combineReducers } from "redux";

import { watchAuth } from './sagas'

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
);

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurgerBuilder);
sagaMiddleware.run(watchOrder);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
```
