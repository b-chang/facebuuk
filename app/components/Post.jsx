import { ChatAltIcon, ShareIcon } from '@heroicons/react/outline';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { animated, useSpring } from 'react-spring';
import { API_BASE_URL } from '../config';
import Comments from './Comments';
import LikeButton from './LikeButton';
import Likes from './Likes';
import PostOptions from './PostOptions';

const Post = ({ post, setPostDeleted }) => {
  const { content, author, createdAt, image: postImage, _id: id, likes } = post;
  const { firstName, lastName, image, _id } = author;
  const state = useSelector((state) => state);
  const { data: session, status } = useSession();
  const { user: currentUser } = session;
  const { data, loading } = state.user;
  const [hasLiked, setHasLiked] = useState(false);
  const [displayComments, setDisplayComments] = useState(false);
  const date = new Date(createdAt).toLocaleString();
  const [numberOfLikes, setNumberOfLikes] = useState(post.likes.length);
  const numberOfComments = post.comments.length;
  const fade = useSpring({
    from: {
      opacity: 0,
    },
    to: { opacity: 1 },
  });

  const colorLikeButton = () => {
    if (loading === 'loaded' && likes.some((like) => like._id === data._id)) {
      setHasLiked(true);
    }
  };

  const likePost = async () => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/posts/${id}/like-post`,
        { _id: currentUser.id, removeLike: hasLiked }
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
  }, [loading]);

  return (
    <animated.div
      className="flex flex-col my-3 shadow-md rounded-2xl"
      style={fade}
    >
      <div className="p-5 bg-white mt-5 rounded-t-2xl shadow-xl">
        <div className="flex justify-between">
          <div className="flex items-center space-x-2">
            <Image
              className="rounded-full"
              src={image}
              width={40}
              height={40}
              alt="user image"
            />
            <div>
              <p className="font-medium">{`${firstName} ${lastName}`}</p>
              <p className="text-xs text-gray-400">{date}</p>
            </div>
          </div>
          <div className="">
            <PostOptions setPostDeleted={setPostDeleted} id={id} />
          </div>
        </div>
        <p className="pt-4">{content}</p>
      </div>
      {postImage && (
        <div className="relative h-56 md:h-96 bg-white">
          <Image
            src={postImage}
            objectFit="cover"
            layout="fill"
            alt="image on post"
          />
        </div>
      )}
      <div className="flex justify-between bg-white shadow-md text-gray-40 p-4">
        <Likes post={post} numberOfLikes={numberOfLikes} />
        <p
          className="text-xs cursor-pointer hover:underline sm:text-base"
          onClick={() => setDisplayComments((prev) => !prev)}
        >
          {numberOfComments ? numberOfComments : null} comments
        </p>
      </div>
      <div
        className={`flex justify-between items-center bg-white shadow-md text-gray-400 border-t ${
          displayComments ? '' : 'rounded-b-2xl'
        }`}
      >
        <LikeButton hasLiked={hasLiked} likePost={likePost} />
        <div
          className="inputIcon rounded-none"
          onClick={() => setDisplayComments((prev) => !prev)}
        >
          <ChatAltIcon className="h-4" />
          <p className="text-xs sm:text-base">Comment</p>
        </div>
        <div className="inputIcon rounded-none rounded-br-2xl">
          <ShareIcon className="h-4" />
          <p className="text-xs sm:text-base">Share</p>
        </div>
      </div>
      <div className="rounded-b-2xl bg-white shadow-md">
        {displayComments ? <Comments user={data} id={id} post={post} /> : ''}
      </div>
    </animated.div>
  );
};

export default Post;
