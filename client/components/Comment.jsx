import axios from 'axios';
import { useSession } from 'next-auth/client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const Comment = (props) => {
  const { comment, index, size, displayComments } = props;
  const { content, author, createdAt } = comment;
  const [hasLiked, setHasLiked] = useState(false);
  const [session] = useSession();
  const date = new Date(createdAt).toLocaleString();
  const { user } = session;
  const [numberOfLikes, setNumberOfLikes] = useState(comment.likes.length);

  const colorLikeButton = () => {
    if (comment.likes.includes(user.id)) {
      setHasLiked(true);
    }
  };

  const likeComment = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/post/comment/${id}/like-comment`,
        { userId: user.id, removeLike: hasLiked }
      );
      const { likes } = response.data;
      setHasLiked((prev) => !prev);
      setNumberOfLikes(likes.length);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    colorLikeButton();
  }, []);

  return (
    <div
      className={`flex flex-col space-x-1 bg-white text-gray-400 p-4 ${
        index === size - 1 || index >= displayComments
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
        <div className="flex flex-col flex-grow">
          <div className="rounded-lg h-12 bg-gray-100 flex-grow px-3 focus:outline-none">
            <p>
              {author.firstName} {author.lastName}
            </p>
            <p>{content}</p>
          </div>
          <div className="flex items-center space-x-2">
            {/* <LikeButton hasLiked={hasLiked} /> */}
            <span
              className={`ml-1 text-xs hover:underline hover:cursor-pointer ${
                hasLiked ? 'text-blue-500' : ''
              }`}
              onClick={() => likeComment(comment._id)}
            >
              Like
            </span>
            <p className="text-xs">{date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
