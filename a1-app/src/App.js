import React, { Component } from 'react';
import { Route, Switch, Link } from "react-router-dom";
import './App.css';
import CarList from './CarList';
import CarDetail from './CarDetail';
import CarEdit from './CarEdit';
import CarDelete from './CarDelete';
import CarCreate from './CarCreate';
<link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script></link>
class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Navbar className="navbar navbar-default" />
        <hr />
        <div className="routerBody">
          <Switch>
            <Route exact path='/' render={() => (<Home />)} />
            <Route exact path='/cars' render={() => (<CarList />)} />
            <Route exact path='/cars/create' render={() => (<CarCreate />)} />
            <Route exact path='/cars/detail/:id' render={(props) => (<CarDetail id={props.match.params.id} />)} />
            <Route exact path='/cars/edit/:id' render={(props) => (<CarEdit id={props.match.params.id} />)} />
            <Route exact path='/cars/delete/:id' render={(props) => (<CarDelete id={props.match.params.id} />)} />
            <Route render={() => (<NotFound />)} />
          </Switch>
        </div>

        <p>&nbsp;</p>
        <hr />
        <footer>
          <small>
            <div>&copy; Parthraj Mahida, 2020</div>
            <div>For purposes of BTI-425 Assignment 1</div>
          </small>
        </footer>
      </div>
    );
  }
}

export default App;

// Function component for the top-of-view header
const Header = () => {
  return (
    <div className="header">
      <div className="row">
        <h2>BTI-425 Assignment 1</h2>
        <p>Created by Parthraj Mahida</p>
      </div>
    </div>
  );
}

// Function component for the navigation bar 
const Navbar = () => {
  return (
    <div className="container-fluid navbar-outline">
      <div className="navbar-header">
        <Link to='/' className='navbar-brand'>Home page</Link>
      </div>

      {/* <!-- All the navigation links are in the following div --> */}
      <div>
        <ul className="nav navbar-nav">
          <li>
            <Link to='/cars'>Car List</Link>
          </li>
          <li>
            <Link to='/cars/create'>Create a Car</Link>
          </li>
        </ul>
      </div>
    </div>

  );
}

// Function component for a content area
const Home = () => {
  document.title = `Home`;
  return (
    <div>
      <p>Welcome to my react app</p>
      <p>Click one of the tab to go through the tabs</p>
      <p>&nbsp;</p>
    </div>
  );
}

// Function component for a content area
const NotFound = () => {
  document.title = `Page not found`;
  return (
    <div>
      <h2>Oopsie~</h2>
      <p>The requested resource could not be found.</p>
      <p>&nbsp;</p>
    </div>
  );
}