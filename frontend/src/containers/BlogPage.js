import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import styled from 'styled-components';

import { Box, Heading, Card, Text } from 'rebass';

import {
  // fetchPageType,
  fetchPageChildren,
  fetchPageWithId
} from '../services/actions/page';
import * as reducers from '../services/reducers';

import Loading from '../components/Loading';
import renderPageBody from '../utils';

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
`;

class BlogPage extends Component {
  state = {
    loading: true
  };

  componentWillMount() {
    this.setState({ loading: true });

    const { id, getPageDetails, getPageChildren } = this.props;
    console.log('willmount props', this.props);

    getPageDetails(id);
    getPageChildren(id);
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    // console.log(page);
    const { details } = this.props;
    // console.log('blogpage details', details);
    const detailsHasTags = Object.prototype.hasOwnProperty.call(
      details,
      'tags'
    );
    if (!detailsHasTags) {
      details.title = '';
      details.intro = '';
      details.tags = [];
      details.body = [];
    }
    const body = renderPageBody(details.body);
    return (
      <Wrapper>
        <Box color="whitish" p={0} ml={[0, 200]}>
          {loading ? (
            <Loading />
          ) : (
            <Wrapper className=" ">
              <Heading className="uk-position-top-center">Blog</Heading>

              <Box mt={[120, 200]} className="">
                <Heading color="whitish" className="uk-article-title">
                  {details.title}
                </Heading>
                <Text className="uk-article-meta">Written {details.date}</Text>
                <Text className="uk-article-meta">
                  {' '}
                  Tags:
                  {details.tags.map(tag => (
                    <span className="uk-badge" key={tag}>
                      {tag}
                    </span>
                  ))}
                </Text>
              </Box>

              <Card
                className=""
                color="slate"
                bg="whitish"
                width={[1, 4 / 5]}
                p={[0, 3]}
                borderRadius={8}
                boxShadow="0 2px 16px rgba(0, 0, 0, 0.25)"
              >
                <Box p={1} mr={[0]}>
                  {body}
                </Box>
              </Card>
            </Wrapper>
          )}
        </Box>
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
  )(BlogPage)
);
