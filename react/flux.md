# Flux

![Flux img](https://metanit.com/web/react/pics/5.2.png)

Applications that use Flux have three main parts: a dispatcher , a storage, and views - standard React components.

## Dispatcher

The dispatcher registers storages and their callbacks - callbacks.

## Storage

Storage contain the state of the application and its logic.

## Views

Visual part of the application. A special kind of view - the controller-view represents a top-level component that contains all the other components.
Upon receiving the event, the controller-view passes the data received from the store to other components.

## Actions

In the action itself, the dispatch method is called. As a parameter, this method takes an object in which we pass the type of action and the data itself.