import React, { Component } from 'react';

import styled from 'styled-components';

import { Box, Heading, Card, Text } from 'rebass';

import axios from 'axios';

const Wrapper = styled.div``;

class StandardPage extends Component {
  state = {
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
    const { page, loading } = this.state;
    console.log(page);
    let imageUrl;
    if (loading === false) {
      imageUrl = `http://localhost:8000${page.image_thumbnail.url}`;
    }
    return (
      <Wrapper>
        <Box className="uk-position-large uk-position-top-center">
          <Heading>{page.title}</Heading>
        </Box>
        <Box className=" uk-position-center">
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <Card bg={imageUrl}>
              <img src={imageUrl} alt="about" />
              {page.body.map(block => (
                <div
                  key={block.id}
                  dangerouslySetInnerHTML={{ __html: block.value }}
                />
              ))}
            </Card>
          )}
        </Box>
      </Wrapper>
    );
  }
}

export default StandardPage;
