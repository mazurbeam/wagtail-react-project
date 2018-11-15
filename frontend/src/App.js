import React from 'react'
import { ConnectedRouter } from 'connected-react-router'

import { Grid } from 'semantic-ui-react'
import { Flex, Box } from 'rebass'
import ParticlesWrapper from './components/ParticlesWrapper'
import Footer from './components/Footer'
// import Header from '../components/Header'
// import './App.css'
import Routes from './routes'
import './static/css/uikit.css'
import ParcticlesWrapper from './components/ParticlesWrapper'

const App = ({ history }) => {
  return (
    <Flex
      p={0}
      m={0}
      css={{ minHeight: '95vh' }}
      className='Site'
      flexDirection='column'
    >
      <ParcticlesWrapper />
      <Box flex='1 1 auto' width={1}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </Box>
    </Flex>
  )
}

export default App
