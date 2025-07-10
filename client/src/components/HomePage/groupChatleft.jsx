import React, { useState, useEffect ,useRef} from "react";
import { useSelector ,useDispatch} from "react-redux";
import { SlOptionsVertical } from "react-icons/sl";
import socket from "../../socket";
import { allgroupMessage } from "../../Group/groupIndex";


const GroupChatLeft = () => {
  const dispatch=useDispatch()
  const { groupDetails } = useSelector((state) => state.group);
const groupMessages = useSelector((state) => state.group.groupMessage);
const messageRef=useRef(null);
console.log("Group Messages",groupMessages)
  const sender = useSelector((state) => state.auth.user.data._id);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  useEffect(()=>{
messageRef.current?.scrollIntoView({behavior:"smooth"})
},[messages])
useEffect(() => {
  if (groupMessages.data) {
    const sorted = [...groupMessages.data].sort((a, b) =>
      new Date(a.createdAt) - new Date(b.createdAt)
    );
    setMessages(sorted);
  }
}, [groupMessages.data]);
function handleOptionClick(e) {
  e.preventDefault();
  setIsOptionsVisible(!isOptionsVisible);
 
}
useEffect(()=>{
dispatch(allgroupMessage(groupDetails._id))
},[groupDetails._id])
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    const msgObj = {
      sender,
      groupId: groupDetails._id,
      members: groupDetails.members,
      name: groupDetails.name,
      message,
      admin: groupDetails.admin
    };

    socket.emit('groupMessage', msgObj);
    setMessage("");
  };

  useEffect(() => {
    if (groupDetails?._id) {
      socket.emit('joinRoom', groupDetails._id);
    }

    const handleGroupMessage = (data) => {
      console.log("✅ Received group message:", data);
      setMessages((prev) => [...prev, data]);
    };

    socket.on('receiveGroupMessage', handleGroupMessage);

    return () => {
      socket.off('receiveGroupMessage', handleGroupMessage);
    };
  }, [groupDetails?._id]);

  if (!groupDetails) {
    return (
      <div className="w-full md:w-[40%] h-[90vh] p-6 bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col justify-center items-center text-center">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">Group Chat Area</h2>
        <p className="text-gray-600 text-sm">This is where your group messages will appear.</p>
      </div>
    );
  }

  return (
    <div className="w-full md:w-[40%] h-[90vh] p-6 bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col justify-between">
      <div className="overflow-y-auto mb-4">
<h2 className="text-2xl font-semibold text-green-700 mb-4 flex items-center justify-between">
  <span>Group: {groupDetails.name}</span>
<span className="text-gray-500 cursor-pointer" onClick={handleOptionClick} ><SlOptionsVertical /></span>


</h2>
{isOptionsVisible==
<ul className="hidden">
  <li>
    <b>YUP</b>
  </li>
</ul>
}
     {messages.map((msg, index) => {
  const senderId = typeof msg.sender === 'object' ? msg.sender._id : msg.sender;
  const senderName =
    senderId === sender
      ? 'You'
      : msg.sender?.name ||
        groupDetails.members.find((member) => member._id === senderId)?.name ||
        'Unknown';

  return (
    <div
      key={index}
      className={`mb-2 p-2 rounded-lg ${
        senderId === sender ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'
      }`}
    >
      <span className="text-sm font-medium">{senderName}</span>
      <p>{msg.message}</p>
    </div>
  );
})}

  <div ref={messageRef } />
      </div>

      <form onSubmit={handleSendMessage} className="mt-auto">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="mt-2 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default GroupChatLeft;
