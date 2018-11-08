import React, { Component } from "react";
import { connect } from "react-redux";
/* eslint no-unused-vars: ["off", { "caughtErrorsIgnorePattern": "^ignore" }] */
import { withRouter, Link } from "react-router-dom";

import { Box, Flex, Card } from "rebass";
import { Menu, Container, Segment } from "semantic-ui-react";
import styled from "styled-components";
import {
  color,
  space,
  width,
  disply,
  height,
  position,
  fontFamily
} from "styled-system";

import { fetchMainMenu, fetchPageWithId } from "../services/actions/page";
import * as reducers from "../services/reducers";
// import fetchPages from '../services/api';

//components
import Dropdown from "../components/Dropdown";

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
${fontFamily}
padding: 20px;
text-decoration: none;
display: inline-block;

`;

NavItem.displayName = "NavItem";

class Header extends Component {
  state = {
    loading: true,
    pages: { items: [] },
    activeItem: "home"
  };

  props = this.props;

  componentWillMount() {
    const { getMenu, menu } = this.props;
    getMenu();
  }

  componentDidMount() {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  addIcons = menu => {
    const menuWithIcons = menu.map(item => {
      switch (item.meta.slug) {
        case "blog":
          return {
            ...item,
            icon: "icon: social"
          };
        case "about":
          return {
            ...item,
            icon: "icon: question"
          };
        default:
          return {
            ...item,
            icon: "icon: bolt"
          };
      }
    });
    return menuWithIcons;
  };

  render() {
    const { pages, activeItem } = this.state;
    const { items } = pages;
    const { menu, getMenu, pathname } = this.props;
    const iconMenu = this.addIcons(menu);
    // console.log("icon menu", iconMenu);
    return (
      <Menu fixed="top" pointing secondary inverted>
        <Box
          width={5 / 6}
          position="absolute"
          className="uk-position-z-index uk-hidden@s "
        >
          <Dropdown className="" list={iconMenu} />
        </Box>
        <Container textAlign="center" centered className="uk-visible@s">
          <Menu.Item
            name="home"
            as={Link}
            to="/"
            active={pathname === "/"}
            onClick={this.handleItemClick}
            style={{
              fontFamily: "Montserrat",
              color: "#c0ccd4"
            }}
          >
            Home
          </Menu.Item>
          {iconMenu.map(item => (
            <Menu.Item
              key={item.meta.id}
              name={item.meta.slug}
              as={NavLink}
              active={pathname === `/${item.meta.slug}`}
              to={{ pathname: `/${item.meta.slug}` }}
              onClick={this.handleItemClick}
              style={{
                fontFamily: "Montserrat",
                color: "#c0ccd4"
              }}
            >
              {item.title}
            </Menu.Item>
          ))}
          <Menu.Item
            name="contact"
            as={NavLink}
            to="/contact"
            active={pathname === "/contact"}
            onClick={this.handleItemClick}
            style={{
              fontFamily: "Montserrat",
              color: "#c0ccd4"
            }}
          >
            Contact
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  menu: reducers.refreshMenu(state)
});

const mapDispatchToProps = dispatch => ({
  getMenu: () => dispatch(fetchMainMenu()),
  getPageDetails: id => dispatch(fetchPageWithId(id))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
