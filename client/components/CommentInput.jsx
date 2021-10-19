import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';

const CommentInput = (props) => {
  const { user, id } = props;
  const [comment, setComment] = useState('');

  const addCommentToPost = async (e) => {
    e.preventDefault();

    const commentor = {
      author: user.id,
      content: comment,
    };

    // @WIP convert to redux after configuring displaying comments first
    try {
      const response = await axios.post(
        `http://localhost:8000/api/posts/${id}/comment`,
        commentor
      );
      console.warn(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex items-center space-x-1 bg-white shadow-md text-gray-400 rounded-b-2xl p-4 border-t">
      <Image
        className="rounded-full"
        src={user.image}
        width={40}
        height={40}
        layout="fixed"
      />
      <form className="flex flex-1" onSubmit={(e) => addCommentToPost(e)}>
        <input
          className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none w-full"
          type="text"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </form>
    </div>
  );
};

export default CommentInput;
