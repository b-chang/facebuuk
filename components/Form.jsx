import axios from 'axios';
import { signIn } from 'next-auth/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import FORM_TYPE from './form-type';

const Form = (props) => {
  const { loginType, btnText } = props;
  const { initialState, inputs } = FORM_TYPE[loginType];
  const [user, setUser] = useState({ ...initialState });
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (router.query.error) {
      setMessage(router.query.error);
    }
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    let redirect = false;

    if (loginType === 'SIGN_UP') {
      try {
        const response = await axios.post('${API_BASE_URL}/signup', user);
        redirect = true;
      } catch (e) {
        const { data } = e.response;
        setMessage(data.message);
        setTimeout(() => {
          setMessage('');
        }, 3000);
        return e.response;
      }
    }

    const response = await signIn('credentials', {
      ...user,
      redirect: false,
      callbackUrl: `${window.location.origin}/`,
    });

    if (response.url) router.push(response.url);
    if (response.error) setMessage(response.error);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white w-full items-center p-2 shadow-md lg:px-5 lg:w-4/12 md:w-full">
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
        {/* <a className="flex justify-center pt-3 pb-5 border-b-2">
          Forgot Password?
        </a> */}
        <button className="bg-green-600 text-white rounded-md p-3 max-w-xs m-auto mt-8 mb-3">
          <Link href={loginType === 'LOGIN' ? '/signup' : '/login'}>
            {loginType === 'LOGIN' ? 'Create New Account' : 'Have an account?'}
          </Link>
        </button>
      </div>
      {message ? <p>{message}</p> : ''}
    </div>
  );
};

export default Form;
