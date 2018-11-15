import React, { Component } from 'react'
// import PropTypes from "prop-types";
import onClickOutside from 'react-onclickoutside'
import { color, space, width } from 'styled-system'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Box } from 'rebass'
import { Menu, Sidebar, Icon } from 'semantic-ui-react'

const NavLink = styled(Link)`
${space}
${width}
${color}
padding: 20px 10px;
text-decoration: none;
display: block;

`

// const NavList = styled.ul`
//   list-style-type: none;
// `

class Dropdown extends Component {
  constructor (props) {
    super(props)
    this.state = {
      listOpen: false
    }
  }

  handleClickOutside () {
    this.setState({
      listOpen: false
    })
  }

  toggleList () {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }))
  }

  render () {
    const { list, active, location } = this.props
    const { listOpen } = this.state
    return (
      <Box className='' p={3} position=''>
        <Box
          width={40}
          className=''
          onClick={() => this.toggleList()}
          role='presentation'
        >
          <Icon name='sidebar' inverted size='big' />
        </Box>
        <Sidebar
          as={Menu}
          vertical
          inverted
          animation='uncover'
          visible={listOpen}
        >
          <Menu.Item
            as={NavLink}
            active={active === '/'}
            to={{
              pathname: '/',
              state: { prev: false, index: -1 }
            }}
            onClick={() => this.toggleList()}
            style={{
              fontFamily: 'Montserrat',
              color: '#c0ccd4'
            }}
          >
            Home
          </Menu.Item>
          {list.map((item, index) => (
            <Menu.Item
              key={item.meta.id}
              name={item.meta.slug}
              as={NavLink}
              onClick={() => this.toggleList()}
              active={active === `/${item.meta.slug}`}
              to={{
                pathname: `/${item.meta.slug}`,
                state: {
                  index,
                  prev: location.state ? location.state.index < index : false
                }
              }}
              style={{
                fontFamily: 'Montserrat',
                color: '#c0ccd4'
              }}
            >
              {item.title}
            </Menu.Item>
          ))}
          <Menu.Item
            as={NavLink}
            name='contact'
            active={active === '/contact'}
            to={{
              pathname: '/contact',
              state: { prev: true, index: 10 }
            }}
            onClick={() => this.toggleList()}
            style={{
              fontFamily: 'Montserrat',
              color: '#c0ccd4'
            }}
          >
            Contact
          </Menu.Item>
        </Sidebar>
      </Box>
    )
  }
}

// Dropdown.propTypes = {};

export default onClickOutside(Dropdown)
