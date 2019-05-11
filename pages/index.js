import React, { Component } from 'react';
import Layout from '../components/layout';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  static async getInitialProps({ query }) {
    return {  auth: query.auth }
  }

  render() {
    return (
      <Layout auth={this.props.auth}>
        <h1>Home</h1>
      </Layout>
    )
  }
}

export default Home
