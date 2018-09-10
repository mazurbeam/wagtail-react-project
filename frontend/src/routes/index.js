// src/routes/index.js

import React from 'react';
import { Route, Switch } from 'react-router';
// import { Flex, Box } from 'rebass';
// components
import NoMatch from '../components/NoMatch';
import Header from '../components/Header';

// containers
import Home from '../containers/Home';
import Page from '../containers/Page';
import BlogIndexPage from '../containers/BlogIndexPage';

const routes = (
  <div>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route
        path="/:slug"
        render={props => {
          if (props.location.state.type === 'blog.BlogIndexPage') {
            return <BlogIndexPage {...props} />;
          }
          return <Page {...props} />;
        }}
      />
      <Route component={NoMatch} />
    </Switch>
  </div>
);

export default routes;
