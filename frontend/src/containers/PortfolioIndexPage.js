import React, { Component } from "react";
import { connect } from "react-redux";
import { Box } from 'rebass';
import { Segment, Grid, Card, Image, Label } from 'semantic-ui-react';

import { fetchPageChildren, fetchPageWithId } from "../services/actions/page";
import * as reducers from "../services/reducers";


class PortfolioIndexPage extends Component {
  state = {
    loading: true
  };

  componentWillMount() {
    this.setState({ loading: true });
    const { id, type, getPageDetails, getPageChildren } = this.props;
    console.log('type: ', type)
    getPageDetails(id);
    getPageChildren(id, "portfolio.PortfolioPage")
  }

  componentDidMount() {
    // const { details } = this.props;
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    const {  details, children } = this.props;
    console.log('portfolio items', children)
    return (
      <div>
        {loading ? (
          <Box mt={250}>loading</Box>
        ) : (
          <Box mt={80}>
            <Segment textAlign='center'>
            {details.title}
            </Segment>

            <Segment>
            <Grid centered stackable columns={2}>
              {children.map(child => (
                <Grid.Column key={child.id}>
                <Card centered>
                  <Image src={child.gallery_images[0].image_full.url} alt={child.gallery_images[0].image.title}/>
                  <Card.Content>
                  <Card.Header>{child.title}</Card.Header>
                    <Card.Meta>
                      <a href={child.project_url} target='_blank' rel="noopener noreferrer">{child.project_url}</a>
                    </Card.Meta>
                  <Card.Description>{child.intro}</Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Label.Group color='blue'>
                    {child.tags.map(item => (
                      <Label key={item}>{item}</Label>
                    ))}
                    </Label.Group>
                  </Card.Content>
                </Card>
                </Grid.Column>
                ))
              }
            </Grid>
            </Segment>
          </Box>
        )
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  details: reducers.refreshPage(state),
  children: reducers.refreshPageChildren(state)
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
