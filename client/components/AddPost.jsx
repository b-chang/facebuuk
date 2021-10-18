import { EmojiHappyIcon } from '@heroicons/react/outline';
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/solid';
import axios from 'axios';
import { useSession } from 'next-auth/client';
import Image from 'next/image';
import React, { useRef, useState } from 'react';

const AddPost = () => {
  const [session] = useSession();
  const [postInput, setPostInput] = useState('');
  const [imageToPost, setImageToPost] = useState(null);
  const filePickerRef = useRef(null);

  const createPost = async (post) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/posts`,
        post,
        {
          withCredentials: true,
          credentials: 'include',
        }
      );
      // @WIP need to add proper success and error message handling
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  const submitPost = (e) => {
    e.preventDefault();

    const post = {
      content: postInput,
      id: session.user.id,
      image: imageToPost,
    };
    createPost(post);
  };

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

  return (
    <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
      <div className="flex space-x-4 p-4 items-center">
        <Image
          className="rounded-full"
          src={session.user.image}
          width={40}
          height={40}
          layout="fixed"
        />
        <form className="flex flex-1" onSubmit={(e) => submitPost(e)}>
          <input
            className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
            type="text"
            placeholder={`What's on your mind, ${session.user.name}?`}
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
            <img className="h-10 object-contain" src={imageToPost} alt="" />
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
    </div>
  );
};

export default AddPost;
