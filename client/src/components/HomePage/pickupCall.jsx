import React, { useEffect, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import socket from '../../socket'; // Adjust the import path as necessary

const GlobalSocketHandler = () => {
  const user = useSelector((state) => state.auth.user._id);
  const [incomingCall, setIncomingCall] = useState(null);

  const joinVideoCall = useCallback((sender, receiver, socketId, senderName, receiverName) => {
    setIncomingCall({ sender, receiver, socketId, senderName });
  }, []);

  useEffect(() => {
    socket.on('videoCallRequest', ({ sender, receiver, socketId, SenderName, ReceiverName }) => {
      joinVideoCall(sender, receiver, socketId, SenderName, ReceiverName);
    });

    return () => {
      socket.off('videoCallRequest');
    };
  }, [joinVideoCall]);

  const handleAccept = () => {
    console.log('✅ Call accepted');
    // TODO: Start video call or redirect
    setIncomingCall(null);
  };

  const handleReject = () => {
    console.log('❌ Call rejected');
    setIncomingCall(null);
  };

  return (
    <>
      {incomingCall && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm text-center">
            <div className="text-3xl mb-2">📞 Incoming Call</div>
            <div className="text-lg text-gray-700 font-semibold mb-4">
              {incomingCall.senderName} is calling you...
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleAccept}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
              >
                Accept
              </button>
              <button
                onClick={handleReject}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GlobalSocketHandler;
