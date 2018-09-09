import React from 'react';
import PropTypes from 'prop-types';

import { ConnectedRouter } from 'connected-react-router';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import routes from './routes';

const App = () => {
  return <Router history={history}>{routes}</Router>;
};

export default App;
