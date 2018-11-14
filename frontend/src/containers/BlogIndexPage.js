import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

// import axios from 'axios';
import { Box, Heading } from "rebass";
import { Container, Icon, Item, Segment } from "semantic-ui-react";
import {
  // fetchPageType,
  fetchPageChildren,
  fetchPageWithId
} from "../services/actions/page";
import * as reducers from "../services/reducers";
import { Wrapper } from "../components/base/styles";

import Loading from "../components/Loading";

class BlogIndexPage extends Component {
  state = {
    loading: true
  };

  componentWillMount() {
    this.setState({ loading: true });
    const { id, getBlogPages, getPageDetails } = this.props;

    getPageDetails(id);
    getBlogPages(id, "blog.BlogPage");
  }

  componentDidMount() {
    const { details } = this.props;
    console.log("bpi did mount details", details);
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;

    const { pathname, details, children } = this.props;

    return (
      <Wrapper>
        <Container>
          {loading || !details || !children ? (
            <Loading />
          ) : (
            <Wrapper>
              <Box
                pt={80}
                color=""
                className="uk-position-large uk-position-top-center"
              >
                <Heading color="white" fontSize={5}>
                  {details.title}
                </Heading>
                <Heading
                  fontSize={2}
                  dangerouslySetInnerHTML={{ __html: details.intro }}
                />
              </Box>
              <Box color="" mx={[20, 40]} pt={[250]} className=" ">
                <Segment>
                  <Item.Group>
                    {children.items.map(child => (
                      <Item key={child.id}>
                        <Item.Image
                          src={child.gallery_images[0].image_medium.url}
                          alt={child.gallery_images[0].image.title}
                        />
                        <Heading>{child.title}</Heading>

                        <Item.Content verticalAlign="middle">
                          <Link
                            to={{
                              pathname: `${pathname}/${child.meta.slug}`,
                              state: { type: child.meta.type, id: child.id }
                            }}
                          >
                            {" "}
                            Read More
                            <Icon name="external alternate" />
                          </Link>
                        </Item.Content>
                      </Item>
                    ))}
                  </Item.Group>
                </Segment>
              </Box>
            </Wrapper>
          )}
        </Container>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state, props) => ({
  pathname: state.router.location.pathname,
  details: reducers.refreshPage(state, props.id),
  children: reducers.refreshPageChildren(state, props.id)
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
