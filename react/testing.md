# Testing

```
"test": "jest --watchAll"
```

Simple example:

```
export const add = (x, y) => {
    return x + y;
};

export const total = (shipping, subTotal) => {
    return '$' + add(shipping, subTotal);
};
```

App.test.js

```
inport { add, total } from './App';

//Unit test - It only tests one thing

test('add', () => {
    expect(add(1,2)).toBe(3);
    expect(add(3,2)).toBe(5);
    expect(add(5,2)).toBe(7);
})
```

Integration test (calls in sequence) - total function relying on add func

```
test('total', () => {
    expect(total(1,2)).toBe('$3');
})
```

Testing Tools

1. Test Runner (Testing Utilities)
2. Executes Tests and provides Validation Library
3. Jest (React Test Utils, Enzyme, deep-freeze)

What to test

Don`t test the library Don`t test complex connections
Do test isolated units
Do test conditional outputs

Jest (test runner)
Jest is a JavaScript test executor that allows you to interact with the DOM through jsdom.
Jest is well compatible with React-projects, supports such features as dummy modules and timers, working with jsdom.
If you use the Create React App, Jest is already preinstalled with useful defaults.

https://jestjs.io/ npm install --save-dev jest react-test-renderer
npm install --save enzyme enzyme-adapter-react-16

Enzyme - test utility for React
Shallow rendering - draws only the component itself, without child components.
Therefore, if you change something in the child component, this will not change the shallow output of your component.
enzyme-adapter-react-16 - configuration

https://airbnb.io/enzyme/

Example

```
    const ButtonWithIcon = ({icon, children}) => (
        <button><Icon icon={icon} />{children}</button>
    );
//React
    <button>
        <i class="icon icon_coffee"></i>
        Hello Jest!
    </button>
//Shallow rendering
    <button>
        <Icon icon="coffee" /> //Icon component was not rendered.
        Hello Jest!
    </button>
```

Testing props:

In this case, use the Enzyme API along with the usual Jest statements:

```
it('should render a document title', () => {
    const wrapper = shallow(
        <DocumentTitle title="Events" />
    );
    expect(wrapper.prop('title')).toEqual('Events');
});
```

## Component testing

ComponentName.test.js

commant to use
wrapper.find wrapper.contains
expect().toHaveLength() expect().toHaveLength().contains('...')

```
import React from 'react'; //jsx code must to be converted

import { configure, shallow } from 'enzyme';  //shallow - shallow rendering content isn`t deeply render (main idea render independent isolated test)
import Adapter from 'enzyme-adapter-react-16'; //configure enzyme connector to react version

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem'; //we check this component availability

configure({adapter: new Adapter()}); //configure to new version React

describe('<NavigationItems />', () => { //test suit
    let wrapper;

    beforeEach(() => {          //before each test
        wrapper = shallow(<NavigationItems />); //shallow rendering components
    });

    it('should render two <NavigationItem /> elements if not authenticated', () => {  //one test
        expect(wrapper.find(NavigationItem)).toHaveLength(2);    //check smth (if we looking for NavigationItem we should import it)
    });

    it('should render three <NavigationItem /> elements if authenticated', () => {
        // wrapper = shallow(<NavigationItems isAuthenticated />);
        wrapper.setProps({isAuthenticated: true});  //set props
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should an exact logout button', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });
});
```

Simple Title testing:

```
import React from "react";
import { create } from "react-test-renderer";
import Title from "./title";

describe("Title component", () => {
    test("After creation emty <Title> a component with a simple title will be created", () => {
      const component = create(<Title />);
      const instance = component.root;
      let ToDoList = instance.findByType('h1');
      expect(ToDoList.props.children).toBe('Simple title');
    });
});
```

## Containers testing

Trick:
export class ContainerName (export default connect)

```
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()});

describe('<BurgerBuilder />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}/>); //use onInitIngredients in componentDidMount()
    });

    it('should render <BuildControls /> when receiving ingredients', () => { //check availability
        wrapper.setProps({ings: {salad: 0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});
```

## Mock Functions

```
const add = jest.fn(() => 3);
```

### Reduser testing (Redux)

reduser.test.js

1. start test data
2. action
3. expectation

```
import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });         //without action
    });

    it('should store the token upon login', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }, {
            type: actionTypes.AUTH_SUCCESS,  //send action
            idToken: 'some-token',
            userId: 'some-user-id'
         })).toEqual({
            token: 'some-token',  //change here token
            userId: 'some-user-id',
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    })
});
```
