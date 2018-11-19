import React from 'react'
import { Box, Flex } from 'rebass'
import { Link } from 'react-router-dom'

import styled from 'styled-components'
import { color, space, width, fontFamily } from 'styled-system'
import { Menu, Segment, Icon as SemanticIcon } from 'semantic-ui-react'

export const StyledMenu = styled(Menu)`
${space}
${width}
${color}
${fontFamily}
`

export const Icon = styled(SemanticIcon)`
${space}
${width}
${color}
&:hover {
  width: "1.5em",
  height: "1.2em"
}
`

export const FooterLink = styled.a`
${space}
${width}
${color}
text-align: right;
// padding: 20px 20px;
margin: 0;
text-decoration: none;
`

export const StyledSegment = styled(Segment)`
${space}
${width}
${color}
${fontFamily}
`

export const Wrapper = styled.div``

export const StyledLink = styled(Link)`
${space}
${width}
${color}
${fontFamily}
padding: 20px;
text-decoration: none;
display: inline-block;
.active {
    background-color: black !important;
    
}
`

export const Toolbar = props => (
  <Flex
    p={0}
    m={0}
    color='white'
    bg=''
    height={1}
    alignItems='center'
    {...props}
  />
)

export const Navbar = props => (
  <Flex
    p={0}
    m={0}
    width={1}
    color='white'
    bg=''
    height={1}
    alignItems='center'
    css={{
      position: 'fixed',
      top: '0'
    }}
    {...props}
  />
)

export const NavItem = props => (
  <Box {...props} width={1} my='auto' height={1} />
)

NavItem.displayName = 'NavItem'

export const Container = props => (
  <Box
    {...props}
    mx='auto'
    css={{
      maxWidth: '1024px'
    }}
  />
)

export const FadeWrapper = styled.div`
  .fade-enter {
    opacity: 0.01;
  }

  .fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 300ms ease-in;
  }

  .fade-exit {
    opacity: 1;
  }

  .fade-exit.fade-exit-active {
    opacity: 0.01;
    transition: opacity 300ms ease-in;
  }

  div.transition-group {
    position: relative;
  }

  section.route-section {
    position: relative;
    width: 100%;
    top: 0;
    left: 0;
  }
`
