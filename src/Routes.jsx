import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import LoginPage from './views/LoginPage';
import StoriesPage from './views/StoriesPage';


class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/stories" component={StoriesPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}


export default Routes;