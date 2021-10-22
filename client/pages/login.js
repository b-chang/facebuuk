import React from 'react';
import Typewriter from 'typewriter-effect';
import Form from '../components/Form';

const login = () => {

  return (
      <div className="flex justify-end space-x-44 w-9/12 m-auto mt-96" >
        <div className="border flex-grow">
        <Typewriter
          className="text-9xl"
          options={{
            autoStart: true,
            loop: true,
          }}
          onInit={(typewriter) => 
            typewriter
              .typeString('<span class="text-4xl">Welcome to Facebuuk</span>')
              .pauseFor(2000)
              .deleteAll()
              .typeString('<span class="text-4xl">Make new friends</span>')
              .pauseFor(2000)
              .deleteAll()
              .typeString('<span class="text-4xl">It is your book. Share your story</span>')
              .pauseFor(2000)
              .deleteAll()
              .start()
          }
        />
        </div>
        <Form loginType="LOGIN" btnText="Log in"/>
      </div>
  )
}

export default login