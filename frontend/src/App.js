import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Link } from 'react-router-dom';
import routes from './routes';
import theme from './theme';

const App = ({ history }) => {
  return (
    <ThemeProvider theme={theme}>
      <ConnectedRouter history={history}>{routes}</ConnectedRouter>
    </ThemeProvider>
  );
};

export default App;
