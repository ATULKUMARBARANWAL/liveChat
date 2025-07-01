import React from 'react';
import { useSelector } from 'react-redux';
import { FaDownload } from "react-icons/fa";
import { useDispatch } from 'react-redux';

import { downloadPic } from '../../Users/userIndex';
const UserProfile = () => {
  const { userDetails } = useSelector((state) => state.user);
const dispatch=useDispatch();
function handledownload(e) {
  e.preventDefault();
  const pic = userDetails.data.pic;

  dispatch(downloadPic({ pic })).then((res) => {
    if (res.payload) {
      const link = document.createElement('a');
      link.href = res.payload;
      link.download = pic; // optional: custom name like "profile.jpg"
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  });
}

  return (
    <div className="w-full flex justify-center">
      <div className="w-full md:w-2/3 lg:w-1/2 bg-white shadow-2xl rounded-2xl p-6 border border-gray-200">
      <div className='flex justify-between'>
        <h2 className="text-3xl font-bold mb-6 text-blue-700">👤 User Profile</h2>
<FaDownload onClick={handledownload} /></div>
        {userDetails ? (
          <div className="flex items-center gap-6">
            <img
              src={`http://localhost:3000/assets/${userDetails.data.pic}`}
              alt="User"
              className="w-28 h-28 rounded-full object-cover border-2 border-blue-300 shadow-md"
            />
            <div>
              <p className="text-xl font-semibold text-gray-800">
                {userDetails.data.name}
              </p>
              <p className="text-gray-600 text-sm mt-1">
                📧 {userDetails.data.email}
              </p>
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
