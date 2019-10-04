# Redux

![Why we use flux/redux](https://2.bp.blogspot.com/-yj3h5POKq3c/XCCGUoQ0RLI/AAAAAAAAQ88/_5VpIs-O97IT0wKDySPbToD2xOfRO9C2gCLcBGAs/s1600/Bildschirmfoto-2017-12-01-um-08.53.32.png)

![Flux vs Redux](https://miro.medium.com/max/949/1*3lvNEQE4SF6Z1l-680cfSQ.jpeg)

![Redux](https://miro.medium.com/max/1400/0*95tBOgxEPQAVq9YO.png)

Documentation: https://redux.js.org

## Reducers

Reducers specify how the application's state changes in response to actions sent to the store. 
Remember that actions only describe what happened, but don't describe how the application's state changes.



## Actions

Actions are payloads of information that send data from your application to your store. 
They are the only source of information for the store. You send them to the store using store.dispatch().


## Store

The store has the following responsibilities:

- Holds application state;
- Allows access to state via getState();
- Allows state to be updated via dispatch(action);
- Registers listeners via subscribe(listener);
- Handles unregistering of listeners via the function returned by subscribe(listener).

## View