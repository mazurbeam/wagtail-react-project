import React, { Fragment } from 'react'

// import { Box } from 'rebass';
import { Icon, Grid } from 'semantic-ui-react'
import styled from 'styled-components'
import { color, space, width } from 'styled-system'

// const StickyFooter = styled.footer`
//   width: 100%;
//   // flex: none;
//   height: 50px;
//   overflow-x: hidden;
//   // padding-top: 50vh;
//   position: relative;
//   bottom: 0;
//   // // top: 95%;
//   // // margin-top: auto;
//   // left: 0;
//   // color: #f5f5f5;
//   // background-color: #232741;
//   // @media (max-width: 420px) {
//   //   top: 0;
//   //   left-margin: auto;
//   // }
// `

const FooterLink = styled.a`
${space}
${width}
${color}
width: 50%;
text-align: center;
padding: 20px 10px;
text-decoration: none;
`
// const phantom = {
//   display: 'block',
//   padding: '20px',
//   height: '60px',
//   width: '100%'
// }

const Footer = () => (
  <Fragment>
    <footer className='uk-visible@s Site-footer'>
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
    </footer>
  </Fragment>
)

export default Footer
