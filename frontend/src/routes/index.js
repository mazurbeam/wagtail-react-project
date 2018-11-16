// src/routes/index.js

import React from 'react'
import { withRouter } from 'react-router'

import Header from '../containers/Header'

import { Wrapper } from '../components/base/styles'
import './styles.css'
import Paths from './paths'
// Does the user's browser support the HTML5 history API?
// If the user's browser doesn't support the HTML5 history API then we
// will force full page refreshes on each page change.
// const supportsHistory = 'pushState' in window.history;

const Routes = () => (
  <Wrapper>
    <div className='App-header'>
      <Header />
    </div>
    <Paths />
  </Wrapper>
)

export default withRouter(Routes)
