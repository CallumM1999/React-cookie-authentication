import React, { Component } from 'react';
import Layout from '../components/layout';

class Profile extends Component {
    constructor(props) {
        super(props);

    }

    static async getInitialProps({ query }) {
        return { name: query.name, auth: query.auth }
    }

    render() {
        return (
            <Layout auth={this.props.auth}>
                <h1>Profile</h1>
                <p>Welcome, {this.props.name}!</p>
            </Layout>
        )
    }
}

export default Profile;