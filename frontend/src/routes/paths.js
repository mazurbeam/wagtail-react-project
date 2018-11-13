import React from 'react'
import { Route, Switch } from 'react-router'
import { Box } from 'rebass'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import NoMatch from '../components/NoMatch'
import Home from '../containers/Home'
import Page from '../containers/Page'
import ContactPage from '../containers/ContactPage'
import './styles.css'

const Paths = () => (
  <Box>
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
  </Box>
)

export default Paths
