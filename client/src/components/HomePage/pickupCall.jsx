import React, { useEffect, useCallback, useState, useRef, use } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import socket from '../../socket'; // Adjust the import path as necessary
import { userVideoCall } from '../../Users/userReducer';
import { setCallData } from '../../videoCall/peerToPeerCallReducer';
import { answerVideoCall } from '../../videoCall/peerToPeerCallReducer';
const GlobalSocketHandler = () => {
  const ref= useRef(null);
  const dispatch = useDispatch();
const user = useSelector((state) => state.auth.user?._id);

  const [incomingCall, setIncomingCall] = useState(null);

const joinVideoCall = useCallback((sender, receiver, socketId, senderName, receiverName) => {
  setIncomingCall({ sender, receiver, socketId, senderName, receiverName });
  dispatch(setCallData({
    sender,
    receiver,
    socketId,
    senderName,
    receiverName,
    isCaller: false  // 🔴 This is the receiver
  }));
}, [dispatch]);

  useEffect(() => {
    socket.on('videoCallRequest', ({ sender, receiver, socketId, SenderName, ReceiverName }) => {
  
      joinVideoCall(sender, receiver, socketId, SenderName, ReceiverName);
    });

    return () => {
      socket.off('videoCallRequest');
    };
  }, [joinVideoCall]);
useEffect(() => {
  const handleVideoCallRejected = ({ sender, receiver, SenderName, ReceiverName, socketId }) => {
    dispatch(userVideoCall(false));
    console.log(`❌ Video call rejected from ${sender} to ${receiver}`);
  };

  socket.on('videoCallRejected', handleVideoCallRejected);

  return () => {
    socket.off('videoCallRejected', handleVideoCallRejected); // ✅ Clean up
  };
}, []); // ✅ Only run once

useEffect(() => {
  setTimeout(() => {
    // Automatically reject the call after 10 seconds
    if (incomingCall && ref.current !== "CallAccepted") {
      socket.emit('rejectVideoCall', {
        sender: incomingCall.sender,
        receiver: incomingCall.receiver,
        socketId: incomingCall.socketId,
        SenderName: incomingCall.senderName,
        ReceiverName: incomingCall.receiverName
      });
      setIncomingCall(null);
    }
  }, 10000);
}, [incomingCall]);
useEffect(() => {
  const handleVideoCallAccepted = ({ sender, receiver, SenderName, ReceiverName, socketId }) => {
    console.log(`✅ Video call accepted from ${sender} to ${receiver}`);
    dispatch(userVideoCall(true));
dispatch(answerVideoCall({
  isCaller: true,
  sender,
  receiver
}));

    setIncomingCall(null);
  };

  socket.on('videoCallAcceptedd', handleVideoCallAccepted);

  return () => {
    socket.off('videoCallAcceptedd', handleVideoCallAccepted);
  };
}, []); // ❗ Empty dependency array ensures this runs only once

  const handleAccept = () => {
  socket.emit('videoCallAccepted', {
    sender: incomingCall.sender,
    receiver: incomingCall.receiver,
    socketId: incomingCall.socketId,
    SenderName: incomingCall.senderName,
    ReceiverName: incomingCall.receiverName
  });
  ref.current = "CallAccepted";
  setIncomingCall(null);
};

  const handleReject = () => {
  socket.emit('rejectVideoCall', {
    sender: incomingCall.sender,
    receiver: incomingCall.receiver,
    socketId: incomingCall.socketId,
    SenderName: incomingCall.senderName,
    ReceiverName: incomingCall.receiverName
  });


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
