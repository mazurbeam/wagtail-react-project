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
import BlogPage from './BlogPage';
import StandardPage from './StandardPage';

class Page extends Component {
  state = {
    loading: true
  };

  componentWillMount() {
    this.setState({ loading: true });
    const { getPageMeta, meta, match } = this.props;
    console.log('Page match', match);
    const isChildPage = Object.prototype.hasOwnProperty.call(
      match.params,
      'child'
    );
    if (isChildPage) {
      getPageMeta(match.params.child);
    } else {
      getPageMeta(match.params.slug);
    }
    // const state = { type: 'blog.BlogIndexPage' };
    console.log('will mount meta', meta);
    // getPageMeta(match.params.slug);
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
    }
    if (meta.meta.type === 'pages.StandardPage') {
      pageSpace = <StandardPage id={meta.id} />;
    }
    if (meta.meta.type === 'blog.BlogPage') {
      pageSpace = <BlogPage id={meta.id} />;
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
