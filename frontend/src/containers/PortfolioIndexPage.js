import React, { Component } from "react";
import { connect } from "react-redux";
import { Flex, Box, Heading, Text } from "rebass";
import { Container } from "semantic-ui-react";

import { fetchPageChildren, fetchPageWithId } from "../services/actions/page";
import * as reducers from "../services/reducers";

import { Wrapper } from "../components/base/styles";
// import DimmerCard from "../components/DimmerCard";
import ProjectCard from "../components/ProjectCard";

class PortfolioIndexPage extends Component {
  state = {
    loading: true
  };

  componentWillMount() {
    this.setState({ loading: true });
    const {
      id,
      details,
      children,
      getPageDetails,
      getPageChildren
    } = this.props;
    console.log("will mount details", details);
    if (!details) {
      console.log("no details");
      getPageDetails(id);
    }
    if (!children) {
      getPageChildren(id, "portfolio.PortfolioPage");
    }
  }

  componentDidMount() {
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    const { details, children, pathname } = this.props;
    console.log("portfolio props", this.props);
    return (
      <Wrapper>
        <Container>
          {loading || !details ? (
            <Box pt={250}>loading</Box>
          ) : (
            <Wrapper>
              <Box pt={80} className="uk-position-large uk-position-top-center">
                <Heading color="white" fontFamily="mont" fontSize="3.7em">
                  {details.title}
                </Heading>
                <Text
                  mt={50}
                  textAlign="center"
                  color="white"
                  fontFamily="mont"
                >
                  {details.intro}
                </Text>
              </Box>
              <Flex alignItems="center" mx="auto" pt={[250]} className=" ">
                <Box ml="auto" />
                {children &&
                  children.items.map(child => (
                    <Box mx="auto" key={child.id} p={3}>
                      <ProjectCard parent={pathname} item={child} />
                    </Box>
                  ))}
                <Box mr="auto" />
              </Flex>
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
  getPageDetails(id) {
    dispatch(fetchPageWithId(id));
  },
  getPageChildren(id, type) {
    dispatch(fetchPageChildren(id, type));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioIndexPage);
