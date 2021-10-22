import React from 'react';
import Form from '../components/Form';

const signup = () => {
  return (
    <div className="flex justify-end space-x-44 w-9/12 m-auto mt-96">
      <Form loginType="SIGN_UP" btnText="Sign up" />
    </div>
  )
}

export default signup