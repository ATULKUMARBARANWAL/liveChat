
import { useState } from "react";
import { FaUser, FaEnvelope, FaLock,FaCloudUploadAlt } from "react-icons/fa";
import { loginUser } from "../../Auth/authIndex";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
const UserSignIn=()=>{
  const dispatch=useDispatch();
const [formData,setFormData]=useState({email:"",password:""});
const handleChange=(e)=>{
  const {name,value}=e.target;
 setFormData({...formData,[name]:value})

}
const handleSubmit=(e)=>{
  e.preventDefault()
 
}
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-darkGray to-darkerGray px-4">
  <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Create Account</h2>
        <p className="text-gray-500 text-center mb-6">Join us and explore the experience</p>
        <form onSubmit={handleSubmit} className="space-y-4">
         
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
        onChange={handleChange}
           
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
         onChange={handleChange}
           
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
  
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
            onClick={()=>dispatch(loginUser(formData))} 
          >
            Log In
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account? <NavLink to="/register" className="text-indigo-600 hover:underline">Register here</NavLink>
        </p>
      </div>
    </div>
  );
}

export default UserSignIn;