import { ThumbUpIcon as ThumUpIconFilled } from '@heroicons/react/solid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Likes = (props) => {
  const { post, numberOfLikes } = props;
  const [likes, setLikes] = useState(post.likes.length);
  // console.log(post);

  const likesOnPost = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/posts/${post._id}`
      );
      console.warn(response.data);
      const {
        post: { likes },
      } = response.data;
      console.log(likes.length);
      setLikes(likes.length);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log('likes useEffect is running');
    likesOnPost();
  }, [likes]);

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
