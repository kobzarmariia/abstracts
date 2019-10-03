# Flux

![Flux scheme](https://metanit.com/web/react/pics/5.2.png)

Applications that use Flux have three main parts: a dispatcher , a storage, and views - standard React components.

+ module: flux

Example:
![Flux tree example](https://metanit.com/web/react/pics/5.6.png)

## Dispatcher

The dispatcher registers storages and their callbacks.

PhonesDispather.js:
```
import { Dispatcher } from "flux";

export default new Dispatcher;
```

## Actions

In the action itself, the dispatch method is called. As a parameter, this method takes an object in which we pass the type of action and the data itself.

ActionTypes.js:
```
const ActionTypes = { ADD_ITEM: "ADD_ITEM", REMOVE_ITEM: "REMOVE_ITEM"};

export default ActionTypes;
```

Actions.js

```
import ActionTypes from "./ActionTypes.js";
import PhonesDispatcher from "./PhonesDispatcher.js";
 
const Actions = {
  addItem(text) {
    PhonesDispatcher.dispatch({
      type: ActionTypes.ADD_ITEM,
      text,
    });
  },
  removeItem(text) {
    PhonesDispatcher.dispatch({
      type: ActionTypes.REMOVE_ITEM,
      text,
    });
  }
};
 
export default Actions;
```

## Storage

Storage contain the state of the application and its logic.
Each store is registered with the dispatcher along with its callbacks.
When the dispatcher receives an action, he performs a callback, passing it the received action as a parameter.
Depending on the type of action, one or another method is called inside the store, in which the state of the store is updated.
After updating the store, an event is generated that indicates that the store has been updated. 
And through this event, the views (that is, the React components) learn that the store has been updated, and themselves update their state.

PhoneStore.js

```
import Immutable from "immutable";
import {ReduceStore} from "flux/utils";
import Actions from "./Actions.js";
import ActionTypes from "./ActionTypes.js";
import PhonesDispatcher from "./PhonesDispatcher.js";
 
class PhonesStore extends ReduceStore{
    constructor()
    {
        super(PhonesDispatcher);
    }
    getInitialState() {
        return Immutable.List.of("iPhone 7", "Google Pixel");;
    }
 
    reduce(state, action) {
        switch (action.type) {
            case ActionTypes.ADD_ITEM:
                if (action.text) {
                  return state.push(action.text);
                }
                return state;
            case ActionTypes.REMOVE_ITEM:
                let index = state.indexOf(action.text);
                if (index > -1) {
                    return state.delete(index);
                }
                return state;
            default:
                return state;
        }
    }
}
export default new PhonesStore();
```

## Views

Visual part of the application. A special kind of view - the controller-view represents a top-level component that contains all the other components.
Upon receiving the event, the controller-view passes the data received from the store to other components.

AppView.js

```
import React from "react";
 
class AppView extends React.Component{
 
    constructor(props){
        super(props);
        this.state = {newItem: ""};
         
        this.onInputChange = this.onInputChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }
    onInputChange(e){
        this.setState({newItem:e.target.value});
    }
    onClick(e){
        if(this.state.newItem){
            this.props.onAddItem(this.state.newItem);
            this.setState({newItem:" "});
        }
    }
    onRemove(item){
        if(item){
            this.props.onRemoveItem(item);
        }
    }
    render(){
         
        let remove = this.props.onRemoveItem;
        return <div> 
                <input type="text" value={this.state.newItem} onChange={this.onInputChange} />    
                <button onClick={this.onClick}>Добавить</button>                
                <h2>Список смартфонов</h2>
                <div>
                    {
                        this.props.phones.map(function(item){
                             
                            return <Phone key={item} text={item} onRemove={remove} />
                        })
                    }
                </div>
            </div>;
    }
}
 
class Phone extends React.Component{
 
    constructor(props){
        super(props);
        this.state = {text: props.text};
        this.onClick = this.onClick.bind(this);
    }
    onClick(e){
        this.props.onRemove(this.state.text);
    }
    render(){
        return <div> 
                <p>
                    <b>{this.state.text}</b><br />
                    <button onClick={this.onClick}>Удалить</button> 
                </p>
            </div>;
    }
}
export default AppView;
```


AppContainer.js

```
import AppView from "../views/AppView.js";
import {Container} from "flux/utils";
import React from "react";
import PhoneStore from "../data/PhoneStore.js";
import Actions from "../data/Actions.js";
 
class AppContainer extends React.Component 
{ 
    static getStores() { 
        return [PhoneStore]; 
    } 
    static calculateState(prevState) { 
        return { 
            phones: PhoneStore.getState(),
            onAddItem: Actions.addItem,
            onRemoveItem: Actions.removeItem
        }; 
    }
    render() { 
        return <AppView phones={this.state.phones} 
                        onRemoveItem={this.state.onRemoveItem}
                        onAddItem={this.state.onAddItem}  />; 
    } 
} 
export default Container.create(AppContainer);
```
