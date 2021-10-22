import React from 'react';
import Typewriter from 'typewriter-effect';

const Welcome = () => {
  return (
    <div className="flex flex-col flex-grow">
      <h1 className="text-6xl">Facebuuk</h1>
      <Typewriter
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
            .typeString(
              '<span class="text-4xl">Your book. Your Story. Tell it like you want.</span>'
            )
            .pauseFor(2000)
            .deleteAll()
            .start()
        }
      />
    </div>
  );
};

export default Welcome;
