import React, { useState } from "react";
import { useSelector } from "react-redux";

const GroupChatLeft = () => {
  const groupDetails = useSelector((state) => state.group);

  console.log(groupDetails)
  const [message, setMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    console.log("Send message:", message); // You can dispatch action here
    setMessage(""); // Clear input
  };

  if (!groupDetails.groupDetails) {
    return (
      <div className="w-full md:w-[40%] h-[90vh] p-6 bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col justify-center items-center text-center">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">Group Chat Area</h2>
        <p className="text-gray-600 text-sm">This is where your group messages will appear.</p>
      </div>
    );
  }

  return (
    <div className="w-full md:w-[40%] h-[90vh] p-6 bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-semibold text-green-700 mb-4">Group: {groupDetails.groups.name}</h2>
        {/* Future: Chat messages can be shown here */}
        <p className="text-gray-600 text-sm mb-4">Start chatting in the group!</p>
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
