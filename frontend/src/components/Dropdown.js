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
    const { list, active } = this.props
    const { listOpen } = this.state
    return (
      <Box className='' p={3} position=''>
        <div className='' onClick={() => this.toggleList()} role='presentation'>
          <Icon name='sidebar' inverted size='big' />
        </div>
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
            to='/'
            onClick={() => this.toggleList()}
            style={{
              fontFamily: 'Montserrat',
              color: '#c0ccd4'
            }}
          >
            Home
          </Menu.Item>
          {list.map(item => (
            <Menu.Item
              key={item.meta.id}
              name={item.meta.slug}
              as={NavLink}
              onClick={() => this.toggleList()}
              active={active === `/${item.meta.slug}`}
              to={{ pathname: `/${item.meta.slug}` }}
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
            active={active === '/contact'}
            to='/'
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
