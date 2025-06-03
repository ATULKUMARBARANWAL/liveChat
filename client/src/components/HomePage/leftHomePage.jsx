// leftHomepage.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3000');

const ChatSidebar = () => {
  const sender = useSelector((state) => state.auth.user.data._id);
  const receiver = useSelector((state) => state.user.userDetails.data._id);
  console.log("Receiver ID:", receiver);
  console.log("Sender ID:", sender);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

const roomId=[String(sender),String(receiver)].sort().join('_');
const messagess = useSelector((state) => state.user.messages);
console.log("Messages from Redux:", messagess);
useEffect(() => {
  if (messagess && Array.isArray(messagess)) {
    const formattedMessages = messagess
      .map((msg) => ({
        senderId: msg.sender._id,
        senderName: msg.sender.name,
        receiverId: msg.receiver._id,
        receiverName: msg.receiver.name,
        text: msg.message,
        timedate: msg.timestamp,
      }))
      .sort((a, b) => new Date(a.timedate) - new Date(b.timedate)); // ascending by time

    setMessages(formattedMessages);
  }
}, [messagess]);



  useEffect(() => {
    if (sender) {
      socket.emit('register', sender);
    }
  }, [sender]);
useEffect(() => {
    if (roomId) {
      socket.emit('joinRoom', roomId);
    }
  }, [roomId]);
  // Listen for incoming messages
 useEffect(() => {
  socket.on('receiveMessages', (msg) => {
    const transformedMessage = {
      senderId: msg.sender,
      receiverId: msg.receiver,
      text: msg.text,
      timedate: new Date().toISOString(), // current time
    };

    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, transformedMessage];
      return updatedMessages.sort((a, b) => new Date(a.timedate) - new Date(b.timedate));
    });
  });

  return () => {
    socket.off('receiveMessages');
  };
}, []);


  const handleSend = () => {
    if (!newMessage.trim()) return;

    const messageData = {
      sender: sender,
      receiver: receiver,
      text: newMessage,
    };

    socket.emit('sendMessages', messageData);
    setNewMessage('');
  };

  return (
    <div className="w-full md:w-3/3 h-[90vh] mt-[-28px] bg-white rounded-2xl shadow-xl flex flex-col border border-gray-200">
      <div className="p-4 border-b flex justify-between text-lg font-semibold text-gray-900 bg-gradient-to-r from-gray-100 to-gray-200 rounded-t-2xl">
        <p>💬 Chat Sidebar</p>
        <p className='text-2xl'><i className="fa-solid fa-eye"></i></p>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
     {messages.map((msg) => (
  <div
    key={msg._id || msg.id || Math.random()} // Fallback in case msg._id is also undefined
    className={`flex ${msg.senderId === sender ? 'justify-end' : 'justify-start'}`}
  >
    <div
      className={`max-w-[75%] px-4 py-2 rounded-xl text-sm break-words
        ${msg.senderId === sender
          ? 'bg-blue-600 text-white'
          : 'bg-gray-200 text-gray-800'
        }`}
    >
      {msg.text || ''}
    </div>
  </div>
))}

      </div>
      <div className="p-4 border-t bg-white flex gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 rounded-xl border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatSidebar;
