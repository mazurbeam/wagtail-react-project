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
import NextPrevNav from "../components/NextPrevNav";
import BlogIndexPage from "./BlogIndexPage";
import BlogPage from "./BlogPage";
import StandardPage from "./StandardPage";
import PortfolioIndexPage from "./PortfolioIndexPage";
import ProjectIndexPage from "./ProjectIndexPage";
import ProjectPage from "./ProjectPage";
import PortfolioPage from "./PortfolioPage";

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
    if (type === "projects.ProjectIndexPage") {
      page = <ProjectIndexPage id={id} type={type} />;
    }
    if (type === "projects.ProjectPage") {
      page = <ProjectPage id={id} type={type} />;
    }
    if (type === "portfolio.PortfolioPage") {
      page = <PortfolioPage id={id} type={type} />;
    }
    return page;
  };

  getNextAndPrevPage = (menu, location) => {
    const { pathname, state } = location;
    const result = { prev: "", next: "" };
    if (pathname === "/") {
      result.prev = {
        pathname: "/contact",
        state: { prev: true, index: 10 }
      };
      result.next = {
        pathname: `/${menu[0].meta.slug}`,
        state: { prev: true, index: -1 }
      };
    } else {
      for (let i = 0; i < menu.length; i += 1) {
        if (pathname === `/${menu[i].meta.slug}`) {
          if (i === 0) {
            result.prev = {
              pathname: `/`,
              state: { prev: false, index: -1 }
            };
            result.next = {
              pathname: `/${menu[i + 1].meta.slug}`,
              state: { prev: state ? state.index < i : false }
            };
          } else {
            result.prev = {
              pathname: `/${menu[i - 1].meta.slug}`,
              state: { prev: state ? state.index < i : false }
            };
            if (i < menu.length - 1) {
              result.next = {
                pathname: `/${menu[i + 1].meta.slug}`,
                state: { prev: state ? state.index < i : false }
              };
            }
          }
          if (i === menu.length - 1) {
            result.next = {
              pathname: "/contact",
              state: { prev: true, index: 10 }
            };
          }
        }
      }
    }

    return result;
  };

  render() {
    const { loading } = this.state;
    // const cx = classNames({
    //   page: true,
    //   "page--prev": this.state && state.prev
    // });
    const { meta, match, location, menu } = this.props;
    // console.log("meta", meta);
    let sideNav;
    if (menu.length > 0) {
      sideNav = this.getNextAndPrevPage(menu, location);
    }

    // console.log("page sidenav", sideNav);
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
        {!isChildPage && <NextPrevNav locations={sideNav} />}
        {loading && ready ? PageType : PageType}
      </PageAnimationWrapper>
    );
  }
}

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  meta: reducers.refreshPageMeta(state),
  location: state.router.location,
  menu: reducers.refreshMenu(state)
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
