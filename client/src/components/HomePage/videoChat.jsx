import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userVideoCall } from '../../Users/userReducer';
import socket from '../../socket'; // ✅ Make sure socket is imported

const VideoChatPage = () => {
  const dispatch = useDispatch();
  
const senderFromCall = useSelector((state) => state.videoCall.callData?.sender);
const receiverFromCall = useSelector((state) => state.videoCall.callData?.receiver);
const authUserId = useSelector((state) => state.auth.user?.data?._id) || null;
const receiverUserId = useSelector((state) => state.user.userDetails?.data?._id) || null;
const isCaller = useSelector((state) => state.videoCall.callData?.isCaller);
const answerCall=useSelector((state)=>state.videoCall.answerVideoCall)
const sender = senderFromCall || authUserId;
const receiver = receiverFromCall || receiverUserId;


  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peer = useRef(null);

  const hasRun = useRef(false);

  const [isAudio, setIsAudio] = useState(true);
  const [isVideo, setIsVideo] = useState(true);

socket.on('videoAnswer', async ({ answer }) => {
  try {
    const state = peer.current?.signalingState;
    console.log('📩 Received videoAnswer at signaling state:', state);

    if (state === 'have-local-offer') {
      await peer.current.setRemoteDescription(new RTCSessionDescription(answer));
      console.log('✅ Remote description (answer) set successfully');
    } else {
      console.warn('⚠️ Skipped setting remote answer. Unexpected signaling state:', state);
    }
  } catch (error) {
    console.error('❌ Error setting remote answer:', error);
  }
});


  useEffect(() => {
   
    const setupMediaAndCall = async () => {
      if (hasRun.current || peer.current) {
        return;
      }
      hasRun.current = true;

      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

      if (localVideoRef.current) {
        console.log('📹 Local video stream started', localVideoRef.current);
        localVideoRef.current.srcObject = stream;
      }

      // Create Peer Connection
      peer.current = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
      });

      // Add tracks to peer
      stream.getTracks().forEach((track) => {
        console.log('🎥 Adding track to peer:', track);
        peer.current.addTrack(track, stream);
      });

      // Handle remote stream
    peer.current.ontrack = (event) => {
  if (
    remoteVideoRef.current &&
    !remoteVideoRef.current.srcObject
  ) {
    console.log('📹 ontrack event streams:', event.streams);
    remoteVideoRef.current.srcObject = event.streams[0];
  }
};

      // Handle ICE candidates
      peer.current.onicecandidate = (event) => {
        console.log('🧊 ICE candidate event:', event);
        if (event.candidate) {
          socket.emit('sendIceCandidate', {
            candidate: event.candidate,
            sender,
            receiver,
          });
        }
      };

      // Receive ICE
      socket.on('receiveIceCandidate', async ({ candidate }) => {
        console.log('🧊 Received ICE candidate:', candidate);
        try {
          await peer.current.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (err) {
          console.error('ICE Error:', err);
        }
      });

      // If caller: create offer
   
      if (answerCall && answerCall.receiver === receiver) {
        const offer = await peer.current.createOffer();
        await peer.current.setLocalDescription(offer);
console.log('📞 Created video offer:', offer);
        socket.emit('videoOffer', {
          offer,
          sender,
          receiver,
        });
      }
      else{
        console.log('📞 Waiting for video offer from caller',isCaller);
      }

      // Receive answer



      // Receive offer if callee
      socket.on('videoOffer', async ({ offer, sender: caller }) => {
          
        await peer.current.setRemoteDescription(new RTCSessionDescription(offer));

        const answer = await peer.current.createAnswer();
        await peer.current.setLocalDescription(answer);

        socket.emit('videoAnswer', {
          answer,
          sender,
          receiver,
        });
      });
    };

    setupMediaAndCall();
  }, [sender, receiver]);

  // End Call
  const endCall = () => {
    dispatch(userVideoCall(false));
    if (peer.current) {
      peer.current.close();
    }
  };

  const toggleAudio = () => setIsAudio((prev) => !prev);
  const toggleVideo = () => setIsVideo((prev) => !prev);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
  <div className="flex flex-col md:flex-row flex-1 justify-center items-center gap-4 p-2 md:p-4">
    <video
      ref={localVideoRef}
      className="w-full md:w-1/2 h-64 md:h-96 bg-black rounded-2xl shadow-md"
      autoPlay
      playsInline
      muted
    />
    <video
      ref={remoteVideoRef}
      className="w-full md:w-1/2 h-64 md:h-96 bg-black rounded-2xl shadow-md"
      autoPlay
      playsInline
    />
  </div>

  <div className="flex justify-center gap-4 md:gap-6 p-4 md:p-6 bg-gray-800 rounded-t-3xl">
    <button
      onClick={toggleAudio}
      className="bg-blue-600 hover:bg-blue-700 px-3 md:px-4 py-2 rounded-xl text-sm"
    >
      {isAudio ? 'Mute' : 'Unmute'}
    </button>
    <button
      onClick={toggleVideo}
      className="bg-green-600 hover:bg-green-700 px-3 md:px-4 py-2 rounded-xl text-sm"
    >
      {isVideo ? 'Stop Video' : 'Start Video'}
    </button>
    <button
      onClick={endCall}
      className="bg-red-600 hover:bg-red-700 px-3 md:px-4 py-2 rounded-xl text-sm"
    >
      End Call
    </button>
  </div>
</div>

  );
};

export default VideoChatPage;
