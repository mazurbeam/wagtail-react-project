import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import styled from 'styled-components';

import { Box, Heading, Card, Text } from 'rebass';

// import axios from 'axios';

const Wrapper = styled.div``;

class BlogPage extends Component {
  state = {
    loading: true,
    meta: { items: [] },
    type: '',
    page: { title: '' },
    childPages: []
  };

  componentWillMount() {
    const { match, location } = this.props;
    console.log('blogpage match', match);
    console.log('blogpage location', location);

    // const { state } = location;
    // console.log('location state', state);
  }

  render() {
    const { loading } = this.state;
    // console.log(page);
    return (
      <Wrapper>
        <Box className="uk-position-large uk-position-top-center">
          <Heading>Blog Title</Heading>
        </Box>
        <Box className=" uk-position-center">
          {loading ? <Text>Loading...</Text> : <Card>Loaded</Card>}
        </Box>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  pathname: state.router.location.pathname
});

// const mapDispatchToProps = dispatch => ({
//   getPageMeta() {
//     dispatch(fetchMainMenu());
//   }
// });

export default withRouter(connect(mapStateToProps)(BlogPage));
