import React, { Component } from 'react';
import { connect } from 'react-redux';
/* eslint no-unused-vars: ["off", { "caughtErrorsIgnorePattern": "^ignore" }] */
import { bindActionCreators } from 'redux';

import { withRouter, Link } from 'react-router-dom';

import { Box, Flex, Card } from 'rebass';
import { Menu, Container } from 'semantic-ui-react';
import styled from 'styled-components';
import { color, space, width, disply, height, position,  } from 'styled-system';

import axios from 'axios';

import { fetchMainMenu } from '../services/actions/page';
import * as reducers from '../services/reducers';
// import fetchPages from '../services/api';

//components
import Dropdown from '../components/Dropdown';


const Toolbar = props => (
  <Flex
    px={2}
    color="white"
    bg="black"
    height={1}
    alignItems="center"
    {...props}
  />
);

const NavItem = props => <Box {...props} width={1} my="auto" height={1} />;

const NavLink = styled(Link)`
${space}
${width}
${color}
padding: 20px;
text-decoration: none;
display: inline-block;

`;

NavItem.displayName = 'NavItem';

class Header extends Component {
  state = {
    loading: true,
    pages: { items: [] },
    activeItem: 'home'
  };

  props = this.props;

  componentWillMount() {}

  componentDidMount() {
    const { getMenu, menu } = this.props;
    getMenu();
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  addIcons = menu => {
    const menuWithIcons = menu.map(item => {
      switch (item.meta.slug) {
        case 'blog':
          return {
            ...item,
            icon: 'icon: social'
          };
        case 'about':
          return {
            ...item,
            icon: 'icon: question'
          };
        default:
          return{
            ...item,
            icon: 'icon: bolt'
          }
      }
    });
    return menuWithIcons;
  };

  render() {
    const { pages, activeItem } = this.state;
    const { items } = pages;
    const { menu, getMenu } = this.props;
    const iconMenu = this.addIcons(menu);
    console.log('icon menu', iconMenu);
    return (
      <div>
        <Menu fixed='top' inverted >
          <Container>
          <Menu.Item as='a' header >
            Project Name
          </Menu.Item>
          <Menu.Item as={NavLink} to="/" active={activeItem === 'home'} onClick={this.handleItemClick}>Home</Menu.Item>
            {iconMenu.map(item => (
              <Menu.Item as={NavLink} active={activeItem === item.title} to={{
                pathname: `/${item.meta.slug}`
              }}>{item.title}</Menu.Item>
              ))}

            <NavLink
              color=""
              to="https://github.com/mazurbeam/"
              target="_blank"
            >
              {' '}
              <span uk-icon="icon: github-alt; ratio: 1.5" />{' '}
            </NavLink>
            <NavLink
              color=""
              to="https://www.linkedin.com/in/walter-mazur-02803453/"
              target="_blank"
            >
              <span uk-icon="icon: linkedin; ratio: 1.5" />
            </NavLink>
          </Container>
        </Menu>
      <Flex
        px={2}
        color=''
        bg=''
        alignItems='center'
        width={1}
      >
        <Box width={5/6} color='' position='absolute' className="uk-position-z-index uk-hidden@s ">
          <Dropdown className="" list={iconMenu}/>

        </Box>
        <Box mx='auto'/>
        <Box
          position=""
          className="uk-visible@s"
        >

              <NavLink className="" color="" to="/">
                Home
              </NavLink>
            {iconMenu.map(item => (
                <NavLink
                  className=""
                  color=""
                  key={item.id}
                  to={{
                    pathname: `/${item.meta.slug}`
                  }}
                >
                  {item.title}
                </NavLink>
            ))}
        </Box>
        <Box mx='auto'/>
        <Box
          position=""
          className="uk-position-top-right"
        >

        </Box>

      </Flex>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  menu: reducers.refreshMenu(state)
});

const mapDispatchToProps = dispatch => ({
  getMenu: () => dispatch(fetchMainMenu())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
