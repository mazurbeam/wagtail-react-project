// src/routes/index.js

import React from 'react';
import { Route, Switch } from 'react-router';

// components
import NoMatch from '../components/NoMatch';
import Header from '../components/Header';

// containers
import Home from '../containers/Home';
import Page from '../containers/Page';

const routes = (
  <div>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/:slug" component={Page} />
      <Route component={NoMatch} />
    </Switch>
  </div>
);

export default routes;
