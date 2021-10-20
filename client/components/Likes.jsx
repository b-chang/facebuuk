import { ThumbUpIcon as ThumUpIconFilled } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';

const Likes = (props) => {
  const { post, numberOfLikes } = props;
  const [likes, setLikes] = useState(post.likes.length);

  useEffect(() => {}, [likes]);

  return (
    <div className="flex items-center space-x-2">
      <ThumUpIconFilled className="h-4 text-blue-500" />
      {numberOfLikes ? (
        <p className="text-sm text-blue-500 sm:text-base">{numberOfLikes}</p>
      ) : (
        ''
      )}
    </div>
  );
};

export default Likes;
