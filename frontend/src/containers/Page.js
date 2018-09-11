import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// import axios from 'axios';
import { Box, Heading, Text } from 'rebass';

import * as reducers from '../services/reducers';
import {
  fetchPageMeta,
  fetchPageWithId,
  fetchPageChildren
} from '../services/actions/page';

import BlogIndexPage from './BlogIndexPage';
import StandardPage from './StandardPage';

class Page extends Component {
  state = {
    refresh: false,
    loading: true,
    meta: { items: [] },
    type: '',
    page: { title: '' },
    childPages: []
  };

  componentWillMount() {
    this.setState({ loading: true });

    const { getPageMeta, meta, match } = this.props;
    console.log('Page match', match);
    // const state = { type: 'blog.BlogIndexPage' };
    console.log('will mount meta', meta);
    // getPageMeta(match.params.slug);
    getPageMeta(match.params.slug);
    this.setState({ loading: false });
  }

  componentDidMount() {
    // const { getPageDetails, meta } = this.props;
    // getPageDetails(meta[0].id);
  }

  render() {
    const { page, loading } = this.state;

    const { meta } = this.props;
    console.log('props', this.props);
    let pageSpace = <Text>Loading...</Text>;
    if (meta.meta.type === 'blog.BlogIndexPage') {
      pageSpace = <BlogIndexPage id={meta.id} />;
      // pageSpace = (
      //   <Text>
      //     {meta.title}
      //     ...
      //   </Text>
      // );
    }
    if (meta.meta.type === 'pages.StandardPage') {
      pageSpace = <StandardPage id={meta.id} />;
      // pageSpace = (
      //   <Text>
      //     {meta.title}
      //     ...
      //   </Text>
      // );
    }

    return (
      <Box>
        <Heading>{page.title}</Heading>
        {loading ? pageSpace : pageSpace}
      </Box>
    );
  }
}

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  meta: state.page.meta,
  details: reducers.refreshPage(state)
});

const mapDispatchToProps = dispatch => ({
  getPageMeta(slug) {
    dispatch(fetchPageMeta(slug));
  },
  getPageDetails(id) {
    dispatch(fetchPageWithId(id));
  },
  getPageChildren(id) {
    dispatch(fetchPageChildren(id));
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Page)
);
