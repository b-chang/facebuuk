import axios from 'axios';
import { signIn } from 'next-auth/client';
import Link from 'next/link';
import React, { useState } from 'react';
import FORM_TYPE from './form-type';

const Form = (props) => {
  const { loginType, btnText } = props;
  const { initialState, inputs } = FORM_TYPE[loginType];
  console.log(initialState);
  const [user, setUser] = useState({ ...initialState });

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loginType === 'SIGN_UP') {
      console.log('trying to sign up');
      try {
        const response = await axios.post(
          'http://localhost:8000/api/signup',
          user
        );
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    }

    signIn('credentials', {
      ...user,
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
        {inputs.map((inputField, idx) => (
          <div key={idx}>
            <input
              className="login"
              name={inputField[0]}
              placeholder={inputField[1]}
              value={user[inputField[0]]}
              onChange={(e) => handleChange(e)}
              type={
                inputField[0] === 'password' ||
                inputField[0] === 'confirmPassword'
                  ? 'password'
                  : 'text'
              }
            />
          </div>
        ))}
        <button className="btn" type="submit">
          {btnText}
        </button>
      </form>
      <div className="flex flex-col">
        <a className="flex justify-center pt-3 pb-5 border-b-2">
          Forgot Password?
        </a>
        <button className="bg-green-600 text-white rounded-md p-3 max-w-xs m-auto mt-8 mb-3">
          <Link href={loginType === 'LOGIN' ? '/signup' : '/login'}>
            {loginType === 'LOGIN' ? 'Create New Account' : 'Have an account?'}
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Form;
