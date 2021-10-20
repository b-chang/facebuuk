import Image from 'next/image';
import React from 'react';

const Comment = (props) => {
  const { comment, index, size, initialComments } = props;
  const { content, author } = comment;
  return (
    <div
      className={`flex flex-col space-x-1 bg-white text-gray-400 p-4 ${
        index === size - 1 || index >= initialComments
          ? 'rounded-b-2xl shadow-md'
          : ''
      }`}
    >
      <div className="flex items-start space-x-1">
        <Image
          src={author.image}
          className="rounded-full"
          width={30}
          height={30}
          layout="fixed"
        />
        <div className="rounded-lg h-12 bg-gray-100 flex-grow px-3 focus:outline-none">
          <p>
            {author.firstName} {author.lastName}
          </p>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
