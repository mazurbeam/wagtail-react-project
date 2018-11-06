// src/routes/index.js

import React, { Fragment } from 'react'
import { Route, Switch, withRouter } from 'react-router'

// rebass
// import {  Box } from 'rebass';
// components
// import styled from 'styled-components';
// import Particles from 'react-particles-js';

import { TransitionGroup, CSSTransition } from 'react-transition-group'
// containers

import NoMatch from '../components/NoMatch'
import Header from '../components/Header'
import Footer from '../components/Footer'

// import Footer from '../components/Footer';
import Home from '../containers/Home'
import Page from '../containers/Page'

import ContactPage from '../containers/ContactPage'
import './styles.css'

// Does the user's browser support the HTML5 history API?
// If the user's browser doesn't support the HTML5 history API then we
// will force full page refreshes on each page change.
// const supportsHistory = 'pushState' in window.history;

const Routes = () => (
  <Fragment>
    <Header />
    <Route
      render={({ location }) => {
        const { pathname } = location
        return (
          <TransitionGroup>
            <CSSTransition
              key={pathname}
              timeout={{ enter: 1000, exit: 1000 }}
              classNames='page'
            >
              <Route
                location={location}
                render={() => (
                  <Switch location={location}>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/contact' component={ContactPage} />
                    <Route exact path='/:slug' component={Page} />
                    <Route exact path='/:slug/:child' component={Page} />
                    <Route component={NoMatch} />
                  </Switch>
                )}
              />
            </CSSTransition>
          </TransitionGroup>
        )
      }}
    />
    <Footer />
  </Fragment>
)

export default withRouter(Routes)
