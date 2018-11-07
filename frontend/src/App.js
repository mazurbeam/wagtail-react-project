import React from 'react'
import { ThemeProvider } from 'styled-components'
import { ConnectedRouter } from 'connected-react-router'

import ParticlesWrapper from './components/ParticlesWrapper'
import Routes from './routes'
import theme from './theme/styles/theme'
import './static/css/uikit.css'

const App = ({ history }) => {
  return (
    <div>
      <ParticlesWrapper />
      <ThemeProvider theme={theme}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </ThemeProvider>
    </div>
  )
}

export default App
