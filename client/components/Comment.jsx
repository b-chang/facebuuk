import { ThumbUpIcon } from '@heroicons/react/solid';
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

  console.log(numberOfLikes);
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
          <div className="rounded-lg bg-gray-100 flex-grow px-3 focus:outline-none max-h-52 max-w-xl overflow-y-auto scrollbar-hide">
            <p className="font-bold">
              {author.firstName} {author.lastName}
            </p>
            <div className="relative">
              <p>{content}</p>
              {numberOfLikes > 0 && (
                <div className="absolute right-1 inset-y-0 top-4 flex items-center justify-center rounded-lg h-6 w-10 bg-gray-200 text-blue-500">
                  <ThumbUpIcon className="h-4 text-blue-500" />
                  {numberOfLikes}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
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
