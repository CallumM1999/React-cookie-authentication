import React, { Component } from 'react';
import Layout from '../components/layout';

class Profile extends Component {
    constructor(props) {
        super(props);

    }

    static async getInitialProps({ query }) {
        console.log({ query })


        // this.name = query.name;

        return { name: query.name, count: query.count }
    }

    render() {
        return (
            <Layout>
                
                <h1>Profile</h1>


                <p>Welcome, {this.props.name}!</p>

                <p>You have visited this page {this.props.count} times!</p>

            </Layout>
        )
    }
}

export default Profile;