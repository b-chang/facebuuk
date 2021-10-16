import Image from 'next/image';
import React from 'react';

const Login = () => {
  return (
    <div>
      <Image
        src="https://links.papareact.com/5me"
        width={400}
        height={400}
        objectFit="contain"
      />
      <h1>Login with Email</h1>
    </div>
  );
};

export default Login;
