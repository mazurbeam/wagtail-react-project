import React, { Fragment } from 'react'

import { Link } from 'react-router-dom'
import { Icon, Popup } from 'semantic-ui-react'
import { Box } from 'rebass'

const NextPrevNav = ({ locations }) => (
  <Fragment>
    <Box
      className='uk-visible@s'
      color='white'
      css={{ position: 'absolute', left: '10px', top: '50%', zIndex: 1 }}
    >
      <Link to={locations.prev}>
        <Popup
          inverted
          trigger={<Icon size='big' color='grey' className='chevron left' />}
          content={locations.prevTitle}
        />
      </Link>
    </Box>
    <Box
      className='uk-visible@s'
      color='white'
      css={{ position: 'absolute', right: '10px', top: '50%', zIndex: 1 }}
    >
      <Link to={locations.next}>
        <Popup
          inverted
          trigger={<Icon size='big' color='grey' className='chevron right' />}
          content={locations.nextTitle}
        />
      </Link>
    </Box>
    <Box
      className='uk-hidden@s'
      color='white'
      css={{ position: 'absolute', left: '10px', top: '15%', zIndex: 1 }}
    >
      <Link to={locations.prev}>
        <Popup
          inverted
          trigger={<Icon size='big' color='grey' className='chevron left' />}
          content={locations.prevTitle}
        />
      </Link>
    </Box>
    <Box
      className='uk-hidden@s'
      color='white'
      css={{ position: 'absolute', right: '10px', top: '15%', zIndex: 1 }}
    >
      <Link to={locations.next}>
        <Popup
          inverted
          trigger={<Icon size='big' color='grey' className='chevron right' />}
          content={locations.nextTitle}
        />
      </Link>
    </Box>
  </Fragment>
)

export default NextPrevNav
