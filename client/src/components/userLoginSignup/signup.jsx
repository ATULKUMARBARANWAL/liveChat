import { useState } from "react";
import { FaUser, FaEnvelope, FaLock,FaCloudUploadAlt } from "react-icons/fa";

import { useDispatch } from "react-redux"; 
import { registerUser } from "../../Auth/authIndex";
function Register() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) =>{
   const{name,type,files,value}=e.target;
   if(type=='file')
   {
    setFormData({ ...formData, [name]:files[0]});
   }
   else{
    setFormData({...formData,[name]:value})
   }
   console.log("this is formData Baby",formData)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle register logic here
    console.log("Registering:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-darkGray to-darkerGray px-4">
  <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Create Account</h2>
        <p className="text-gray-500 text-center mb-6">Join us and explore the experience</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FaUser className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
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
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <div className="relative">
            <FaCloudUploadAlt className="absolute left-3 top-3.5 text-gray-400" />
            <input
  type="file"
  name="Url"
  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
  onChange={handleChange}
  accept="image/*"
/>
            </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
            onClick={()=>dispatch(registerUser(formData))} // Dispatch the registerUser action with formData
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account? <a href="/login" className="text-indigo-600 hover:underline">Login here</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
