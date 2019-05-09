import React from 'react';
import Link from 'next/link';

const Header = () => (
  <header>
    <h1 className='title'>Header</h1>

    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/profile">Profile</a></li>
      <li><a href='/logout'>Logout</a></li>
    </ul>

    
      <style jsx> {`

        header {
          background-color: hsl(250, 50%, 30%);
          color: hsl(250, 10%, 80%);

          font-family: sans-serif;

          display: flex;
          justify-content: space-between;
          padding: 10px 20px;

        }

        .title {
          font-size: 32px;
          font-weight: 100;
        }

        ul {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        li {
          color: white;
          display: block;
          margin: 0 4px;
        }

        a {
          text-decoration: none;
          color: inherit;
        }
      
        a:hover {
          text-decoration: underline;
        }
      `}</style>
  </header>
)

export default Header;
