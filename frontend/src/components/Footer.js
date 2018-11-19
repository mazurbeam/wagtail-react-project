import React from 'react'

// import { Box } from 'rebass'
import { Icon, Segment } from 'semantic-ui-react'
// import StickyFooter from 'react-sticky-footer'

import { FooterLink } from './base/styles'

const Footer = () => (
  <Segment basic className='Site-footer' textAlign='center'>
    <FooterLink
      className='uk-nav-header'
      color='whitish'
      ml='auto'
      href='https://github.com/mazurbeam/'
      target='_blank'
    >
      {' '}
      <Icon inverted name='github' link size='big' />{' '}
    </FooterLink>
    <FooterLink
      className='uk-nav-header'
      color='whitish'
      mr='auto'
      href='https://www.linkedin.com/in/walter-mazur-02803453/'
      target='_blank'
    >
      <Icon className='icon-link' name='linkedin' link inverted size='big' />
    </FooterLink>
  </Segment>
)

export default Footer
