import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Login = () => {
  return (
    <div className="flex justify-center items-center flex-col mt-20">
      <Image
        src="https://links.papareact.com/5me"
        width={300}
        height={300}
        objectFit="contain"
        alt="logo"
      />
      <button className="p-5 bg-blue-500 rounded-full text-white text-center cursor-pointer mt-6">
        <Link href="/login"> Login with Email </Link>
      </button>
    </div>
  );
};

export default Login;
