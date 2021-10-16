import { signIn } from 'next-auth/client';
import React, { useState } from 'react';

export default function login() {
  const [user, setUser] = useState({ email: '', password: '' });

  const handleLogin = async (e) => {
    e.preventDefault()
    const { email, password } = user
    
    signIn('credentials',
      {
        email,
        password,
        // redirect: false,
        // The page where you want to redirect to after a 
        // successful login
        callbackUrl: `${window. location.origin}/` 
      }
    )
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>LOGIN PAGE</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input name="email" value={user.email} onChange={(e) => handleChange(e)} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" value={user.password} name="password" onChange={(e) => handleChange(e)} />
        </div>
        <button type="submit">LOGIN</button>
      </form>
    </div>
  )
}


