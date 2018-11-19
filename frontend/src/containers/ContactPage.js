import React, { Component } from "react";
import { connect } from "react-redux";
import { reset } from "redux-form";
import { Link } from "react-router-dom";
/* eslint no-unused-vars: ["off", { "caughtErrorsIgnorePattern": "^ignore" }] */

import {
  Button,
  Container,
  Header,
  Icon,
  Segment,
  Popup
} from "semantic-ui-react";
import { Box, Heading, Card, Text } from "rebass";
import * as reducers from "../services/reducers";
import { createNewMessage } from "../services/actions/contact";

import ContactForm from "../components/ContactForm";
import { fetchPageChildren, fetchPageWithId } from "../services/actions/page";
import NextPrevNav from "../components/NextPrevNav";
import { FadeWrapper } from "../components/base/styles";
import { getNextAndPrevPath } from "../utils";

class ContactPage extends Component {
  state = {
    submitted: false
  };

  submit = values => {
    const { createMessage } = this.props;
    console.log(values);
    createMessage(values.name, values.email, values.message);
    this.setState({ submitted: true });
  };

  toggleForm = () => {
    const { submitted } = this.state;
    this.setState({ submitted: !submitted });
  };

  clearForm = () => {
    console.log("clearing form");
    const { resetForm } = this.props;
    resetForm();
  };

  render() {
    const { submitted } = this.state;
    const { location, menu } = this.props;
    let sideNav = { next: "/", prev: "/" };
    if (menu.length > 0) {
      sideNav = getNextAndPrevPath(menu, location);
    }
    console.log(sideNav);
    return (
      <FadeWrapper>
        <NextPrevNav locations={sideNav} />
        <Container>
          <Box mx="auto" p={4} css={{ minHeight: 700, maxWidth: 500 }} vertical>
            <Heading
              color="white"
              fontFamily="mont"
              fontSize={["3em", "3.7em"]}
              mt={["2.6em", "3em"]}
              mx="auto"
              pb="1em"
            >
              Contact Me
            </Heading>

            {submitted ? (
              <Segment inverted>
                <Header icon as="h3">
                  <Icon name="envelope outline" />
                  Thank you :)
                </Header>
                <Segment.Inline>
                  <Button onClick={this.toggleForm} reset={this.clearForm()}>
                    Reset
                  </Button>
                </Segment.Inline>
              </Segment>
            ) : (
              <Segment>
                <ContactForm onSubmit={this.submit} />
              </Segment>
            )}
          </Box>
        </Container>
      </FadeWrapper>
    );
  }
}

const mapStateToProps = state => ({
  menu: reducers.refreshMenu(state),
  location: state.router.location
});

const mapDispatchToProps = dispatch => ({
  createMessage(name, email, message) {
    dispatch(createNewMessage(name, email, message));
  },
  resetForm() {
    dispatch(reset("contact"));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactPage);
