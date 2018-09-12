import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import styled from 'styled-components';

import { Box, Heading, Card } from 'rebass';

import {
  // fetchPageType,
  fetchPageChildren,
  fetchPageWithId
} from '../services/actions/page';
import * as reducers from '../services/reducers';

import Loading from '../components/Loading';
import HeadingBlock from '../components/HeadingBlock';
// import axios from 'axios';

const Wrapper = styled.div``;

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
        <Box>
          {loading ? (
            <Loading />
          ) : (
            <Wrapper className=" ">
              <Heading className="uk-position-top-center">Blog</Heading>

              <article className="uk-article  uk-container uk-alight-right uk-width-3-5">
                <Box mt={200} className="">
                  <h4 className="uk-article-title">{details.title}</h4>
                  <p className="uk-article-meta">Written {details.date}</p>
                  <p className="uk-article-meta">
                    {' '}
                    Tags:
                    {details.tags.map(tag => (
                      <span className="uk-badge" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </p>
                </Box>

                <Card className="uk-position-small blog-body" color="slate">
                  <div>{body}</div>
                </Card>
              </article>
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
