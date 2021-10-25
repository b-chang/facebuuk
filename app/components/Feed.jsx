import React from 'react';
import AddPost from '../components/AddPost';
import Posts from './Posts';
import Stories from './Stories';

const Feed = () => {
  return (
    <div className="flex-grow h-screen pb-40 pt-6 mr-4 xl:mr-50 overflow-y-auto scrollbar-hide">
      <div className="mx-auto max-w-md md:max-w-lg lg:max-w-2xl">
        <Stories />
        <AddPost />
        <Posts />
      </div>
    </div>
  );
};

export default Feed;
