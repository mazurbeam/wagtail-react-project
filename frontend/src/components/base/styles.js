import React from 'react'
import { Box, Flex } from 'rebass'
import { Link } from 'react-router-dom'

import styled from 'styled-components'
import { color, space, width, fontFamily } from 'styled-system'
import { Menu, Segment } from 'semantic-ui-react'

export const StyledMenu = styled(Menu)`
${space}
${width}
${color}
${fontFamily}
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
`

export const Toolbar = props => (
  <Flex
    p={0}
    m={0}
    color='white'
    bg='black'
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
    bg='black'
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
