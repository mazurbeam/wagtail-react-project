import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';

// import axios from 'axios';
import { Box, Heading, Card } from 'rebass';

import {
  // fetchPageType,
  fetchPageChildren,
  fetchPageWithId
} from '../services/actions/page';
import * as reducers from '../services/reducers';
// import BlogPage from './BlogPage';

import Loading from '../components/Loading';

const Wrapper = styled.div``;

class BlogIndexPage extends Component {
  state = {
    loading: true
  };

  componentWillMount() {
    this.setState({ loading: true });
    const { id, getBlogPages, getPageDetails } = this.props;
    // console.log('blogindex willmount match', match);
    // const { state } = location;
    // const { type, id } = state;

    // console.log('location state', state);
    getPageDetails(id);
    getBlogPages(id);
    this.setState({ loading: false });
  }

  // componentDidMount() {
  //   const { match } = this.props;
  //   console.log('did mount', match);
  // }

  render() {
    const { loading } = this.state;
    // console.log('blogpageindex render state childPages', childPages);

    // console.log('page meta', meta);
    // console.log('page', page);
    // console.log('page children', childPages);
    const { pathname, details, children } = this.props;
    // console.log('blogpageindex details', details);
    // console.log('blogpageindex children', children);

    // let page = { title: '', intro: '' };
    // if (loading === false) {
    //   page = { title: 'loaded', intro: 'loaded' };
    // }
    return (
      <Wrapper>
        {loading ? (
          <Loading />
        ) : (
          <Wrapper>
            <Box
              pt={80}
              color="whitish"
              className="uk-position-large uk-position-top-center"
            >
              <Heading fontSize={5}>{details.title}</Heading>
              <Heading
                fontSize={2}
                dangerouslySetInnerHTML={{ __html: details.intro }}
              />
            </Box>
            <Box color="whitish" className=" uk-position-center">
              <div>
                {children.map(child => (
                  <Card key={child.id}>
                    <Heading>{child.title}</Heading>
                    <Link
                      to={{
                        pathname: `${pathname}/${child.meta.slug}`,
                        state: { type: child.meta.type, id: child.id }
                      }}
                    >
                      Read More
                    </Link>
                  </Card>
                ))}
              </div>
            </Box>
          </Wrapper>
        )}
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  details: reducers.refreshPage(state),
  children: reducers.refreshPageChildren(state)
});

const mapDispatchToProps = dispatch => ({
  getBlogPages(id) {
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
  )(BlogIndexPage)
);
