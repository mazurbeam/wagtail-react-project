import React, { Component } from "react";
import { connect } from "react-redux";
/* eslint no-unused-vars: ["off", { "caughtErrorsIgnorePattern": "^ignore" }] */
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from "semantic-ui-react";
import { Box, Heading, Card, Text } from "rebass";
import { reset } from "redux-form";

import { createNewMessage } from "../services/actions/contact";
import ContactForm from "../components/ContactForm";
import { fetchPageChildren, fetchPageWithId } from "../services/actions/page";

import PageAnimationWrapper from "../components/PageAnimationWrapper";

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

    return (
      <PageAnimationWrapper>
        <Segment
          textAlign="center"
          style={{ minHeight: 700, padding: "1em 0em" }}
          vertical
        >
          <Heading
            color="white"
            fontFamily="mont"
            fontSize="3.7em"
            mt="3em"
            pb="1em"
          >
            Contact Me
          </Heading>

          <Container>
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
          </Container>
        </Segment>
      </PageAnimationWrapper>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

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
