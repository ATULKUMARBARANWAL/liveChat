import React, { useRef, useState } from 'react';
import {userVideoCall} from '../../Users/userReducer';
import { useDispatch } from 'react-redux';
const VideoChatPage = () => {
    const dispatch = useDispatch();
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [isAudio, setIsAudio] = useState(true);
  const [isVideo, setIsVideo] = useState(true);

  const toggleAudio = () => {
    setIsAudio(!isAudio);
    
  };

  const toggleVideo = () => {
    setIsVideo(!isVideo);
  
  };

  const endCall = () => {
 
  dispatch(userVideoCall(false));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <div className="flex flex-1 justify-center items-center gap-4 p-4">
        <video
          ref={localVideoRef}
          className="w-1/2 h-96 bg-black rounded-2xl shadow-md"
          autoPlay
          playsInline
          muted
        />
        <video
          ref={remoteVideoRef}
          className="w-1/2 h-96 bg-black rounded-2xl shadow-md"
          autoPlay
          playsInline
        />
      </div>

      <div className="flex justify-center gap-6 p-6 bg-gray-800 rounded-t-3xl">
        <button
          onClick={toggleAudio}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-sm"
        >
          {isAudio ? 'Mute' : 'Unmute'}
        </button>
        <button
          onClick={toggleVideo}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl text-sm"
        >
          {isVideo ? 'Stop Video' : 'Start Video'}
        </button>
        <button
          onClick={endCall}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl text-sm"
        >
          End Call
        </button>
      </div>
    </div>
  );
};

export default VideoChatPage;
