import { useSelector } from "react-redux";
import { data, Link } from "react-router-dom";
import { useState ,useEffect, use} from "react";
import { Menu, X } from "lucide-react"; // Optional icon library (or use SVG)
import {logout} from "../../Auth/authSlice";
import { useDispatch } from "react-redux";
import { filterUsers } from "../../Users/userIndex.jsx";
import { resetUsers } from "../../Users/userReducer.jsx"; // Import resetUsers action
import { getUserDetails } from "../../Users/userIndex.jsx";
import {getAllMessages} from "../../Users/userIndex.jsx"; 
const Navbar = () => {
    const dispatch=useDispatch()
  const { user } = useSelector((state) => state.auth);
 const { users } = useSelector((state) => state.user);

const userId2=user.data._id;
console.log("User ID 2:", userId2);
  const [isOpen, setIsOpen] = useState(false);
const [searchItem,setSearchItem]=useState("");
  const toggleMenu = () => setIsOpen(!isOpen);
const handleLogout=()=>{
    dispatch(logout())
}
const handleSearch = (e) => {
  const search = e.target.value;

  if (!search.trim()) {
  
    dispatch(resetUsers());
    return;
  }

  dispatch(filterUsers(search));
};
const handleUserClick = (e) => {
  e.preventDefault();
  const userId = e.target.dataset.key;
  console.log("Selected User ID:", userId);
  if (!userId) return;
  dispatch(getAllMessages({ userId, userId2 }));
  dispatch(getUserDetails(userId));
};
useEffect(() => {
  if (Array.isArray(users?.data)) {

    users.data.forEach((u, i) => {
      setSearchItem(u.name)
    
    });
  } else {

  }
}, [users]);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
<div className="flex items-center gap-8">
        <div className="text-xl font-bold text-gray-800">
          <Link to="/">Logo</Link>
        </div>
       <div className="relative">
  <input
    type="search"
    placeholder="Search..."
    className="border rounded-md p-2 w-64"
    onChange={handleSearch}
  />
  
{searchItem && (
  <ul className="absolute z-10 bg-white border w-full mt-1 max-h-60 overflow-y-auto shadow-lg rounded-md">
    {Array.isArray(users?.data) && users.data.length > 0 ? (
      users.data.map((user) => (
        <li
          key={user._id}
          data-key={user._id}
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
          onClick={handleUserClick}
        >
            {  <img   src={`http://localhost:3000/assets/${user.pic}`} alt="User" className="w-10 h-10 rounded-full" /> || <span className="text-red-500 italic">null</span>}
          {user.name || <span className="text-red-500 italic">null</span>}
        </li>
      ))
    ) : null}
  </ul>
)}


</div>
 </div>
        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <li>
            <Link to="/" className="hover:text-blue-600 transition">Home</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-600 transition">About</Link>
          </li>
          <li>
            <Link to="/services" className="hover:text-blue-600 transition">Services</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-blue-600 transition">Contact</Link>
          </li>
         <li>
  <button onClick={handleLogout} className="hover:text-blue-600 transition">
    Logout
  </button>
</li>
<li>
  <img   src={`http://localhost:3000/assets/${user.data.pic}`} alt="User" className="w-10 h-10 rounded-full" />
</li>

        </ul>

        {/* Hamburger */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="space-y-2 text-gray-700 font-medium">
            <li>
              <Link to="/" onClick={toggleMenu} className="block hover:text-blue-600">Home</Link>
            </li>
            <li>
              <Link to="/about" onClick={toggleMenu} className="block hover:text-blue-600">About</Link>
            </li>
            <li>
              <Link to="/services" onClick={toggleMenu} className="block hover:text-blue-600">Services</Link>
            </li>
            <li>
              <Link to="/contact" onClick={toggleMenu} className="block hover:text-blue-600">Contact</Link>
            </li>
             <li>
  <button onClick={handleLogout} className="hover:text-blue-600 transition">
    Logout
  </button>
  </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
