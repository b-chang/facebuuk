import { ChatAltIcon, ShareIcon, ThumbUpIcon } from '@heroicons/react/outline';
import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';

const Post = ({ post }) => {
  const { content, author, createdAt, image: postImage, _id: id } = post;
  const { firstName, lastName, image, _id } = author;
  const [isLiked, setIsLiked] = useState(false);
  const date = new Date(createdAt).toLocaleString();

  const likePost = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/posts/${id}/like-post`,
        { _id: _id }
      );
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  // @WIP add live reloading. currently only displays new posts on refresh
  return (
    <div className="flex flex-col">
      <div className="p-5 bg-white mt-5 rounded-t-2xl shadow-xl">
        <div className="flex space-x-2">
          <img
            className="rounded-full"
            src={image}
            width={40}
            height={40}
            alt=""
          />
          <div>
            <p className="font-medium">{`${firstName} ${lastName}`}</p>
            <p className="text-xs text-gray-400">{date}</p>
          </div>
        </div>
        <p className="pt-4">{content}</p>
      </div>
      {postImage && (
        <div className="relative h-56 md:h-96 bg-white">
          <Image src={postImage} objectFit="cover" layout="fill" />
        </div>
      )}
      <div className="flex justify-between items-center rounded-b-2xl bg-white shadow-md text-gray-400 border-t">
        <div
          className="inputIcon rounded-none rounded-bl-2xl"
          onClick={() => likePost()}
        >
          <ThumbUpIcon className="h-4" />
          <p className="text-xs sm:text-base">Like</p>
        </div>
        <div className="inputIcon rounded-none">
          <ChatAltIcon className="h-4" />
          <p className="text-xs sm:text-base">Comment</p>
        </div>
        <div className="inputIcon rounded-none rounded-br-2xl">
          <ShareIcon className="h-4" />
          <p className="text-xs sm:text-base">Share</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
