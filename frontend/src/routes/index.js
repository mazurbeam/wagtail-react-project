// src/routes/index.js

import React, { Fragment } from "react";
import { Route, Switch, withRouter } from "react-router";

// rebass
// import {  Box } from 'rebass';
// components
// import styled from 'styled-components';
// import Particles from 'react-particles-js';

import { TransitionGroup, CSSTransition } from "react-transition-group";
// containers

import NoMatch from "../components/NoMatch";
import Header from "../components/Header";
import Footer from "../components/Footer";

// import Footer from '../components/Footer';
import Home from "../containers/Home";
import Page from "../containers/Page";

import ContactPage from "../containers/ContactPage";


const Routes = ({ location }) => (
  <Fragment>
  
    <Header/>
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        timeout={{ enter: 300, exit: 300 }}
        classNames="fade"
      >
        <Switch location={location}>
          <Route exact path="/" component={Home}/>
          <Route exact path="/contact" component={ContactPage}/>
          <Route exact path="/:slug" component={Page}/>
          <Route exact path="/:slug/:child" component={Page}/>
          <Route component={NoMatch}/>
        </Switch>
      </CSSTransition>
    </TransitionGroup>
    <Footer/>
  </Fragment>
);

export default withRouter(Routes);
