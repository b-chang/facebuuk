import {
  ChatAltIcon,
  ShareIcon,
  ThumbUpIcon as ThumUpIconOutline,
} from '@heroicons/react/outline';
import { ThumbUpIcon as ThumUpIconFilled } from '@heroicons/react/solid';
import axios from 'axios';
import { useSession } from 'next-auth/client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Comment from './Comment';
import CommentInput from './CommentInput';

const Post = ({ post }) => {
  const { content, author, createdAt, image: postImage, _id: id, likes } = post;
  const { firstName, lastName, image, _id } = author;
  const [session] = useSession();
  const { user } = session;
  const [hasLiked, setHasLiked] = useState(false);
  const [displayComments, setDisplayComments] = useState(false);
  const [displayCommentInput, setDisplayCommentInput] = useState(false);
  const date = new Date(createdAt).toLocaleString();
  const numberOfLikes = post.likes.length;
  const numberOfComments = post.comments.length;

  const colorLikeButton = () => {
    if (likes.includes(user.id)) {
      setHasLiked(true);
    }
  };

  const likePost = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/posts/${id}/like-post`,
        { _id: _id, removeLike: hasLiked ? true : false }
      );
      setHasLiked(!hasLiked);
    } catch (e) {
      console.log(e);
    }
  };

  const showCommentInput = () => {
    setDisplayCommentInput((prev) => !prev);
  };

  useEffect(() => {
    colorLikeButton();
  }, [hasLiked]);

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
      <div className="flex justify-between bg-white shadow-md text-gray-40 p-4">
        <div className="flex items-center space-x-2">
          <ThumUpIconFilled className="h-4 text-blue-500" />
          {numberOfLikes ? (
            <p className="text-blue-500">{numberOfLikes}</p>
          ) : (
            ''
          )}
        </div>
        <p
          className="cursor-pointer hover:underline"
          onClick={() => setDisplayComments((prev) => !prev)}
        >
          {numberOfComments ? numberOfComments : null} comments
        </p>
      </div>
      <div
        className={`flex justify-between items-center bg-white shadow-md text-gray-400 border-t ${
          displayCommentInput || displayComments ? '' : 'rounded-b-2xl'
        }`}
      >
        <div
          className="inputIcon rounded-none rounded-bl-2xl"
          onClick={() => likePost()}
        >
          {hasLiked ? (
            <ThumUpIconFilled className="h-4 text-blue-500" />
          ) : (
            <ThumUpIconOutline className="h-4" />
          )}
          <p
            className={
              hasLiked
                ? 'text-xs sm:text-base text-blue-500'
                : 'text-xs sm:text-base'
            }
          >
            Like
          </p>
        </div>
        <div className="inputIcon rounded-none">
          <ChatAltIcon className="h-4" />
          <p
            className="text-xs sm:text-base"
            onClick={() => showCommentInput()}
          >
            Comment
          </p>
        </div>
        <div className="inputIcon rounded-none rounded-br-2xl">
          <ShareIcon className="h-4" />
          <p className="text-xs sm:text-base">Share</p>
        </div>
      </div>
      {displayCommentInput ? <CommentInput user={user} id={id} /> : ''}
      <div className="rounded-b-2xl bg-white shadow-md">
        {displayComments
          ? post.comments.map((comment, idx) => (
              <Comment
                key={idx}
                comment={comment}
                index={idx}
                size={post.comments.length}
              />
            ))
          : ''}
      </div>
      {/* {displayComments
        ? post.comments.map((comment, idx) => (
            <Comment key={idx} comment={comment} />
          ))
        : ''} */}
      {/* {displayCommentInput ? <CommentInput user={user} id={id} /> : ''} */}
    </div>
  );
};

export default Post;
