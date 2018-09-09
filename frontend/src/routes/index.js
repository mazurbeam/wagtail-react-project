// src/routes/index.js

import React from 'react';
import { Route, Switch } from 'react-router';

import Home from '../containers/Home';
import NoMatch from '../components/NoMatch';
import Header from '../components/Header';

const routes = (
  <div>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />

      <Route component={NoMatch} />
    </Switch>
  </div>
);

export default routes;
