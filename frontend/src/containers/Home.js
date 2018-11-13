import React, { Component } from "react";
// import Header from '../components/Header'
/* eslint no-unused-vars: ["off", { "caughtErrorsIgnorePattern": "^ignore" }] */

import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Flex, Card, Box, Heading, Text } from "rebass";
import {
  Button,
  Container,
  Header,
  Placeholder,
  Icon,
  Image,
  Segment,
  Loader
} from "semantic-ui-react";

import { fontFamily } from "styled-system";

import { fetchAllPages, fetchHomePage } from "../services/actions/page";
import * as reducers from "../services/reducers";
import renderPageBody from "../utils";

import PageAnimationWrapper from "../components/PageAnimationWrapper";

import ContactForm from "../components/ContactForm";
import PageSection from "../components/PageSection";

class Home extends Component {
  state = {
    page: {},
    loading: true
  };

  componentDidMount() {
    const { getPages, getHomeDetails } = this.props;
    getHomeDetails();
    getPages();
    const { page } = this.state;
    console.log("page", page);
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    const { pages, details } = this.props;
    console.log("pages in home render", pages);

    const image = details.image_thumbnail;
    let body = [];
    if (details.body) {
      body = renderPageBody(details.body);
    }
    console.log("home body", details.body);
    return (
      <PageAnimationWrapper>
        <Segment
          textAlign="center"
          // style={{ minHeight: 700, padding: "1em 0em" }}
          vertical
          basic
        >
          <Container
            text
            // style={{
            //   zIndex: 0
            // }}
          >
            {loading || !details ? (
              <Placeholder style={{ marginTop: "100px" }}>
                <Placeholder.Header>
                  <Placeholder.Line length="very short" />
                  <Placeholder.Line length="medium" />
                </Placeholder.Header>
              </Placeholder>
            ) : (
              <div>
                <Heading
                  color="#c0ccd4"
                  mt={[50, 100]}
                  fontFamily="mont"
                  fontSize={["3em", "4em"]}
                  style={{ textTransform: "uppercase" }}
                >
                  {details.name}
                </Heading>
                <Heading
                  color="#c0ccd4"
                  fontSize={["1.4em", "1.7em"]}
                  fontFamily="work"
                  mt="0"
                  mb="1.7em"
                >
                  {details.subtitle}
                </Heading>
                {image ? (
                  <Image alt="walter mazur" src={image.url} centered circular />
                ) : (
                  <Loader />
                )}

                <Text
                  fontFamily="work"
                  m={[".05em", "1em"]}
                  p={3}
                  fontSize="1.2em"
                  color="whitish"
                >
                  {details.introduction}
                </Text>
              </div>
            )}

            <Button
              primary
              size="large"
              as={Link}
              to={{
                pathname: "/contact",
                state: { prev: true, index: 10 }
              }}
            >
              Contact Me
              <Icon className="angle right" />
            </Button>
          </Container>
        </Segment>
        {body.length > 0 && (
          <Segment>
            <Text fontFamily="work" fontSize={[1, 2]}>
              {body}
            </Text>
          </Segment>
        )}
      </PageAnimationWrapper>
    );
  }
}

const mapStateToProps = state => ({
  pages: state.page.pages,
  details: reducers.refreshHome(state)
});

const mapDispatchToProps = dispatch => ({
  getPages: () => dispatch(fetchAllPages()),
  getHomeDetails: () => dispatch(fetchHomePage())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
