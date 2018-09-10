// src/routes/index.js

import React from 'react';
import { Route, Switch, withRouter } from 'react-router';
// import { Flex, Box } from 'rebass';
// components
import styled from 'styled-components';

import { TransitionGroup, CSSTransition } from 'react-transition-group';
// containers

import NoMatch from '../components/NoMatch';
import Header from '../components/Header';
import Home from '../containers/Home';
import Page from '../containers/Page';
import BlogIndexPage from '../containers/BlogIndexPage';
import StandardPage from '../containers/StandardPage';

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
          <Route
            path="/:slug"
            render={props => {
              if (props.location.state.type === 'blog.BlogIndexPage') {
                return <BlogIndexPage {...props} />;
              }
              if (props.location.state.type === 'pages.StandardPage') {
                return <StandardPage {...props} />;
              }
              return <Page {...props} />;
            }}
          />
          <Route component={NoMatch} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  </Wrapper>
);

export default withRouter(Routes);
