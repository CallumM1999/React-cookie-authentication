import React, { Component } from 'react'
import Layout from '../components/layout'

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      username: '',


      error: null,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.inputChange = this.inputChange.bind(this);
  }

  inputChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  handleSubmit(e) {
    e.preventDefault();

    const { email, password, username } = this.state;

    if (!!email && !!password && !!username) {

      this.setState({
        error: null
      })

      const body = {
        email, password, username
      };

      fetch('/register', {
        method: 'POST',
        body: JSON.stringify(body),
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
      })
      .then(res => {
        if (res.status === 200) {
          console.log('Success');
          // window.location = '/profile';
        } else {
          console.log('status: ', res.status);
        }
      })
      .catch(e => {
        console.log('error', e)
      })
    } else {
      this.setState({ error: 'Missing fields' })
    }
  }

  render() {
    return (
      <Layout>

        <h1>Register</h1>

        <form onSubmit={this.handleSubmit}>
          <input type='text' name='username' value={this.state.username} onChange={this.inputChange} placeholder='username' />
          <input type='text' name='email' value={this.state.email} onChange={this.inputChange} placeholder='email' />
          <input type='password' name='password' value={this.state.password} onChange={this.inputChange} placeholder='password'/>

          <p>{!!this.state.error && this.state.error}</p>


          <input type='submit' value='submit'/>
        </form>
      </Layout>
    )
  }
}

export default Register