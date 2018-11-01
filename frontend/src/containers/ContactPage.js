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
import { Box, Heading, Card, Text } from 'rebass';

import ContactForm from "../components/ContactForm";


const ContactPage = (props) => (
  <div>

    <Segment
      textAlign='center'
      style={{ minHeight: 700, padding: "1em 0em" }}
      vertical
    >
      <Header
        as='h1'
        content='Contact Me'
        style={{
          fontSize:  '4em',
          fontWeight: 'normal',
          marginBottom: 0,
          marginTop:  '3em',

        }}
      />
      <Container>
        <ContactForm onSubmit={() => console.log("ProfileForm was submitted")}/>
      </Container>
    </Segment>
  </div>
);


function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps
)(ContactPage);
