import { signIn } from 'next-auth/client';
import React, { useState } from 'react';

const Form = () => {
  const [user, setUser] = useState({ email: '', password: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = user;

    signIn('credentials', {
      email,
      password,
      // redirect: false,
      // The page where you want to redirect to after a
      // successful login
      callbackUrl: `${window.location.origin}/`,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white items-center p-2 shadow-md lg:px-5 lg:w-3/12 md:w-6/12">
      <form onSubmit={handleLogin}>
        <div>
          <input
            className="login"
            name="email"
            placeholder="email"
            value={user.email}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <input
            className="login"
            type="password"
            placeholder="password"
            value={user.password}
            name="password"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button className="btn" type="submit">
          Log In
        </button>
      </form>
      <div className="flex flex-col">
        <a className="flex justify-center pt-3 pb-5 border-b-2">
          Forgot Password?
        </a>
        <button className="bg-green-600 text-white rounded-md p-3 max-w-xs m-auto mt-8 mb-3">
          Create New Account
        </button>
      </div>
    </div>
  );
};

export default Form;
