import React, { Component } from 'react';
// import Header from '../components/Header'

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Box, Heading } from 'rebass';
import axios from 'axios';

import { fetchAllPages } from '../services/actions/page';
// import * as reducers from '../services/reducers';

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
    return (
      <div>
        <Box className="uk-position-large uk-position-top-center">
          <Heading>{page.title}</Heading>
        </Box>
        <Box className=" uk-position-center">
          <div
            className="uk-container"
            // eslint-disable-next-line
            dangerouslySetInnerHTML={{ __html: page.introduction }}
          />
        </Box>
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
