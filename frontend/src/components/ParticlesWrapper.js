import React, { Fragment } from 'react'
import Particles from 'react-particles-js'

const ParcticlesWrapper = () => (
  <Fragment>
    <Particles
      params={{
        particles: {
          number: {
            value: 160,
            density: {
              enable: false
            }
          },
          size: {
            value: 3,
            random: true,
            anim: {
              speed: 4,
              size_min: 0.3
            }
          },
          color: { value: '#2e9cca' },
          line_linked: {
            enable: false
          },
          move: {
            random: true,
            speed: 1,
            direction: 'top',
            out_mode: 'out'
          }
        },
        interactivity: {
          events: {
            onhover: {
              enable: false,
              mode: 'bubble'
            },
            onclick: {
              enable: false,
              mode: 'repulse'
            }
          },
          modes: {
            bubble: {
              distance: 250,
              duration: 2,
              size: 0,
              opacity: 0
            },
            repulse: {
              distance: 400,
              duration: 4
            }
          }
        }
      }}
      style={{
        position: 'fixed',
        zIndex: '0',
        backgroundColor: '#2f4454',
        width: '100%',
        height: '100%'
      }}
    />
  </Fragment>
)

export default ParcticlesWrapper
