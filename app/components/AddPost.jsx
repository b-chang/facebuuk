import { EmojiHappyIcon } from '@heroicons/react/outline';
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../store/reducer/post-reducer';

const AddPost = () => {
  const [postInput, setPostInput] = useState('');
  const [imageToPost, setImageToPost] = useState(null);
  const filePickerRef = useRef(null);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { data, loading } = state.user;
  const name = `${data.firstName} ${data.lastName}`;
  const { error } = state.allPosts;
  const [displayError, setDisplayError] = useState(error);

  const submitPost = (e) => {
    e.preventDefault();

    const post = {
      content: postInput,
      id: data._id,
      image: imageToPost,
    };
    dispatch(addPost(post));
    setPostInput('');
  };
  console.log('image', imageToPost)
  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    };
  };

  const removeImage = () => {
    setImageToPost(null);
  };

  useEffect(() => {
    setDisplayError(error);
  }, [error]);

  return (
    <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
      <div className="flex space-x-4 p-4 items-center">
        {loading === 'loaded' && (
          <Image
            className="rounded-full"
            src={data.image}
            width={40}
            height={40}
            layout="fixed"
            alt="user image"
          />
        )}
        <form className="flex flex-1" onSubmit={(e) => submitPost(e)}>
          <input
            className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
            type="text"
            placeholder={`What's on your mind, ${name}?`}
            value={postInput}
            onChange={(e) => setPostInput(e.target.value)}
          />
          <button className="hidden" type="submit">
            Submit
          </button>
        </form>
        {imageToPost && (
          <div
            onClick={() => removeImage()}
            className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer"
          >
            <Image
              className="h-10 object-contain"
              src={imageToPost}
              alt="user image"
              width={40}
              height={40}
            />
            <p className="text-xs text-red-500 text-center">Remove</p>
          </div>
        )}
      </div>
      <div className="flex justify-evenly p-3 border-t">
        <div className="inputIcon">
          <VideoCameraIcon className="h-7 text-red-500" />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>
        <div
          onClick={() => filePickerRef.current.click()}
          className="inputIcon"
        >
          <CameraIcon className="h-7 text-green-500" />
          <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
          <input
            ref={filePickerRef}
            onChange={(e) => addImageToPost(e)}
            name="imageOnPost"
            type="file"
            hidden
          />
        </div>
        <div className="inputIcon">
          <EmojiHappyIcon className="h-7 text-yellow-500" />
          <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
        </div>
      </div>
      {/* send alert if bad user action */}
      {displayError ? (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              onClick={() => setDisplayError('')}
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default AddPost;
