import React from 'react'

// import { Box } from 'rebass';
import { Icon, Grid } from 'semantic-ui-react'
import styled from 'styled-components'
import { color, space, width } from 'styled-system'

const StickyFooter = styled.footer`
  width: 100%;
  // height: 40px;
  position: fixed;
  top: 95%;
  left: 0;
  color: #f5f5f5;
  // background-color: #232741;
`

const FooterLink = styled.a`
${space}
${width}
${color}
width: 50%;
text-align: center;
padding: 20px 10px;
text-decoration: none;
`

const Footer = () => (
  <StickyFooter>
    <Grid centered columns={3}>
      <Grid.Row>
        <Grid.Column />
        <Grid.Column textAlign='center' centered>
          <FooterLink
            className='uk-nav-header'
            color='whitish'
            href='https://github.com/mazurbeam/'
            target='_blank'
          >
            {' '}
            <Icon inverted name='github' link size='big' />{' '}
          </FooterLink>
          <FooterLink
            className='uk-nav-header'
            color='whitish'
            href='https://www.linkedin.com/in/walter-mazur-02803453/'
            target='_blank'
          >
            <Icon
              color='white'
              className='icon-link'
              name='linkedin'
              link
              inverted
              size='big'
            />
          </FooterLink>
        </Grid.Column>
        <Grid.Column />
      </Grid.Row>
    </Grid>
  </StickyFooter>
)

export default Footer
