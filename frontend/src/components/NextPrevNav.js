import React, { Fragment } from 'react'

import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import { Box } from 'rebass'

const NextPrevNav = ({ locations }) => (
  <Fragment>
    <Box
      className='uk-visible@s'
      color='white'
      css={{ position: 'absolute', left: '10px', top: '50%', zIndex: 1 }}
    >
      <Link to={locations.prev}>
        <Icon size='big' color='grey' className='chevron left' />
      </Link>
    </Box>
    <Box
      className='uk-visible@s'
      color='white'
      css={{ position: 'absolute', right: '10px', top: '50%', zIndex: 1 }}
    >
      <Link to={locations.next}>
        <Icon size='big' color='grey' className='chevron right' />
      </Link>
    </Box>
    <Box
      className='uk-hidden@s'
      color='white'
      css={{ position: 'absolute', left: '10px', top: '15%', zIndex: 1 }}
    >
      <Link to={locations.prev}>
        <Icon size='big' color='grey' className='chevron left' />
      </Link>
    </Box>
    <Box
      className='uk-hidden@s'
      color='white'
      css={{ position: 'absolute', right: '10px', top: '15%', zIndex: 1 }}
    >
      <Link to={locations.next}>
        <Icon size='big' color='grey' className='chevron right' />
      </Link>
    </Box>
  </Fragment>
)

export default NextPrevNav
