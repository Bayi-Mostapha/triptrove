import dotenv from 'dotenv';
dotenv.config(); 
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});
export const uploadToCloudinary = async (path, folder = "my-profile") => {
  try {
    const data = await cloudinary.uploader.upload(path, { folder: folder });
    console.log("Image upoaded to Cloudinary:", data);
    return { url: data.secure_url, publicId: data.public_id };
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const deleteFromCloudinary = async (publicId) => {
  try {
    // Use the destroy method to delete the image based on its public ID
    const result = await cloudinary.uploader.destroy(publicId);
    console.log("Image deleted from Cloudinary:", result);
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    throw error;
  }
};