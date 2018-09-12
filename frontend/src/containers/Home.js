import React, { Component } from 'react';
// import Header from '../components/Header'

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Box, Heading, Text } from 'rebass';
import axios from 'axios';

import { fetchAllPages } from '../services/actions/page';
// import * as reducers from '../services/reducers';
import renderPageBody from '../utils';

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
      <Box alignItems="center">
        <Box className=" uk-position-top-center ">
          <Heading className="" color="whitish">
            mazurbeam
          </Heading>
        </Box>
        <Card
          my="auto"
          className="uk-position-large uk-position-center  "
          // pt={['100%', '50%', '40%']}
        >
          <Heading p={1} mx="auto" color="whitish">
            {page.title}
          </Heading>
          <Heading p={2} fontSize={2} className="" color="whitish">
            {page.introduction}
          </Heading>
          <Box p={2}>
            <Text color="whitish">{body}</Text>
          </Box>
        </Card>
      </Box>
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
