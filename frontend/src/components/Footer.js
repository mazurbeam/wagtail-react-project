import React from 'react'

// import { Box } from 'rebass';
import { Icon, Segment } from 'semantic-ui-react'
import styled from 'styled-components'
import { color, space, width } from 'styled-system'

const FooterLink = styled.a`
${space}
${width}
${color}
text-align: center;
// padding: 10px 10px;
text-decoration: none;
`

const Footer = () => (
  <Segment
    basic
    className='Site-footer'
    textAlign='center'
    style={{ position: '-webkit-sticky', bottom: 10 }}
  >
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
