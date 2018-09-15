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
    const { id, type, getBlogPages, getPageDetails } = this.props;
    // console.log('blogindex willmount match', match);
    // const { state } = location;
    // const { type, id } = state;

    console.log('will mount type', type);
    getPageDetails(id);
    getBlogPages(id, 'blog.BlogPage');
  }

  componentDidMount() {
    const {  details } = this.props;
    console.log('bpi did mount details', details)
    this.setState({ loading: false });

  }

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
            <Box color="whitish" mx={[20, 40]} mt={[ 250]} className=" ">
              <div>
                {children.map(child => (
                  <Card borderRadius={8}
                       bg='slate' p={3} boxShadow='0 2px 16px rgba(0, 0, 0, 0.25)' key={child.id}>
                    <img src={child.gallery_images[0].image_thumbnail.url} alt={child.gallery_images[0].image.title}/>
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
  getBlogPages(id, type) {
    dispatch(fetchPageChildren(id, type));
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
