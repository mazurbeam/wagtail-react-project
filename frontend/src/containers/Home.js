import React, { Component } from 'react';
// import Header from '../components/Header'
import axios from 'axios';

class Home extends Component {
  state = {
    page: {}
  };

  componentDidMount() {
    axios.get('/api/v2/pages/?type=home.HomePage').then(res => {
      const page = res.data.items[0];
      this.setState({ page });
    });
  }

  render() {
    const { page } = this.state;
    console.log('homepage', page);
    return (
      <div>
        <h1>Home page</h1>
        <h3>{page.title}</h3>
      </div>
    );
  }
}

export default Home;
