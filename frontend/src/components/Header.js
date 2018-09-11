import React, { Component } from 'react';
import { connect } from 'react-redux';
/* eslint no-unused-vars: ["off", { "caughtErrorsIgnorePattern": "^ignore" }] */

import { withRouter, Link } from 'react-router-dom';

import { Toolbar } from 'rebass';
import axios from 'axios';

import { fetchMainMenu } from '../services/actions/page';
// import * as reducers from '../services/reducers';
// import fetchPages from '../services/api';

class Header extends Component {
  state = {
    // loading: true,
    pages: { items: [] }
  };

  props = this.props;

  componentWillMount() {
    axios.get('/api/v2/pages/?child_of=3&show_in_menus=true').then(res => {
      this.setState({ pages: res.data });
    });
  }

  render() {
    const { pages } = this.state;
    const { items } = pages;
    const { menu } = this.props;
    // if (loading) {
    //   getMenu();
    //   this.setState({ loading: false });
    // }
    return (
      <div>
        <Toolbar>
          <Link to="/">Home</Link>
          {items.map(item => (
            <Link key={item.id} to={item.meta.slug}>
              {item.title}
            </Link>
          ))}
        </Toolbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  menu: state.page.menu
});

const mapDispatchToProps = dispatch => ({
  getMenu() {
    dispatch(fetchMainMenu());
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
