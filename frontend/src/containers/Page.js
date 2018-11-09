import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// import axios from 'axios';
// import { Box } from "rebass";
// import classNames from "classnames";
// import { Loading } from "semantic-ui-react";

import * as reducers from "../services/reducers";
import {
  fetchPageMeta,
  fetchPageWithId,
  fetchPageChildren
} from "../services/actions/page";
import Loading from "../components/Loading";
import PageAnimationWrapper from "../components/PageAnimationWrapper";

import BlogIndexPage from "./BlogIndexPage";
import BlogPage from "./BlogPage";
import StandardPage from "./StandardPage";
import PortfolioIndexPage from "./PortfolioIndexPage";

class Page extends Component {
  state = {
    loading: true
  };

  componentWillMount() {
    // const state = { type: 'blog.BlogIndexPage' };
    // console.log('will mount meta', meta);
    // getPageMeta(match.params.slug);
  }

  componentDidMount() {
    this.setState({ loading: true });
    const { getPageMeta, match } = this.props;
    // console.log('Page match', match);
    const isChildPage = Object.prototype.hasOwnProperty.call(
      match.params,
      "child"
    );

    if (isChildPage) {
      getPageMeta(match.params.child);
    } else {
      getPageMeta(match.params.slug);
    }
    this.setState({ loading: false });
  }

  pageReducer = (id, type) => {
    let page = <Loading />;
    if (type === "blog.BlogIndexPage") {
      page = <BlogIndexPage id={id} type={type} />;
    }
    if (type === "pages.StandardPage") {
      page = <StandardPage id={id} type={type} />;
    }
    if (type === "blog.BlogPage") {
      page = <BlogPage id={id} type={type} />;
    }
    if (type === "portfolio.PortfolioIndexPage") {
      page = <PortfolioIndexPage id={id} type={type} />;
    }
    return page;
  };

  render() {
    const { loading } = this.state;
    // const cx = classNames({
    //   page: true,
    //   "page--prev": this.state && state.prev
    // });
    const { meta, match } = this.props;
    console.log("meta", meta);

    const isChildPage = Object.prototype.hasOwnProperty.call(
      match.params,
      "child"
    );
    let ready = true;

    let PageType = this.pageReducer(meta.id, meta.meta.type);

    if (isChildPage) {
      if (match.params.child !== meta.meta.slug) {
        ready = false;
        PageType = <Loading />;
      }
    }
    if (!isChildPage) {
      if (match.params.slug !== meta.meta.slug) {
        ready = false;
        PageType = <Loading />;
      }
    }
    return (
      <PageAnimationWrapper>
        {loading && ready ? PageType : PageType}
      </PageAnimationWrapper>
    );
  }
}

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  meta: reducers.refreshPageMeta(state)
});

const mapDispatchToProps = dispatch => ({
  getPageMeta(slug) {
    dispatch(fetchPageMeta(slug));
  },
  getPageDetails(id) {
    dispatch(fetchPageWithId(id));
  },
  getPageChildren(id) {
    dispatch(fetchPageChildren(id));
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Page)
);
