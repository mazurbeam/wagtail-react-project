// src/routes/index.js

import React from 'react'
import { withRouter } from 'react-router'

// rebass
// import { Box } from 'rebass'
// components
import styled from 'styled-components'
// import Particles from 'react-particles-js';

// import { TransitionGroup, CSSTransition } from 'react-transition-group'
// containers

// import NoMatch from '../components/NoMatch'
import Header from '../components/Header'

// import Footer from '../components/Footer';
// import Home from '../containers/Home'
// import Page from '../containers/Page'

// import ContactPage from '../containers/ContactPage'
import './styles.css'
import Paths from './paths'
// Does the user's browser support the HTML5 history API?
// If the user's browser doesn't support the HTML5 history API then we
// will force full page refreshes on each page change.
// const supportsHistory = 'pushState' in window.history;

const Wrapper = styled.div`
  // min-height: 100%;
  // position: relative;
  // display: flex;
  // min-height: 100vh;
  // flex-direction: column;
  // height: 100%; /* 1, 3 */
`

const Routes = () => (
  <Wrapper>
    <div className='App-header'>
      <Header />
    </div>
    <Paths />
  </Wrapper>
)

export default withRouter(Routes)
