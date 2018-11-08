import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import {
  Sidebar,
  Menu,
  Container,
  Segment,
  Button,
  Icon,
  Responsive
} from "semantic-ui-react";

const NavLink = styled(Link)`
${space}
${width}
${color}
padding: 20px 10px;
text-decoration: none;
display: block;

`;

class SidebarMenu extends Component {
  state = { sidebarOpened: false };

  handlePusherClick = () => {
    const { sidebarOpened } = this.state;

    if (sidebarOpened) this.setState({ sidebarOpened: false });
  };

  handleToggle = () => {
    const { sidebarOpened } = this.state;
    this.setState({ sidebarOpened: !sidebarOpened });
  };

  render() {
    const { children, menu, active } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="uncover"
            inverted
            vertical
            visible={sidebarOpened}
          >
            <Menu.Item as={NavLink} active={active === "/"}>
              Home
            </Menu.Item>
            {menu.map(item => (
              <Menu.Item
                key={item.meta.id}
                name={item.meta.slug}
                as={NavLink}
                active={active === `/${item.meta.slug}`}
                to={{ pathname: `/${item.meta.slug}` }}
                style={{
                  fontFamily: "Montserrat",
                  color: "#c0ccd4"
                }}
              >
                {item.title}
              </Menu.Item>
            ))}
            <Menu.Item as="a">Work</Menu.Item>
            <Menu.Item as="a">Company</Menu.Item>
            <Menu.Item as="a">Careers</Menu.Item>
            <Menu.Item as="a">Log in</Menu.Item>
            <Menu.Item as="a">Sign Up</Menu.Item>
          </Sidebar>

          <Sidebar.Pusher
            dimmed={sidebarOpened}
            onClick={this.handlePusherClick}
            style={{ minHeight: "100vh" }}
          >
            <Segment
              inverted
              textAlign="center"
              style={{ minHeight: 350, padding: "1em 0em" }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size="large">
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name="sidebar" />
                  </Menu.Item>
                  <Menu.Item position="right">
                    <Button as="a" inverted>
                      Log in
                    </Button>
                    <Button as="a" inverted style={{ marginLeft: "0.5em" }}>
                      Sign Up
                    </Button>
                  </Menu.Item>
                </Menu>
              </Container>
            </Segment>
            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>
    );
  }
}

export default SidebarMenu;
