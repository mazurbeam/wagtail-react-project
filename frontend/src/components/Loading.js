import React from 'react';

import Loader from 'react-loader-spinner';

// const Spinner = require('react-spinkit');

const Loading = () => (
  <div className="uk-position-large uk-position-center">
    <Loader type="Puff" color="#00BFFF" height="100" width="100" />
  </div>
);

export default Loading;
