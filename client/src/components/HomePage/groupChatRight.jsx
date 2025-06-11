import React, { use, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterUsers } from '../../Users/userIndex.jsx';
import { resetUsers } from '../../Users/userReducer.jsx';
import { allGroup } from '../../Group/groupIndex.jsx';
import { getUserDetails } from '../../Users/userIndex.jsx';
import { createGroup } from '../../Group/groupIndex.jsx';
import { groupDetails } from '../../Group/groupReducer.jsx';
const GroupChatRight = () => {
  const { users } = useSelector((state) => state.user);
 const {userDetails}=useSelector((state)=>state.user);
  const [searchItem, setSearchItem] = useState("");
  const [showList, setShowList] = useState(false);
  const [userList, setUserList] = useState([]);
  const [description,setDescription]=useState("")
  const [groupName,setGroupName]=useState("")
  const dispatch = useDispatch();
  const sender = useSelector((state) => state.auth.user.data._id);

useEffect(() => {
  dispatch(allGroup(sender));
}, [sender]); // ✅ Correct
const groupData = useSelector((state) => state.group.groups); // ✅ correct

console.log(groupData)
  useEffect(() => {
    if (userDetails) {
      setUserList((prev) => [...prev, userDetails]);
    }
  }, [userDetails]);
  const handleUserClick = (e) => {
    const userId = e.currentTarget.dataset.key;

    dispatch(getUserDetails(userId));

    setShowList(false);
    searchItem && setSearchItem("");
  };

  const handleSearch = (e) => {
    const search = e.target.value;
    setSearchItem(search);
    setShowList(true);

    if (!search.trim()) {
      dispatch(resetUsers());
      return;
    }

    dispatch(filterUsers(search));
  };

  useEffect(() => {
    if (!Array.isArray(users?.data)) return;
    if (!searchItem.trim()) setShowList(false);
  }, [users, searchItem]);
function handleButtonClick(e) {
  e.preventDefault();

  // Get list of selected user IDs
  const selectedUsers = userList.map(user => user.data._id);

  // Ensure sender is included (and only once)
  const allMembers = [...new Set([...selectedUsers, sender])];

  const groupData = {
    name: groupName,
    description: description,
    members: allMembers,
    admin: sender
  };
dispatch(createGroup(groupData))
 
  setUserList([]);
  setDescription("");
  setGroupName("");
}


function handleDescription(e)
{
  e.preventDefault()

setDescription(e.target.value)
}
function handleGroupName(e)
{
e.preventDefault()
setGroupName(e.target.value)
}
function handleGroup(groupdetail)
{

 dispatch(groupDetails(groupdetail))
}
  return (
    <div className="w-full md:w-[35%] h-[90vh] p-6 bg-white rounded-2xl shadow-xl flex flex-col border border-gray-200">
  {/* Header Section */}
  <div className="space-y-4 mb-6">
    <h2 className="text-2xl font-semibold text-blue-700">Create Group Chat</h2>

    <input
      type="text"
      placeholder="Enter group name"
      value={groupName}
      onChange={handleGroupName}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <textarea
      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={description}
      onChange={handleDescription}
      placeholder="Enter description here..."
    />

    <div className="relative">
      <input
        type="text"
        placeholder="Search users..."
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleSearch}
        value={searchItem}
      />

      {showList && searchItem && Array.isArray(users?.data) && users.data.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-2 max-h-60 overflow-y-auto shadow-lg rounded-lg animate-fade-in transition-opacity">
          {users.data.map((user) => (
            <li
              key={user._id}
              data-key={user._id}
              className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-blue-100 cursor-pointer"
              onClick={handleUserClick}
            >
              <img
                src={`http://localhost:3000/assets/${user.pic}`}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="truncate">{user.name || <i className="text-red-500">Unknown</i>}</span>
            </li>
          ))}
        </ul>
      )}

      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-all text-sm"
        onClick={handleButtonClick}
      >
        Create
      </button>
    </div>
  </div>

  {/* Selected Members */}
  <div className="flex-1 overflow-y-auto border border-gray-200 rounded-xl p-4 bg-gray-50 mb-4">
    <h3 className="text-sm font-medium text-gray-600 mb-2">Selected Members</h3>
    <div className="flex flex-wrap gap-2">
      {userList.map((user, index) => (
        <span
          key={index}
          className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full shadow hover:bg-blue-200 transition"
        >
          {user?.data?.name || <i className="text-red-500 italic">Unknown</i>}
        </span>
      ))}
    </div>
  </div>

  {/* Group List */}
  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
    <h3 className="text-sm font-medium text-gray-600 mb-2">Your Groups</h3>
    <ul className="text-sm text-gray-800 space-y-1">
      {groupData.map((data) => (
        <li key={data._id} className="px-2 py-1 rounded hover:bg-blue-100 transition"

        >
   <b className='cursor-pointer' onClick={() => handleGroup(data)}>{data.name}</b>


        </li>
      ))}
    </ul>
  </div>
</div>

  );
};

export default GroupChatRight;
