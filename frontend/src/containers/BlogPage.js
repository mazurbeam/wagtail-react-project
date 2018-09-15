import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import styled from "styled-components";

import { Box, Text, Card } from "rebass";

import {
  // fetchMainMenu,
  // fetchPageType,
  // fetchPageChildren,
  fetchPageWithId
} from "../services/actions/page";
import * as reducers from "../services/reducers";

// components
import Loading from "../components/Loading";
// import Dropdown from '../components/Dropdown';

import renderPageBody from "../utils";


const Wrapper = styled.div`

`;

class BlogPage extends Component {
  state = {
    loading: true
  };

  componentWillMount() {
    this.setState({ loading: true });

    const { id, getPageDetails } = this.props;
    console.log("willmount props", this.props);

    getPageDetails(id);
    this.setState({ loading: false });
  }

  addIcons = menu => {
    const menuWithIcons = menu.map(item => {
      switch (item.meta.slug) {
        case 'blog':
          return {
            ...item,
            icon: 'icon: social'
          };
        case 'about':
          return {
            ...item,
            icon: 'icon: question'
          };
        default:
          return ({
            ...item,
            icon: 'icon: bolt'
          })
      }
    });
    return menuWithIcons;
  };


  render() {
    const { loading } = this.state;
    // console.log(page);
    const {  details } = this.props;
    // console.log('blogpage details', details);
    // const iconmenu = this.addIcons(menu)
    const detailsHasTags = Object.prototype.hasOwnProperty.call(
      details,
      "tags"
    );
    if (!detailsHasTags) {
      details.title = "";
      details.intro = "";
      details.tags = [];
      details.body = [];
    }
    const body = renderPageBody(details.body);
    return (
      <Wrapper>
        {loading ? (
          <Loading/>
        ) : (
          <Wrapper className="">

            <Box className="uk-position-large"
                               color="white" pt={80} >

              <Box   className="">
                <Text color="whitish" className="">
                  {details.title}
                </Text>
                <Text className="">Written {details.date}</Text>
                <Text className="">
                  Tags:
                  {details.tags.map(tag => (
                    <span className="uk-badge" key={tag}>
                      {tag}
                    </span>
                  ))}
                </Text>
              </Box>
            </Box>

            <Card
              className=""
              color="slate"
              bg="whitish"
              p={3}
              mt={[ 50]}
              mx={[0,10]}
              borderRadius={8}
              boxShadow="0 2px 16px rgba(0, 0, 0, 0.25)"
            >

                <div>{body}</div>

            </Card>

          </Wrapper>
        )}
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  details: reducers.refreshPage(state),
  children: reducers.refreshPageChildren(state),
  menu: reducers.refreshMenu(state)
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
  )(BlogPage)
);
