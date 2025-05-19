import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Optional icon library (or use SVG)
import {logout} from "../../Auth/authSlice";
import { useDispatch } from "react-redux";
const Navbar = () => {
    const dispatch=useDispatch()
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
const handleLogout=()=>{
    dispatch(logout())
}
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-gray-800">
          <Link to="/">Logo</Link>
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
