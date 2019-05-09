import React from 'react';
import Link from 'next/link';

const Head = () => (
  <header>
    <h1>Header</h1>

      <a href="/">Home</a>
      <a href="/profile">Profile</a>
      <a href='/logout'>Logout</a>
      
  </header>
)

export default Head
