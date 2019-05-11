import React, { Component } from 'react'
import Layout from '../components/layout'

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.inputChange = this.inputChange.bind(this);
  }

  static async getInitialProps({ query }) {
    return {  auth: query.auth }
  }

  inputChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }


  handleSubmit(e) {
    e.preventDefault();

    const { email, password } = this.state;

    if (!email || !password) {
      this.setState({ error: 'Missing fields!' });
      return;
    } else {
      this.setState({ error: null });
    }

    const body = {
      email, 
      password
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

        this.setState({ error: res.status });
      }
    })
    .catch(e => {
      console.log('error', e);
      this.setState({ error: 'Fetch error!' });
    })
  }

  render() {
    return (
      <Layout auth={this.props.auth}>


        <form onSubmit={this.handleSubmit} className='form'>

          <div className="form__group">
            <h1>Login</h1>
          </div>

          <div className="form__group">
            <input name='email' type='text' placeholder='email' value={this.state.email} onChange={this.inputChange}/>
          </div>

          <div className="form__group">
            <input name='password' type='password' placeholder='password' value={this.state.password} onChange={(this.inputChange)}/>
          </div>

          <div className="form__group">
            {
              !!this.state.error && <p className="error">{this.state.error}</p>
            }
          </div>

          <div className="form__group">
            <button type="submit">Login</button>
          </div>

          <div className="form__group">
            <p>
              <a href="/register">Register</a>
            </p>
          </div>

        </form>



        <style jsx>{`
          .form {
            width: 100%;
            max-width: 600px;
            padding: 20px;
            margin: 50px auto 0;

            border-radius: 5px;
            background-color: hsl(200, 20%, 80%);

            box-sizing: border-box;
          }

          h1 {
            font-family: sans serif;
            font-weight: 100;
          }

          .form__group {
            width: 100%;
            max-width: 400px;

            margin: 30px auto 0;
          }

          input {
            width: 100%;
            height: 50px;

            border: none;
            border-radius: 3px;

            padding: 0 5px;

            box-sizing: border-box;

            color: #444;
            font-size: 16px;
          }

          button {
            width: 100%;
            height: 50px;

            border: none;
            border-radius: 3px;

            padding: 0 5px;

            box-sizing: border-box;

            color: #444;
            font-size: 16px;
            cursor: pointer;

            background-color: hsl(160, 60%, 45%);
          }

          button:hover {
            background-color: hsl(160, 60%, 40%);

          }


        `}</style>
      </Layout>
    )
  }
}

export default Login