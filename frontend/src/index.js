import { AppContainer } from 'react-hot-loader'
import { connectRouter } from 'connected-react-router'
import { ThemeProvider } from 'styled-components'

import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import rootReducer from './services/reducers'
import store, { history } from './services/store'
import './index.css'
// import 'semantic-ui-css/semantic.min.css';
import 'semantic-ui-less/semantic.less' // ES6
import theme from './theme/styles/theme'

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <App history={history} />
        </Provider>
      </ThemeProvider>
    </AppContainer>,
    document.getElementById('root')
  )
}

render()
// registerServiceWorker();

// Hot reloading
if (module.hot) {
  // Reload components
  module.hot.accept('./App', () => {
    render()
  })

  // Reload reducers
  module.hot.accept('./services/reducers', () => {
    store.replaceReducer(connectRouter(history)(rootReducer))
  })
}
