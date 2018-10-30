import React, { Component } from 'react';
// import Header from '../components/Header'
/* eslint no-unused-vars: ["off", { "caughtErrorsIgnorePattern": "^ignore" }] */

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Box, Heading, Text } from 'rebass';
import {
  Button,
  Container,
  Header,
  Icon,
  Image,
  Segment,

} from 'semantic-ui-react'
import axios from 'axios';

import { fetchAllPages } from '../services/actions/page';
// import * as reducers from '../services/reducers';
import renderPageBody from '../utils';

import ContactForm from '../components/ContactForm';

class Home extends Component {
  state = {
    page: {}
  };

  componentDidMount() {
    axios.get('/api/v2/pages/?type=home.HomePage&fields=*').then(res => {
      const page = res.data.items[0];
      this.setState({ page });
    });
    const { getPages } = this.props;
    getPages();
  }

  render() {
    const { page } = this.state;
    // console.log('homepage', page);
    const pageHasBody = Object.prototype.hasOwnProperty.call(page, 'body');
    if (!pageHasBody) {
      page.body = [];
    }
    const body = renderPageBody(page.body);
    return (
      <div>
        <Segment
          textAlign='center'
          style={{ minHeight: 700, padding: '1em 0em' }}
          vertical
        >
        <Container text >
          <Header
            as='h1'
            content={page.title}
            style={{
              fontSize:  '4em',
              fontWeight: 'normal',
              marginBottom: 0,
              marginTop:  '3em',
            }}
          />
          <Header
            as='h2'
            content={page.introduction}
            style={{
              fontSize:'1.7em',
              fontWeight: 'normal',
              marginTop:  '1.5em',
            }}
          />
          <Button primary size='huge'>
            Contact Me
            <Icon name='right arrow' />
          </Button>
          <Text color="whitish">{body}</Text>

        </Container>
        </Segment>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  pages: state.page.pages
});

const mapDispatchToProps = dispatch => ({
  getPages: () => dispatch(fetchAllPages())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
