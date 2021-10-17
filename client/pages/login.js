import React from 'react';
import Form from '../components/Form';

const login = () => {
  return (
    <div className="w-full">
      <Form loginType="LOGIN" btnText="Log in"/>
    </div>
  )
}

export default login