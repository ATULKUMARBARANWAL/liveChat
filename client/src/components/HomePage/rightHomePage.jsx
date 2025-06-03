import React from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
const UserProfile = () => {
  const { userDetails } = useSelector((state) => state.user);


  return (
    <div className="w-full flex justify-center h-64">
      <div className="w-full md:w-2/3 lg:w-1/2 bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">👤 User Profile</h2>
        {userDetails ? (
          <div className="flex items-center gap-6">
            <img
              src={`http://localhost:3000/assets/${userDetails.data.pic}`}
              alt="User"
              className="w-24 h-24 rounded-full object-cover border border-gray-300 shadow-sm"
            />
            <div>
              <p className="text-lg font-medium text-gray-800">
                Name: {userDetails.data.name}
              </p>
              <p className="text-gray-600">Email: {userDetails.data.email}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 italic">No user details available</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
