import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import axios from 'axios';
import { Box, Heading, Card, Text } from 'rebass';

class BlogIndexPage extends Component {
  state = {
    refresh: false,
    loading: true,
    meta: { items: [] },
    type: '',
    page: { title: '' },
    childPages: []
  };

  componentWillMount() {
    const { match, location } = this.props;
    // console.log(match);
    const { state } = location;
    console.log('location state', state);

    axios
      .get(
        `/api/v2/pages/?type=${state.type}&slug=${match.params.slug}&fields=*`
      )
      .then(res => {
        const page = res.data.items[0];
        axios.get(`/api/v2/pages/?child_of=${page.id}`).then(res2 => {
          const childPages = res2.data;
          this.setState({ page, childPages, type: state.type, loading: false });
        });
      });
  }

  render() {
    const { page, childPages, loading } = this.state;
    console.log(this.state);
    // console.log('page meta', meta);
    // console.log('page', page);
    // console.log('page children', childPages);

    return (
      <Box className=" uk-position-center">
        <Heading>{page.title}</Heading>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <div>
            <div dangerouslySetInnerHTML={{ __html: page.intro }} />
            {childPages.items.map(child => (
              <Card key={child.id}>
                <Heading>{child.title}</Heading>
                <Text>{child.intro}</Text>
              </Card>
            ))}
          </div>
        )}
      </Box>
    );
  }
}

const mapStateToProps = state => ({
  pathname: state.router.location.pathname
});

// const mapDispatchToProps = dispatch => ({
//   getPageMeta() {
//     dispatch(fetchMainMenu());
//   }
// });

export default withRouter(connect(mapStateToProps)(BlogIndexPage));
