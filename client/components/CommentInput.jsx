import Image from 'next/image';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSpring } from 'react-spring';
import { addComment, replyToComment } from '../store/post/post.reducer';

const CommentInput = (props) => {
  const { user, id, reply } = props;

  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const fade = useSpring({
    from: {
      opacity: 0,
    },
    to: { opacity: 1 },
  });

  const addCommentToPost = async (e) => {
    e.preventDefault();

    const newComment = {
      author: user._id,
      content: comment,
      id: id,
    };

    try {
      if (reply) {
        dispatch(replyToComment(newComment));
        setComment('');
      } else {
        dispatch(addComment(newComment));
        setComment('');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex items-center space-x-1 bg-white text-gray-400 p-4 border-t">
      <Image
        className="rounded-full"
        src={user.image}
        width={40}
        height={40}
        layout="fixed"
      />
      <form className="flex flex-1" onSubmit={(e) => addCommentToPost(e)}>
        <input
          className="rounded-xl h-12 bg-gray-100 flex-grow px-5 mr-3 focus:outline-none w-full"
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
