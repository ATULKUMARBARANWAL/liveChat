import React, { useEffect, useRef } from 'react';
import ChatSideBar from './leftHomePage';
import UserProfile from './rightHomePage';
import GroupChatLeft from './groupChatleft';
import GroupChatRight from './groupChatRight.jsx';
import VideoChatPage from './videoChat.jsx';
import socket from '../../socket'; // Adjust the import path as necessary
import { useSelector } from 'react-redux';
const HomePage = () => {
  const hasRegistered = useRef(false);
  const user = useSelector((state) => state.user);
  const userSearcherByNavbar = useSelector((state) => state.user.profileOpen);
  const loginUser = useSelector((state) => state.auth.user.data._id);
  const isUserVideoCall = useSelector((state) => state.user.isVideoCall);

  useEffect(() => {
    if (!hasRegistered.current && loginUser) {
      socket.emit('register', loginUser);
      console.log('📡 Emitted register for', loginUser);
      hasRegistered.current = true;
    }
  }, [loginUser]);

  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-6 px-6 py-8 w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100">
      {userSearcherByNavbar && user.userDetails ? (
        isUserVideoCall ? (
          <div className="w-full text-center mt-10">
            <VideoChatPage />
          </div>
        ) : (
          <>
            <UserProfile />
            <ChatSideBar />
          </>
        )
      ) : (

        <>
          {isUserVideoCall ? (
            <div className="w-full text-center mt-10">
              <VideoChatPage />
            </div>
          ) : (
            <>
              <GroupChatRight />
              <GroupChatLeft />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
