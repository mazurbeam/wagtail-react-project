import React from 'react'
import { ConnectedRouter } from 'connected-react-router'

import { Grid } from 'semantic-ui-react'
import { Flex, Box } from 'rebass'
import ParticlesWrapper from './components/ParticlesWrapper'
import Footer from './components/Footer'
// import Header from '../components/Header'
import './App.css'
import Routes from './routes'
import './static/css/uikit.css'

const App = ({ history }) => {
  return (
    <Flex
      p={0}
      m={0}
      css={{ minHeight: '99vh' }}
      className='Site'
      flexDirection='column'
    >
      <ParticlesWrapper />
      <Box
        css={{ minHeight: '95vh' }}
        flex='1'
        width={1}
        className='Site-content'
      >
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </Box>
      <Box width={1} className='app-footer'>
        <Footer />
      </Box>
    </Flex>
  )
}

export default App
