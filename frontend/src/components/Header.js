import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { Toolbar, NavLink } from 'rebass';
import axios from 'axios';

// import fetchPages from '../services/api';

class Header extends Component {
  state = {
    pages: { items: [] }
  };

  componentDidMount() {
    axios.get('/api/v2/pages/?child_of=3&show_in_menus=true').then(res => {
      const pages = res.data;
      this.setState({ pages });
    });
  }

  render() {
    const { pages } = this.state;
    const { items } = pages;
    console.log(items);
    return (
      <div>
        <Toolbar>
          <NavLink>
            <Link to="/">Home</Link>
          </NavLink>
          {items.map(item => (
            <NavLink key={item.id}>
              <Link to={item.meta.slug}>{item.title}</Link>
            </NavLink>
          ))}
        </Toolbar>
      </div>
    );
  }
}

export default Header;
