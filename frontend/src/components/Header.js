import React, { Component } from "react";
import { connect } from "react-redux";
/* eslint no-unused-vars: ["off", { "caughtErrorsIgnorePattern": "^ignore" }] */
import { withRouter, Link } from "react-router-dom";

import { Box, Flex, Card } from "rebass";
import { Menu, Container, Segment } from "semantic-ui-react";

import { fetchMainMenu, fetchPageWithId } from "../services/actions/page";
import * as reducers from "../services/reducers";
// import fetchPages from '../services/api';
import StyledLink from "./base/StyledLink";
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

NavItem.displayName = "NavItem";

class Header extends Component {
  state = {
    loading: true,
    pages: { items: [] },
    activeItem: "home"
  };

  props = this.props;

  componentDidMount() {
    const { getMenu, menu } = this.props;
    getMenu();
  }

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
    const { menu, getMenu, pathname, location } = this.props;
    const iconMenu = this.addIcons(menu);
    // console.log("icon menu", iconMenu);
    return (
      <Menu fixed="top" pointing secondary inverted>
        <Box
          width={5 / 6}
          position="absolute"
          className="uk-position-z-index uk-hidden@s "
        >
          <Dropdown
            className=""
            list={iconMenu}
            location={location}
            active={pathname}
          />
        </Box>
        <Container textAlign="center" centered className="uk-visible@s">
          <Menu.Item
            name="home"
            as={StyledLink}
            to={{
              pathname: "/",
              state: { prev: false, index: -1 }
            }}
            active={pathname === "/"}
            onClick={this.handleItemClick}
            style={{
              fontFamily: "Montserrat",
              color: "#c0ccd4",
              marginLeft: "auto"
            }}
          >
            Home
          </Menu.Item>
          {iconMenu.map((item, index) => (
            <Menu.Item
              key={item.meta.id}
              name={item.meta.slug}
              as={StyledLink}
              active={pathname === `/${item.meta.slug}`}
              to={{
                pathname: `/${item.meta.slug}`,
                state: {
                  index: index,
                  prev: location.state ? location.state.index < index : false
                }
              }}
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
            as={StyledLink}
            to={{
              pathname: "/contact",
              state: { prev: true, index: 10 }
            }}
            active={pathname === "/contact"}
            onClick={this.handleItemClick}
            style={{
              fontFamily: "Montserrat",
              color: "#c0ccd4",
              marginRight: "auto"
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
