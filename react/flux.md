# Flux

![Flux scheme](https://metanit.com/web/react/pics/5.2.png)

Applications that use Flux have three main parts: a dispatcher , a storage, and views - standard React components.

+ module: flux

![Flux tree example](https://metanit.com/web/react/pics/5.6.png)

## Dispatcher

The dispatcher registers storages and their callbacks.

```
import { Dispatcher } from "flux";

export default new Dispatcher;
```

## Storage

Storage contain the state of the application and its logic.
Each store is registered with the dispatcher along with its callbacks.
When the dispatcher receives an action, he performs a callback, passing it the received action as a parameter.
Depending on the type of action, one or another method is called inside the store, in which the state of the store is updated.
After updating the store, an event is generated that indicates that the store has been updated. 
And through this event, the views (that is, the React components) learn that the store has been updated, and themselves update their state.

## Views

Visual part of the application. A special kind of view - the controller-view represents a top-level component that contains all the other components.
Upon receiving the event, the controller-view passes the data received from the store to other components.

## Actions

In the action itself, the dispatch method is called. As a parameter, this method takes an object in which we pass the type of action and the data itself.

ActionTypes.js:
```
const ActionTypes = { ADD_ITEM: "ADD_ITEM", REMOVE_ITEM: "REMOVE_ITEM"};

export default ActionTypes;
```