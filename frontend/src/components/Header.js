import React, { Component } from "react";
import { connect } from "react-redux";
/* eslint no-unused-vars: ["off", { "caughtErrorsIgnorePattern": "^ignore" }] */
import { withRouter, Link } from "react-router-dom";

import { Box } from "rebass";
import { Menu, Container, Visibility, Icon } from "semantic-ui-react";

import { fetchMainMenu, fetchPageWithId } from "../services/actions/page";
import * as reducers from "../services/reducers";
// import fetchPages from '../services/api';
import {
  Navbar,
  Toolbar,
  StyledLink,
  StyledMenu,
  StyledSegment,
  FooterLink
} from "./base/styles";
//components
import Dropdown from "../components/Dropdown";

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

  hideFixedMenu = () => this.setState({ fixed: false });

  showFixedMenu = () => this.setState({ fixed: true });

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
    const { pages, fixed } = this.state;
    const { items } = pages;
    const { menu, getMenu, pathname, location } = this.props;
    const iconMenu = this.addIcons(menu);
    // console.log("icon menu", iconMenu);
    return (
      <Visibility
        once={false}
        onBottomPassed={this.showFixedMenu}
        onBottomPassedReverse={this.hideFixedMenu}
      >
        <Menu
          as={Navbar}
          fixed="top"
          className="Site-header"
          invertfixed={fixed ? "top" : null}
          inverted
          bg="white"
          secondary={!fixed}
        >
          <Box
            width={3 / 6}
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
              as={StyledLink}
              to={{
                pathname: "/",
                state: { prev: false, index: -1 }
              }}
              active={pathname === "/"}
              onClick={this.handleItemClick}
              fontFamily="mont"
              ml="auto"
              style={{
                color: "#c0ccd4",
                fontFamily: "Montserrat",
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
          <Box css={{ position: "fixed", top: 0, right: "0" }}>
            <Menu.Item
              as={FooterLink}
              className="uk-nav-header"
              color="whitish"
              ml="auto"
              href="https://github.com/mazurbeam/"
              target="_blank"
              style={{
                fontFamily: "Montserrat",
                color: "#c0ccd4",
                marginLeft: "auto",
                display: "inline-block"
              }}
            >
              {" "}
              <Icon inverted name="github" link size="large" />{" "}
            </Menu.Item>
            <Menu.Item
              as={FooterLink}
              className="uk-nav-header"
              color="whitish"
              href="https://www.linkedin.com/in/walter-mazur-02803453/"
              target="_blank"
              style={{
                fontFamily: "Montserrat",
                color: "#c0ccd4",
                display: "inline-block"
              }}
            >
              <Icon
                className="icon-link"
                name="linkedin"
                link
                inverted
                size="large"
              />
            </Menu.Item>
          </Box>
        </Menu>
      </Visibility>
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
