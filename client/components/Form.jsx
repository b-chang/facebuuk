// import { Alert, Box, Button, Card, TextField } from '@mui/material';
import { navigate } from '@reach/router';
import axios from 'axios';
import React, { useState } from 'react';
import './Form.styles.css';

const Form = ({ title, FORM_TYPE, type, children }) => {
  const [user, setUser] = useState({});
  const [notif, setNotif] = useState({});

  const handleLogin = async (user) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/login',
        user,
        {
          withCredentials: true,
          credentials: 'include',
        }
      );

      await navigate('/pirates');
    } catch (err) {
      const {
        response: {
          data: { message },
        },
      } = err;
      setNotif({ msg: message, success: false });
      setTimeout(() => {
        setNotif({});
      }, 10000);
    }
  };

  const handleSignup = async (user) => {
    try {
      await axios.post('http://localhost:8000/api/signup', user);
      navigate('/pirates');
    } catch (err) {
      const {
        response: {
          data: { message },
        },
      } = err;
      setNotif({ msg: message, success: false });
      setTimeout(() => {
        setNotif({});
      }, 10000);
    }
  };

  const formSubmission = (event) => {
    event.preventDefault();

    if (type === 'LOGIN') {
      handleLogin(user);
    }

    if (type === 'SIGN_UP') {
      handleSignup(user);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div sx={{ display: 'flex', alignItems: 'center' }}>
      <p>{title}</p>
      <form className="login-signup-form" onSubmit={formSubmission}>
        {FORM_TYPE[type].map((field, idx) => (
          <TextField
            key={idx}
            color="primary"
            sx={{ m: 2, marginBottom: 0, color: 'red' }}
            label={field[1]}
            name={field[0]}
            value={user[field[0]] || ''}
            variant="outlined"
            required
            onChange={(e) => handleChange(e)}
            type={
              field[1] === 'password' || field[1] === 'confirm password'
                ? 'password'
                : 'text'
            }
          />
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
