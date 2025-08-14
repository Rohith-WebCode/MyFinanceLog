import React, { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import api from '../utils/axios'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice';
import imageCompression from "browser-image-compression";
import uploadToCloudinary from '../cloudinary/uploadToCloudinary';

const SignupAndLogin = () => {
  const [login, setLogin] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [compressedImage, setCompressedImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: null,
  });

 const handleChange  =async (e)=>{
 if (e.target.name === "image") {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
  toast.error("Please select a valid image file.");
  return;
}
    if (file) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };
      try {
        const compressed = await imageCompression(file, options);
        const imageUrl = await uploadToCloudinary(compressed);
        
        setCompressedImage(imageUrl);
        // setFormData({ ...formData, image: compressed });
        setSelectedImage(URL.createObjectURL(compressed))
      } catch (error) {
        console.error("Image compression failed:", error);
      }
    }
  } else {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
 }

 const handleSubmit = async(e)=>{
  e.preventDefault();
  try {
    
if (!login) {
  try {
    const res = await api.post("/api/auth/signup", {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      profilePic: compressedImage // Cloudinary URL
    });

    if (res.data.success) {
      toast.success(res.data.message || "Signup successful!");
      setLogin(true);
    } else {
      toast.error(res.data.message || "Something went wrong!");
    }
  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.message || "Something went wrong!");
  }
}

else{
    const loginData = {
        email: formData.email,
        password: formData.password,
      };

      const res = await api.post('/api/auth/login',loginData)
        if(res.data.success) {
        // localStorage.setItem("token", res.data.token);
        dispatch(loginSuccess({user:res.data.user}))
        toast.success(res.data.message || "Login successful!");
         navigate("/");
          }else{
            toast.error(res.data.message || "Login failed!");
          }  
    }
  } catch (error) {
    console.log(error);
     toast.error(error.response?.data?.message || "Something went wrong!");
    
  }

 }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-l from-blue-300 ">
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 p-10 lg:p-20 gap-8">
        
        {/* Left side */}
        <div className="flex flex-col justify-center text-center md:text-left">
          <p className="text-2xl md:text-3xl font-bold mb-4">
            Smart Finance, Made Simple
          </p>
          <p className="text-sm md:text-lg text-gray-700">
            Track, plan, and grow — we help you make every dollar count.
          </p>
        </div>

        {/* Right side */}
        <div className="flex flex-col justify-center">
          <div className="bg-[#eef0fc] p-8 md:p-12 rounded-3xl shadow-lg">
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              {login ? "Login" : "Sign Up"}
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              {login ? "Welcome back" : "Start your journey"}
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
   
              {!login && (
                <div className="flex justify-center mb-4">
                  <label
                    htmlFor="file-upload"
                    className="relative flex items-center justify-center w-20 h-20 bg-gray-300 text-white rounded-full cursor-pointer hover:bg-blue-500 transition"
                  >

                  {selectedImage ? (
                      <img
                    src={selectedImage}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-full"
                  />
                  ):
                    <PersonIcon style={{ fontSize: 60 }} />
                  }

                    <span className="absolute bottom-0 right-0">
                      <AddCircleIcon style={{ fontSize: 30, color: "blue" }} />
                    </span>
                  </label>
                  <input id="file-upload" onChange={handleChange} type="file" name='image' className="hidden" />
                </div>
              )}

              {!login && (
                <div>
                  <label className="block text-base mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={formData.name} 
                    className="w-full border border-gray-400 rounded-lg h-10 p-3"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-base mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email} 
                   onChange={handleChange}
                  className="w-full border border-gray-400 rounded-lg h-10 p-3"
                  required
                />
              </div>

              <div>
                <label className="block text-base mb-1">Password</label>
                <input
                  type="password"
                   name="password"
                   onChange={handleChange}
                    value={formData.password} 
                  className="w-full border border-gray-400 rounded-lg h-10 p-3"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-800 rounded-lg py-3 w-full text-white font-semibold transition"
              >
                {login ? "Login" : "Sign Up"}
              </button>
            </form>

            {/* Toggle text */}
            <p className="mt-4 text-sm text-gray-600 text-center">
              {login ? "Don’t have an account? " : "Already have an account? "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setLogin(!login);
                }}
                className="text-blue-600 hover:underline font-medium"
              >
                {login ? "Sign up" : "Log in"}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupAndLogin;
