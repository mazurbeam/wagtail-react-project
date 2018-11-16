import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import { Segment, Popup } from "semantic-ui-react";
import { Box, Text, Heading, Button } from "rebass";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";

import {
  // fetchMainMenu,
  // fetchPageType,
  // fetchPageChildren,
  fetchPageWithId
} from "../services/actions/page";
import * as reducers from "../services/reducers";

// components
import { Wrapper, Container, Icon } from "../components/base/styles";
import Loading from "../components/Loading";
// import Dropdown from '../components/Dropdown';

import { renderStreamField } from "../utils";

class ProjectPage extends Component {
  state = {
    loading: true
  };

  componentWillMount() {}

  componentDidMount() {
    this.setState({ loading: true });

    const { id, getPageDetails } = this.props;
    console.log("willmount props", this.props);

    getPageDetails(id);
    this.setState({ loading: false });
  }

  isEmpty = obj => {
    const values = Object.values(obj);
    if (values.length > 0) {
      return false;
    }
    return true;
  };

  addIcons = menu => {
    const menuWithIcons = menu.map(item => {
      switch (item.meta.slug) {
        case "blog":
          return {
            ...item,
            icon: "icon: social"
          };
        case "about":
          return {
            ...item,
            icon: "icon: question"
          };
        default:
          return {
            ...item,
            icon: "icon: bolt"
          };
      }
    });
    return menuWithIcons;
  };

  render() {
    const { loading } = this.state;
    const { details } = this.props;
    let body = [];
    if (details) {
      body = renderStreamField(details.body);
    }

    return (
      <Wrapper className="">
        {loading || !details ? (
          <Loading />
        ) : (
          <Container css={{ postion: "fixed", overflowY: "auto" }}>
            <Box className="" color="" pt={80}>
              <Box
                ml={15}
                mb={40}
                css={[
                  { position: "absolute", left: "10px", top: "30%", zIndex: 1 },
                  { position: "absolute", left: "10px", top: "50%", zIndex: 1 }
                ]}
              >
                <Link
                  to={{
                    pathname: "/projects",
                    state: { prev: true, index: details.id }
                  }}
                >
                  <Popup
                    trigger={
                      <Icon inverted size="big" className="angle double left" />
                    }
                    content="Back to projects"
                  />
                </Link>
              </Box>
              <Box
                className=""
                mx="auto"
                css={{
                  maxWidth: "650px"
                }}
              >
                <Heading
                  color="white"
                  fontFamily="mont"
                  fontSize={["2.3em", "3em"]}
                >
                  {details.title}
                </Heading>{" "}
                <Text
                  color="white"
                  mt={40}
                  className=""
                  fontSize="1.3em"
                  fontFamily="work"
                >
                  {details.intro}
                </Text>
                <a
                  href={details.project_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button mx="auto" bg="#009688" mt={20}>
                    View on Github <Icon className="github" />
                  </Button>
                </a>
              </Box>
              <Box
                mt={15}
                mx="auto"
                css={{
                  maxWidth: "650px"
                }}
              >
                <AwesomeSlider
                  css={{
                    display: "inline-block",
                    width: "50%",
                    marginLeft: "auto",
                    marginRight: "auto"
                  }}
                >
                  {details.gallery_images.map(image => (
                    <div key={image.id} data-src={image.image_full.url} />
                  ))}
                </AwesomeSlider>
              </Box>
            </Box>
            {body.length > 0 && (
              <Segment>
                <Text fontFamily="work">{body}</Text>
              </Segment>
            )}
          </Container>
        )}
      </Wrapper>
    );
  }
}

const mapStateToProps = (state, props) => ({
  pathname: state.router.location.pathname,
  details: reducers.refreshPage(state, props.id)
  // children: reducers.refreshPageChildren(state),
  // menu: reducers.refreshMenu(state)
});

const mapDispatchToProps = dispatch => ({
  getPageDetails(id) {
    dispatch(fetchPageWithId(id));
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProjectPage)
);
