import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ConnectedRouter } from 'connected-react-router';
import { Route, Link } from 'react-router-dom';
import routes from './routes';

const App = ({ history }) => {
  return <ConnectedRouter history={history}>{routes}</ConnectedRouter>;
};

export default App;
