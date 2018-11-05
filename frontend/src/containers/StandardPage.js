import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
/* eslint no-unused-vars: ["off", { "caughtErrorsIgnorePattern": "^ignore" }] */

import {

  Segment,

} from 'semantic-ui-react'

import { Box, Heading, Card, Text } from 'rebass';

// import axios from 'axios';
import {
  // fetchPageType,
  fetchPageChildren,
  fetchPageWithId
} from '../services/actions/page';
import * as reducers from '../services/reducers';
import renderPageBody from '../utils';

const Wrapper = styled.div``;

class StandardPage extends Component {
  state = {
    loading: true
  };

  componentWillMount() {
    this.setState({ loading: true });

    const { id, getPageDetails, getPageChildren, details } = this.props;
    console.log('willmount props', this.props);

    getPageDetails(id);
    getPageChildren(id);
    this.setState({ loading: false });
  }

  componentDidMount() {
    // const { id, getPageDetails } = this.props;
  }

  isEmpty = obj => {
    const values = Object.values(obj);
    if (values.length > 0) {
      return false;
    }
    return true;
  };

  render() {
    const { page, loading } = this.state;
    console.log(page);
    // let imageUrl;
    const { details } = this.props;
    console.log('details', details);
    // if (loading === false) {
    //   imageUrl = `http://localhost:8000${details.image_thumbnail.url}`;
    // }
    // if (this.isEmpty(details)) {
    //   details = { title: '', body: [] };
    // }
    // const detailsHasBody = Object.prototype.hasOwnProperty.call(
    //   details,
    //   'body'
    // );
    // if (!detailsHasBody) {
    //   details.body = [];
    // }
    let body = []
    if(details){
      body = renderPageBody(details.body);
    } 
    
    return (
      <Wrapper>
        <Segment
          textAlign='center'
          style={{ minHeight: 700, padding: '1em 0em' }}
          vertical
        >
          {!details ? (
            <Text>Loading...</Text>
          ) : (
            <Wrapper>
              <Box pt={80} className="uk-position-large uk-position-top-center">
                <Heading fontSize={5}>{details.title}</Heading>
                <Heading
                  fontSize={2}
                  dangerouslySetInnerHTML={{ __html: details.intro }}
                />
              </Box>
              <Card   color="slate"
                      bg="white"
                      p={3}
                      mt={[ 150]}
                      mx={[0,10]}
                      borderRadius={8}
                      boxShadow="0 2px 16px rgba(0, 0, 0, 0.25)"
              >{body}</Card>
            </Wrapper>
          )}
        </Segment>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state, props) => ({
  pathname: state.router.location.pathname,
  details: reducers.refreshPage(state, props.id),
  children: reducers.refreshPageChildren(state)
});

const mapDispatchToProps = dispatch => ({
  getPageChildren(id) {
    dispatch(fetchPageChildren(id));
  },
  getPageDetails(id) {
    dispatch(fetchPageWithId(id));
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(StandardPage)
);
