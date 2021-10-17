import React from 'react';
import AddPost from '../components/AddPost';
import Stories from './Stories';

const Feed = () => {
  return (
    <div className="flex-grow h-screen pb-44 pt-6 mr-4 xl:mr-60 overflow-y-auto">
      <div className="mx-auto max-w-md md:max-w-lg lg:max-w-2xl">
        <Stories />
        <AddPost />
        {/* Posts */}
      </div>
    </div>
  );
};

export default Feed;
