import React, { Component } from "react";
import { connect } from "react-redux";
import { Box, Heading } from "rebass";
import { Container, Grid, Card, Image, Label } from "semantic-ui-react";
import styled from "styled-components";

import { fetchPageChildren, fetchPageWithId } from "../services/actions/page";
import * as reducers from "../services/reducers";

const Wrapper = styled.div``;

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
    const { details, children } = this.props;
    console.log("portfolio props", this.props);
    return (
      <Wrapper>
        <Container>
          {loading || !details ? (
            <Box pt={250}>loading</Box>
          ) : (
            <Wrapper>
              <Box pt={80} className="uk-position-large uk-position-top-center">
                <Heading fontSize={5}>{details.title}</Heading>
              </Box>
              <Box color="" mx={[20, 40]} pt={[250]} className=" ">
                {children && (
                  <Grid centered stackable columns={2}>
                    {children.items.map(child => (
                      <Grid.Column key={child.id}>
                        <Card
                          centered
                          style={{
                            width: 350
                          }}
                        >
                          <Image
                            src={child.gallery_images[0].image_full.url}
                            alt={child.gallery_images[0].image.title}
                          />
                          <Card.Content>
                            <Card.Header>{child.title}</Card.Header>
                            <Card.Meta>
                              <a
                                href={child.project_url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {child.project_url}
                              </a>
                            </Card.Meta>
                            <Card.Description>{child.intro}</Card.Description>
                          </Card.Content>
                          <Card.Content extra>
                            <Label.Group color="blue">
                              {child.tags.map(item => (
                                <Label key={item}>{item}</Label>
                              ))}
                            </Label.Group>
                          </Card.Content>
                        </Card>
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
)(PortfolioIndexPage);
