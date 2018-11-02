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

import {createNewMessage} from '../services/actions/contact';
import ContactForm from "../components/ContactForm";
import { fetchPageChildren, fetchPageWithId } from "../services/actions/page";


class ContactPage extends Component {
  state = {
    submitted: false
  }

  submit = values => {
    const {createMessage} = this.props;
    console.log(values)
    createMessage(values.name, values.email, values.message)
    this.setState({submitted: true})
  }

  toggleForm = () => {
    const { submitted } = this.state;
    this.setState({submitted: !submitted})
  }



  render() {
    const {submitted} = this.state;

    return(
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
            {submitted ?
              <Segment>
                <Header icon
                  as='h3'
                >
                  <Icon name='envelope outline'/>
                Thank you :)
                </Header>
                <Button onClick={this.toggleForm}>Reset</Button>
              </Segment>  : <ContactForm onSubmit={this.submit}/>}

          </Container>
        </Segment>
      </div>
    )
  }
}



function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = dispatch => ({
  createMessage(name, email, message) {
    dispatch(createNewMessage(name, email, message));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactPage);
