import React, { Component } from "react";
import { connect } from "react-redux";
import { Box, Heading, Text } from "rebass";
import { Container, Grid } from "semantic-ui-react";

import { fetchPageChildren, fetchPageWithId } from "../services/actions/page";
import * as reducers from "../services/reducers";

import { Wrapper } from "../components/base/styles";
import ProjectCard from "../components/ProjectCard";

class ProjectIndexPage extends Component {
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
      getPageChildren(id, "projects.ProjectPage");
    }
  }

  componentDidMount() {
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
              <Box color="" mx={0} pt={[250]} className=" ">
                {children && (
                  <Grid centered stackable columns={2}>
                    {children.items.map(child => (
                      <Grid.Column key={child.id}>
                        <ProjectCard parent={pathname} item={child} />
                      </Grid.Column>
                    ))}
                  </Grid>
                )}
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
