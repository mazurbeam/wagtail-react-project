import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import axios from 'axios';
import { Box, Heading, Text } from 'rebass';
// import { fetchPageMeta } from '../services/actions/page';

import BlogIndexPage from './BlogIndexPage';

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
    const { match } = this.props;
    // console.log(match);
    axios.get(`/api/v2/pages/?slug=${match.params.slug}&fields=*`).then(res => {
      const { meta } = res.data.items[0];
      const { type } = meta;
      // this.setState({ meta, type });
      axios.get(`/api/v2/pages/?type=${meta.type}&fields=*`).then(res2 => {
        const page = res2.data.items[0];
        axios.get(`/api/v2/pages/?child_of=${page.id}`).then(res3 => {
          const childPages = res3.data;
          this.setState({ meta, type, page, childPages, loaded: true });
        });
      });
    });
  }

  render() {
    const { meta, page, type, childPages, loaded } = this.state;
    console.log(this.state);
    console.log('page meta', meta);
    console.log('page', page);
    console.log('page children', childPages);

    return (
      <Box>
        <Heading>{page.title}</Heading>
        {loaded && type === 'blog.BlogIndexPage' ? (
          <BlogIndexPage page={page} childPages={childPages} />
        ) : (
          <Text>Standard Page </Text>
        )}
      </Box>
    );
  }
}

const mapStateToProps = state => ({
  state
});

// const mapDispatchToProps = dispatch => ({
//   getPageMeta() {
//     dispatch(fetchMainMenu());
//   }
// });

export default withRouter(connect(mapStateToProps)(Page));
