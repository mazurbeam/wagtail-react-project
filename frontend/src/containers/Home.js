import React, { Component } from "react";
// import Header from '../components/Header'
/* eslint no-unused-vars: ["off", { "caughtErrorsIgnorePattern": "^ignore" }] */

import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Button, Flex, Card, Box, Heading, Text } from "rebass";
import {
  Header,
  Container,
  Placeholder,
  Icon,
  Image,
  Segment,
  Loader
} from "semantic-ui-react";
import ProgressiveImage from "react-progressive-bg-image";

import { fetchAllPages, fetchHomePage } from "../services/actions/page";
import * as reducers from "../services/reducers";
import renderPageBody from "../utils";

import { Container as MyContainer } from "../components/base/styles";
import PageAnimationWrapper from "../components/PageAnimationWrapper";

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
                  <Image
                    alt="walter mazur"
                    src={image.url}
                    centered
                    circular
                    transition="all 1s linear"
                  />
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
            <Link
              to={{
                pathname: "/contact",
                state: { prev: true, index: 10 }
              }}
            >
              <Button>
                Contact Me
                <Icon className="angle right" />
              </Button>
            </Link>
          </Container>
        </Segment>
        {body.length > 0 && (
          <MyContainer>
            <Card
              fontSize={6}
              fontWeight="bold"
              width={[1]}
              p={5}
              my={5}
              bg=""
              borderRadius={8}
              boxShadow="0 2px 16px rgba(0, 0, 0, 0.25)"
            >
              <Text fontFamily="work" color="#8facb3" fontSize={[1, 2]}>
                {body}
              </Text>
            </Card>
          </MyContainer>
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
