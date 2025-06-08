import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3000');

const ChatSidebar = () => {
  const sender = useSelector((state) => state.auth.user.data._id);
  const receiver = useSelector((state) => state.user.userDetails.data._id);
  const messagess = useSelector((state) => state.user.messages);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const roomId = [String(sender), String(receiver)].sort().join('_');

  useEffect(() => {
    if (messagess && Array.isArray(messagess)) {
      const formattedMessages = messagess
        .map((msg) => ({
          senderId: msg.sender._id,
          receiverId: msg.receiver._id,
          text: msg.message,
          timedate: msg.timestamp,
        }))
        .sort((a, b) => new Date(a.timedate) - new Date(b.timedate));
      setMessages(formattedMessages);
    }
  }, [messagess]);

  useEffect(() => {
    if (sender) socket.emit('register', sender);
  }, [sender]);

  useEffect(() => {
    if (roomId) socket.emit('joinRoom', roomId);
  }, [roomId]);

  useEffect(() => {
    socket.on('receiveMessages', (msg) => {
      const transformedMessage = {
        senderId: msg.sender,
        receiverId: msg.receiver,
        text: msg.text,
        timedate: new Date().toISOString(),
      };

      setMessages((prev) =>
        [...prev, transformedMessage].sort((a, b) => new Date(a.timedate) - new Date(b.timedate))
      );
    });

    return () => socket.off('receiveMessages');
  }, []);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    socket.emit('sendMessages', {
      sender,
      receiver,
      text: newMessage,
    });

    setNewMessage('');
  };

  return (
    <div className="w-full md:w-2/3 h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200">
      <div className="p-4 border-b flex justify-between items-center text-lg font-semibold bg-gradient-to-r from-blue-100 to-blue-200 rounded-t-2xl">
        <p>💬 Chat Sidebar</p>
        <i className="fa-solid fa-eye text-xl text-gray-700" />
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 scroll-smooth">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.senderId === sender ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-xl text-sm break-words ${
                msg.senderId === sender
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800'
              } shadow-sm`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t flex gap-2 bg-white">
        <input
          type="text"
          placeholder="Type a message..."
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
