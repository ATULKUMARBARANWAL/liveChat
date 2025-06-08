import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ChatSideBar from './leftHomePage';
import UserProfile from './rightHomePage';
import GroupChatLeft from './groupChatleft';
import GroupChatRight from './groupChatRight.jsx';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3000');

const HomePage = () => {
  const user = useSelector((state) => state.user);
  const userSearcherByNavbar = useSelector((state) => state.user.profileOpen);
  const loginUser = useSelector((state) => state.auth.user.data._id);

  useEffect(() => {
    socket.emit('register', loginUser);
  }, [loginUser]);

  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-6 px-6 py-8 w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100">
      {userSearcherByNavbar && user.userDetails ? (
        <>
          <UserProfile />
          <ChatSideBar />
        </>
      ) : (
        <>
          <GroupChatRight />
          <GroupChatLeft />
        </>
      )}
    </div>
  );
};

export default HomePage;
