import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Link } from 'react-router-dom';
import Particles from 'react-particles-js';

import Routes from './routes';
import theme from './styles/theme';
import './static/css/uikit.css'

const App = ({ history }) => {
  return (
    <div>
    <Particles params={{
      "particles": {
        "number": {
            "value": 160,
            "density": {
                "enable": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "speed": 4,
                "size_min": 0.3
            }
        },
        "color":{"value":"#6f43a0"},
        "line_linked": {
            "enable": false
        },
        "move": {
            "random": true,
            "speed": 1,
            "direction": "top",
            "out_mode": "out"
        }
    },
    "interactivity": {
        "events": {
            "onhover": {
                "enable": false,
                "mode": "bubble"
            },
            "onclick": {
                "enable": false,
                "mode": "repulse"
            }
        },
        "modes": {
            "bubble": {
                "distance": 250,
                "duration": 2,
                "size": 0,
                "opacity": 0
            },
            "repulse": {
                "distance": 400,
                "duration": 4
            }
        }
    }
  }}
    style={{
      position: "fixed",
      zIndex: "0",
      backgroundColor: '#00fff9',
      width: '100%',
      height: '100%'
    }}
  />
    <ThemeProvider theme={theme}>
    
      <ConnectedRouter history={history}>
        
        <Routes />

      </ConnectedRouter>
    </ThemeProvider>
    </div>
  );
};

export default App;
