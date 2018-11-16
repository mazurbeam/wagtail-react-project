import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Header, Segment } from "semantic-ui-react";
import { Box, Text } from "rebass";

import {
  // fetchMainMenu,
  // fetchPageType,
  // fetchPageChildren,
  fetchPageWithId
} from "../services/actions/page";
import * as reducers from "../services/reducers";

// components
import { Wrapper } from "../components/base/styles";
import Loading from "../components/Loading";
// import Dropdown from '../components/Dropdown';

import { renderStreamField } from "../utils";

class BlogPage extends Component {
  state = {
    loading: true
  };

  componentWillMount() {
    this.setState({ loading: true });

    const { id, getPageDetails } = this.props;
    console.log("willmount props", this.props);

    getPageDetails(id);
  }

  componentDidMount() {
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
    console.log("blogpage props", this.props);

    const { loading } = this.state;
    // console.log(page);
    const { details } = this.props;
    // const iconmenu = this.addIcons(menu)

    // const detailsHasTags = Object.prototype.hasOwnProperty.call(
    //   details,
    //   "tags"
    // );
    // if (!detailsHasTags) {
    //   details.title = "";
    //   details.intro = "";
    //   details.tags = [];
    //   details.body = [];
    // }
    let body = [];
    if (details) {
      body = renderStreamField(details.body);
    }

    return (
      <Wrapper className="">
        {loading || !details ? (
          <Loading />
        ) : (
          <Box css={{ postion: "fixed", overflowY: "auto" }}>
            <Box className="" color="" pt={80}>
              <Box className="">
                <Header inverted>{details.title}</Header>
                <Text className="">Written {details.date}</Text>
                <Text className="" fontFamily="work">
                  Tags:
                  {details.tags.map(tag => (
                    <span className="uk-badge" key={tag}>
                      {tag}
                    </span>
                  ))}
                </Text>
              </Box>
            </Box>

            <Segment>
              <Text fontFamily="work">{body}</Text>
            </Segment>
          </Box>
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
  )(BlogPage)
);
