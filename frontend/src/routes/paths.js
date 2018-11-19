import React from 'react'
import { Route, Switch } from 'react-router'

import { TransitionGroup, CSSTransition } from 'react-transition-group'

import { FadeWrapper } from '../components/base/styles'
import NoMatch from '../components/NoMatch'
import Home from '../containers/Home'
import Page from '../containers/Page'
import ContactPage from '../containers/ContactPage'
// import './styles.css'

const Paths = ({ location }) => (
  <FadeWrapper>
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        timeout={{ enter: 300, exit: 300 }}
        classNames='fade'
      >
        <section className='route-section Site-content'>
          <Switch location={location}>
            <Route exact path='/' component={Home} />
            <Route exact path='/contact' component={ContactPage} />
            <Route exact path='/:slug' component={Page} />
            <Route exact path='/:slug/:child' component={Page} />
            <Route component={NoMatch} />
          </Switch>
        </section>
      </CSSTransition>
    </TransitionGroup>
  </FadeWrapper>
)

export default Paths
