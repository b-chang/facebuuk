import {
  ChevronDownIcon,
  ShoppingBagIcon,
  UserGroupIcon,
} from '@heroicons/react/outline';
import {
  CalendarIcon,
  ClockIcon,
  DesktopComputerIcon,
  UsersIcon,
} from '@heroicons/react/solid';
import React from 'react';
import { useSelector } from 'react-redux';
import SidebarRow from './SidebarRow';

const Sidebar = () => {
  const state = useSelector((state) => state);
  const { data, loading } = state.user;
  const name = `${data.firstName} ${data.lastName}`;

  return (
    <div className="p-2 mt-5 max-w-[600px] xl:min-w[300px]">
      {loading === 'loaded' && <SidebarRow src={data.image} title={name} />}
      <SidebarRow Icon={UsersIcon} title="Friends" />
      <SidebarRow Icon={UserGroupIcon} title="Groups" />
      <SidebarRow Icon={ShoppingBagIcon} title="Marketplace" />
      <SidebarRow Icon={DesktopComputerIcon} title="Watch" />
      <SidebarRow Icon={CalendarIcon} title="Events" />
      <SidebarRow Icon={ClockIcon} title="Memories" />
      <SidebarRow Icon={ChevronDownIcon} title="See More" />
    </div>
  );
};

export default Sidebar;
