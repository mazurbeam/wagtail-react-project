import React, { Component } from "react";
import { connect } from "react-redux";
import { Flex, Box, Heading, Text } from "rebass";
import { Container } from "semantic-ui-react";

import { fetchPageChildren, fetchPageWithId } from "../services/actions/page";
import * as reducers from "../services/reducers";

import { Wrapper } from "../components/base/styles";
import ProjectCard from "../components/ProjectCard";

class ProjectIndexPage extends Component {
  state = {
    loading: true
  };

  componentWillMount() {}

  componentDidMount() {
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
      getPageChildren(id, "projects.ProjectPage");
    }
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    const { details, children, pathname } = this.props;
    console.log("project index page props", this.props);
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
              <Flex
                flexWrap="wrap"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                mx="auto"
                pt={[250]}
                className=" "
                width={1}
              >
                {children &&
                  children.items.map(child => (
                    <Box key={child.id} p={3}>
                      <ProjectCard parent={pathname} item={child} />
                    </Box>
                  ))}
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
)(ProjectIndexPage);
