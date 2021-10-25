import React from 'react';
import Form from '../components/Form';
import Welcome from '../components/Welcome';

const login = () => {

  return (
    <div className="flex flex-col space-y-10 m-auto mt-96 lg:space-y-0 lg:space-x-10 lg:flex-grow lg:flex-row lg:w-10/12" >
      <Welcome />
      <Form loginType="LOGIN" btnText="Log in"/>
    </div>
  )
}

export default login