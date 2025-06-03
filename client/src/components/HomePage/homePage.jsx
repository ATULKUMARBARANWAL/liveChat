import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ChatSideBar from './leftHomePage';
import io from 'socket.io-client';
import UserProfile from './rightHomePage';
const socket = io.connect('http://localhost:3000');
const HomePage = () => {
  const user = useSelector((state) => state.user);

  const loginUser=useSelector((state)=>state.auth.user.data._id);
  useEffect(()=>{
    socket.emit('register', loginUser);
  }, [loginUser]);

  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-6 px-4 py-8 w-full min-h-screen bg-gradient-to-r from-blue-50 to-gray-100">
        {user.userDetails !== undefined && <UserProfile />}
      {user.userDetails !== undefined && <ChatSideBar />}
 
    </div>
  );
};

export default HomePage;
