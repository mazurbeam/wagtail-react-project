import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import * as reducers from "../services/reducers";
import {
  fetchPageMeta,
  fetchPageWithId,
  fetchPageChildren
} from "../services/actions/page";
import { pageTypeReducer, getNextAndPrevPath } from "../utils";
import Loading from "../components/Loading";
// import PageAnimationWrapper from "../components/PageAnimationWrapper";
import NextPrevNav from "../components/NextPrevNav";

class Page extends Component {
  state = {
    loading: true
  };

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

  render() {
    const { loading } = this.state;
    // const cx = classNames({
    //   page: true,
    //   "page--prev": this.state && state.prev
    // });
    const { meta, match, location, menu } = this.props;
    // console.log("meta", meta);
    let sideNav = { next: "/contact", prev: "/" };
    if (menu.length > 0) {
      sideNav = getNextAndPrevPath(menu, location);
    }

    // console.log("page sidenav", sideNav);
    const isChildPage = Object.prototype.hasOwnProperty.call(
      match.params,
      "child"
    );
    let ready = true;

    // let PageType = this.pageReducer(meta.id, meta.meta.type);
    let PageType = pageTypeReducer(meta.id, meta.meta.type);
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
      <div>
        {!isChildPage && <NextPrevNav locations={sideNav} />}
        {loading && ready ? PageType : PageType}
      </div>
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
