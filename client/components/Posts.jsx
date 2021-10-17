import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Post from './Post';

const Posts = () => {
  const [displayPosts, setDisplayPosts] = useState([]);

  const fetchAllPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/posts', {
        withCredentials: true,
        credentials: 'include',
      });
      setDisplayPosts((prev) => [...prev, ...response.data]);
    } catch (e) {
      // @WIP need to add better error handling
      console.log(e);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  return (
    <div>
      {displayPosts.map((post, idx) => (
        <Post key={idx} post={post} />
      ))}
    </div>
  );
};

export default Posts;
