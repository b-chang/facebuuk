import {
  FlagIcon,
  PlayIcon,
  SearchIcon,
  ShoppingCartIcon,
} from '@heroicons/react/outline';
import {
  BellIcon,
  ChatIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon,
} from '@heroicons/react/solid';
import axios from 'axios';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import Dropdown from './Dropdown';
import HeaderIcon from './HeaderIcon';

const Header = (props) => {
  const { user } = props;
  const [editProfileImage, setEditProfileImage] = useState(null);
  const filePickerRef = useRef(null);
  const [updatePic, setUpdatePic] = useState(false);

  const uploadProfilePic = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      const image = readerEvent.target.result;
      updateProfilePic(image);
    };
  };

  const updateProfilePic = async (newImage) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/user/${user._id}`,
        {
          image: newImage,
        }
      );
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-white flex items-center p-2 lg:px-5 shadow-md">
      {/* Left */}
      <div className="flex items-center">
        <Image
          src="https://links.papareact.com/5me"
          width={40}
          height={40}
          layout="fixed"
        />
        <div className="flex ml-2 rounded-full bg-gray-50 p-2">
          <SearchIcon className="h-6 text-gray-600" />
          <input
            className="hidden md:inline-flex ml-2 items-center bg-transparent outline-none placeholder-gray-500 flex-shrink"
            type="text"
            placeholder="Search Facebook"
          />
        </div>
      </div>

      {/* Middle */}
      <div className="flex justify-center flex-grow">
        <div className="flex space-x-6">
          <HeaderIcon active="true" Icon={HomeIcon} />
          <HeaderIcon Icon={FlagIcon} />
          <HeaderIcon Icon={PlayIcon} />
          <HeaderIcon Icon={ShoppingCartIcon} />
          <HeaderIcon Icon={UserGroupIcon} />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center sm:space-x-2 justify-end">
        {/* profile pic */}
        <Image
          className="rounded-full cursor-pointer"
          src={user.image}
          // src="https://links.papareact.com/k2j"
          width="40"
          height="40"
          layout="fixed"
          // onClick={(e) => editProfilePic(e)}
          onClick={() => filePickerRef.current.click()}
        />
        <input
          ref={filePickerRef}
          onChange={(e) => uploadProfilePic(e)}
          name="imageOnPost"
          type="file"
          hidden
        />
        <p className="hidden sm:inline-flex whitespace-nowrap font-semibold pr-3">
          {user.firstName} {user.lastName}
        </p>
        <ViewGridIcon className="icon" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <Dropdown />
      </div>
    </div>
  );
};

export default Header;
