import React, { Component } from 'react';
import { Route, Switch, withRouter } from "react-router-dom";

class Profile extends Component {
    constructor(props) {
      super(props);

      this.state = {
        loaded: false,
      };
    }
  
    async componentWillMount() {
      console.log('Profile will mount!');
  
      console.log({ props: this.props });
  
      const isLoggedIn = await this.props.isAuthenticated();


      if (isLoggedIn) {
          this.setState({ loaded: true })
      } else {
          this.props.history.push('/')
      }

    }
  
    render() {
        if (!this.state.loaded) {
            return (
                <div>
                    <p>Loading</p>
                </div>
            )
        }
      return (
        <div>
          <h2>Profile component</h2>
        </div>
      )
    }
  }

  export default withRouter(Profile);