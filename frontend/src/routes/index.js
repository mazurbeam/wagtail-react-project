// src/routes/index.js

import React from 'react';
import { Route, Switch, withRouter } from 'react-router';

// rebass
// import {  Box } from 'rebass';
// components
import styled from 'styled-components';

import { TransitionGroup, CSSTransition } from 'react-transition-group';
// containers

import NoMatch from '../components/NoMatch';
import Header from '../components/Header';
// import Footer from '../components/Footer';
import Home from '../containers/Home';
import Page from '../containers/Page';
// import BlogIndexPage from '../containers/BlogIndexPage';
// import StandardPage from '../containers/StandardPage';
// import BlogPage from '../containers/BlogPage';

const Wrapper = styled.div``;

const Routes = ({ location }) => (
  <Wrapper>
        <Header />
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          timeout={{ enter: 300, exit: 300 }}
          classNames="fade"
        >
          <Switch location={location}>
            <Route exact path="/" component={Home} />
            <Route exact path="/:slug" component={Page} />
            <Route exact path="/:slug/:child" component={Page} />

            <Route component={NoMatch} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
  </Wrapper>
);

export default withRouter(Routes);
