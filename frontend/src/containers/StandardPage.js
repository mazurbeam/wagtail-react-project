import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { Box, Heading, Card, Text } from 'rebass';

// import axios from 'axios';
import {
  // fetchPageType,
  fetchPageChildren,
  fetchPageWithId
} from '../services/actions/page';
import * as reducers from '../services/reducers';

const Wrapper = styled.div``;

class StandardPage extends Component {
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

  componentDidMount() {
    // const { id, getPageDetails } = this.props;
  }

  isEmpty = obj => {
    const values = Object.values(obj);
    if (values.length > 0) {
      return false;
    }
    return true;
  };

  render() {
    const { page, loading } = this.state;
    console.log(page);
    // let imageUrl;
    let { details } = this.props;
    console.log('details', details);
    // if (loading === false) {
    //   imageUrl = `http://localhost:8000${details.image_thumbnail.url}`;
    // }
    if (this.isEmpty(details)) {
      details = { title: '', body: [] };
    }
    const detailsHasBody = Object.prototype.hasOwnProperty.call(
      details,
      'body'
    );
    if (!detailsHasBody) {
      details.body = [];
    }
    return (
      <Wrapper>
        <Box>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <Wrapper>
              <Box className="uk-position-large uk-position-top-center">
                <Heading fontSize={5}>{details.title}</Heading>
                <Heading
                  fontSize={2}
                  dangerouslySetInnerHTML={{ __html: details.intro }}
                />
              </Box>
              <Card className=" uk-position-center">
                {details.body.map(block => (
                  <div
                    key={block.id}
                    // eslint-disable-next-line
                    dangerouslySetInnerHTML={{ __html: block.value }}
                  />
                ))}
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
  )(StandardPage)
);
