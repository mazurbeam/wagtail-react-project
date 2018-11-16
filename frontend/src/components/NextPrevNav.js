import React, { Fragment } from 'react'

import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import { Box } from 'rebass'

const NextPrevNav = ({ locations }) => (
  <Fragment>
    <Box
      color='white'
      css={[
        { position: 'absolute', left: '10px', top: '30%', zIndex: 1 },
        { position: 'absolute', left: '10px', top: '50%', zIndex: 1 }
      ]}
    >
      <Link to={locations.prev}>
        <Icon size='big' color='grey' className='chevron left' />
      </Link>
    </Box>
    <Box
      color='white'
      css={[
        { position: 'absolute', right: '10px', top: '30%', zIndex: 1 },
        { position: 'absolute', right: '10px', top: '50%', zIndex: 1 }
      ]}
    >
      <Link to={locations.next}>
        <Icon size='big' color='grey' className='chevron right' />
      </Link>
    </Box>
  </Fragment>
)

export default NextPrevNav
