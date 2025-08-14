import axios from "axios";

const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "user_profiles_unsigned"); 
  formData.append("folder", "user_profiles"); 

  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );
    return res.data.secure_url; // The uploaded image URL
  } catch (err) {
    console.error("Cloudinary Upload Error:", err);
    return null;
  }
};

export default uploadToCloudinary;