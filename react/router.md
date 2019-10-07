# Router

## React router

react-router, react-outer-dom, react-router-native

Module: react-router-dom

- brouser-router //processing in server dynamic request
- hashe-router //static web-site

Then each router create history object which store location to each page

```
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './...components/home/home';
import Contacts from './.../contacts';
import Posts from './.../posts';
import Post from './.../post';
import Error from './.../error';

ReactDOM.Render((
  <BrowserRouter>
    <App> //it's our application & {children} from router (root - all static layout)
      <Switch>
        <Route exact path='/' component={Home} /> //exact compare Home '/'
        <Route path='/contacts' component={Contacts} />
        <Route exact path='/posts' component={Posts} /> //two similar route (will always work Posts)
        <Route path='/posts/:id' component={Post} />
        <Route path='*' component={Error} /> //nonexistent route
      </Switch>
    <App/> 
  </BrowserRouter>
), document.getElementById('root'));

registerServiceWorker();
```
Navigation panel 
Component Link do not overload page

```
import { NavLink } from 'react-router-dom'; //active route

const Header = () => (
  <header className="header">
    <nav>
      <ul className="nav">
        <li><NavLink exact to='/'>Home</NavLink></li> //strict comparison
        <li><NavLink to='/posts'>Posts</NavLink></li>
        <li><NavLink to='/contacts'>Contacts</NavLink></li>
      </ul>
    </nav>
  </header>
)
```
Posts.jsx
```
import { Link } from 'react-router-dom';

class Posts extends Component {
  state = {
    data: [],
  }
}

componentDidMount() {
  fetch('http:...')
  .then(res => res.json())
  .then(data => {
    this.setState({
      data
    })
  })
}

render() {
  const { data } = this.state;

  return (
    <div>
    <h1>Posts:</h1>
    <ul className="posts">
      {data.map(({ id, title }) => 
        <li key={id}><Link to={'/posts/${id}'}>{title}</Link></li>
      )}
    </ul>
    </div>
  )
}
```
Post.jsx
```
class Posts extends Component {
  state = {
    post: {},
  }

componentDidMount() {
  const id = this.props.match.params.id || '';

  fetch('http.../${id}')
  .then(res => res.json())
  .then(data => {
    this.setState({
      post: data
    })
  })
} 

render() {
  const { post } = this.state;
  const { title, body } = post;

  return(

  )
}
```

### Route Options
```
<Route path="about/:id/:name" component={About} />


class About extends React.Component{
    render(){
        // get the parameters
        const id= this.props.match.params.id;
        const name = this.props.match.params.name;
        return <h2>id: {id}  Name: {name}</h2>;
    }
}
```
#### Optional parameters

```
<Route path="about/:id?" component={About} />
```

#### Regular expressions

```
<Route path="/products/:id(\d+)" component={Product} />
```
The regular expression (\ d +) matches a single digit or multiple digits. http://localhost:3000/products/5
http://localhost:3000/products/iphone, the route will not match the request and therefore will not process such a request.

## Example
client.js

```
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router"; //

import Layout from "./pages/Layout";
import Archives from "./pages/Archives";
import Featured from "./pages/Featured";
import Settings from "./pages/Settings";

const app = document.getElementById('app');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Featured}></IndexRoute>
      <Route path="archives(/:article)" name="archives" component={Archives}></Route> // in Archives this.props.params.article (params - save our parameters :parametr_name)
      <Route path="settings" name="settings" component={Settings}></Route>
    </Route>
  </Router>,
app);
```

Layout.js (wrapper)
```
import React from "react";
import { Link } from "react-router";

import Footer from "../components/layout/Footer";
import Nav from "../components/layout/Nav";

export default class Layout extends React.Component {
    render () {
    const { location } = this.props;
        return (
            <div>
                <Nav location={location} />
                <div className="container" style={containerStyle}>
                    <div className="row">
                        <div>
                            <h1>KillerNews.net</h1>
                            {this.props.children} //content
                        </div>
                    </div>
                <Footer/>
                </div>
            </div>
        )
    }
}

```

this.props.location (after (url...some-article)?date=today&filter=none)

```
navigate() {
    this.props.history.replaceState(null, "/")
}
```

Nav.js

```
import React from "react";
import { IndexLink, Link } from "react-router";

export default class Nav extends React.Component {
   constructor() {
    super()
    this.state = {
      collapsed: true,
    };
  }   

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }

  render() {
    const { location } = this.props;
    const { collapsed } = this.state;
    const featuredClass = location.pathname === "/" ? "active" : ""; //attention check if link is active, if so add active class
    const archivesClass = location.pathname.match(/^\/archives/) ? "active" : "";
    const settingsClass = location.pathname.match(/^\/settings/) ? "active" : "";
    const navClass = collapsed ? "collapse" : "";

    return (
      <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation"> //here it is just bootstrap
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" onClick={this.toggleCollapse.bind(this)} >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>
          <div className={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li className={featuredClass}> //attention add class here
                <IndexLink to="/" onClick={this.toggleCollapse.bind(this)}>Featured</IndexLink>
              </li>
              <li className={archivesClass}>
                <Link to="archives" onClick={this.toggleCollapse.bind(this)}>Archives</Link>
              </li>
              <li className={settingsClass}>
                <Link to="settings" onClick={this.toggleCollapse.bind(this)}>Settings</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }

```
