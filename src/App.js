import React, { Component } from 'react';
import { Route, Switch, withRouter, BrowserRouter, Redirect, Link } from "react-router-dom";

// import logo from './logo.svg';
import './App.css';

import Profile from './components/profile';

const Page = () => (
  <div>
    <h1>Page</h1>
    <Link to='/profile'>Profile</Link>
  </div>
);




const isAuthenticated = () => new Promise(async resolve => {
    let result;

  try {
    result = await fetch('/isAuthenticated', {
      method: 'POST',
      headers: {
        'token': 'password1234'
      }
    });

    result = await result.json();
    console.log({ result });

    resolve(result.authenticated);

  } catch(e) {
    console.log('Error authenticating route');

    resolve(false);

  }
})

// const isAuthenticated = () => new Promise(async resolve => {
//   let result;

//   try {
//     result = await fetch('/isAuthenticated', {
//       method: 'POST',
//       headers: {
//         'token': 'password1234'
//       }
//     });

//     result = await result.json();
//     console.log({ result });

//     resolve(result.authenticated);

//   } catch(e) {
//     console.log('Error authenticating route');

//     resolve(false);

//   }
// });





const Router = () => (
  <BrowserRouter>
    <Switch>

      <Route 
        path='/'
        component={Page}
        exact={true}
      />

      <Route 
        path='/profile' 
        exact={true} 
        
        render={() => (
          <Profile isAuthenticated={isAuthenticated} />
        )}
        />
    </Switch>
  </BrowserRouter> 
)

function App() {
  return <Router />
}

export default App;
