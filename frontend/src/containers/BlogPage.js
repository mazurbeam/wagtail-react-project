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
import HeadingBlock from '../components/HeadingBlock';
// import axios from 'axios';

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

  renderPageBody = body => {
    const result = (
      <Wrapper css="overflow: scroll; position: absolute;">
        {body.map(item => {
          if (item.type === 'heading_block') {
            return <HeadingBlock key={item.id} value={item.value} />;
          }
          return (
            <div
              key={item.id}
              // eslint-disable-next-line
              dangerouslySetInnerHTML={{ __html: item.value }}
            />
          );
        })}
      </Wrapper>
    );
    return result;
  };

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
    const body = this.renderPageBody(details.body);
    return (
      <Wrapper>
        <Box p={0} ml={[0, 200]}>
          {loading ? (
            <Loading />
          ) : (
            <Wrapper className=" ">
              <Heading className="uk-position-top-center">Blog</Heading>

              <Box mt={[120, 200]} className="">
                <h4 className="uk-article-title">{details.title}</h4>
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
                p={3}
                borderRadius={8}
                boxShadow="0 2px 16px rgba(0, 0, 0, 0.25)"
              >
                <Box>{body}</Box>
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
