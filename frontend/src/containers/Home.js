import React, { Component } from 'react';
// import Header from '../components/Header'
import axios from 'axios';

class Home extends Component {
  state = {
    page: {}
  };

  componentDidMount() {
    axios.get('/api/v2/pages/?type=home.HomePage&fields=*').then(res => {
      const page = res.data.items[0];
      this.setState({ page });
    });
  }

  render() {
    const { page } = this.state;
    // console.log('homepage', page);
    return (
      <div>
        <h1>{page.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: page.introduction }} />
      </div>
    );
  }
}

export default Home;
