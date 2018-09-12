import React, { Component } from 'react';
import { connect } from 'react-redux';
/* eslint no-unused-vars: ["off", { "caughtErrorsIgnorePattern": "^ignore" }] */
import { bindActionCreators } from 'redux';

import { withRouter, Link } from 'react-router-dom';

import { Box, Flex, Card } from 'rebass';

import styled from 'styled-components';
import { color, space, width, disply, height, position } from 'styled-system';

import axios from 'axios';

import { fetchMainMenu } from '../services/actions/page';
import * as reducers from '../services/reducers';
// import fetchPages from '../services/api';

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
text-decoration: none;
`;

NavItem.displayName = 'NavItem';

class Header extends Component {
  state = {
    loading: true,
    pages: { items: [] }
  };

  props = this.props;

  componentDidMount() {
    const { getMenu, menu } = this.props;
    getMenu();
  }

  render() {
    const { pages } = this.state;
    const { items } = pages;
    const { menu, getMenu } = this.props;

    // if (loading) {
    //   getMenu();
    //   this.setState({ loading: false });
    // }
    return (
      <div>
        <Box className="uk-hidden@s uk-uk-position-medium uk-position-center-top">
          <ul className="uk-nav">
            <li>
              <NavLink className="uk-link-heading" color="whitish" to="/">
                Home
              </NavLink>
            </li>
            {menu.map(item => (
              <li>
                <NavLink
                  className="uk-link-heading"
                  color="white"
                  key={item.id}
                  to={item.meta.slug}
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </Box>

        <Box
          position="fixed"
          className="uk-visible@s main-menu uk-position-medium uk-position-center-left uk-overlay"
          height={1}
        >
          <ul className="uk-nav ">
            <li>
              <NavLink className="uk-nav-header" color="whitish" to="/">
                Home
              </NavLink>
            </li>
            {menu.map(item => (
              <li key={item.id}>
                <NavLink
                  className="uk-nav-header"
                  color="white"
                  key={item.id}
                  to={{
                    pathname: `/${item.meta.slug}`
                  }}
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </Box>
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
