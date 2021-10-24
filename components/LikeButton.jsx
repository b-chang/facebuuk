import { ThumbUpIcon as ThumUpIconOutline } from '@heroicons/react/outline';
import { ThumbUpIcon as ThumUpIconFilled } from '@heroicons/react/solid';
import React from 'react';

const LikeButton = (props) => {
  const { hasLiked, likePost } = props;
  return (
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
  );
};

export default LikeButton;
