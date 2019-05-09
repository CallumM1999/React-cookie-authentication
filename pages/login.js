import React, { Component } from 'react'
import Head from '../components/head'

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
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

    const { email, password } = this.state;

    if (!!email && !!password) {

      const body = {
        email, password
      };

      fetch('/login', {
        method: 'POST',
        body: JSON.stringify(body),
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
      })
      .then(res => {
        if (res.status === 200) {
          console.log('Success');
          window.location = '/profile';
        } else {
          console.log('status: ', res.status);
        }
      })
      .catch(e => {
        console.log('error', e)
      })
    }
  }

  render() {
    return (
      <div>
        <Head title="Login" />

        <h1>Login</h1>

        <form onSubmit={this.handleSubmit}>
          <input name='email' type='text' placeholder='email' value={this.state.email} onChange={this.inputChange}/>
          <input name='password' type='password' placeholder='password' value={this.state.password} onChange={(this.inputChange)}/>

          <input type='submit' value='submit'/>
        </form>
      </div>
    )
  }
}

export default Login