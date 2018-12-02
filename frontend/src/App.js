import React from 'react'
import { ConnectedRouter } from 'connected-react-router'

import { Box } from 'rebass'
import { Snackbar } from 'react-redux-snackbar'

import ParticlesWrapper from './components/ParticlesWrapper'
import Footer from './components/Footer'
// import Header from '../components/Header'
import './App.css'
import Routes from './routes'
import './static/css/uikit.css'
import ParcticlesWrapper from './components/ParticlesWrapper'

const App = ({ history }) => {
  return (
    <Box className='Site'>
      <ParcticlesWrapper />
      <Box className='Site-content'>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </Box>
      <Footer />
      <Snackbar />
    </Box>
  )
}

export default App
