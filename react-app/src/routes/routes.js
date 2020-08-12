import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Header from '../uiComponents/header';


function Routes () {
    return (
      <Router>
        <Switch>
          <Route path='/'>
          <Header />
          </Route>
        </Switch>
      </Router>
    );
}

export default Routes;
