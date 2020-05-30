import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import LoginPage from './views/LoginPage';


class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={LoginPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}


export default Routes;