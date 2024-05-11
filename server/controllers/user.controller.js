import dotenv from 'dotenv';
dotenv.config();
import User from "../models/user.model.js";                 
import { uploadToCloudinary, deleteFromCloudinary } from "../services/cloudinary.js"
import bcryptjs from "bcryptjs"; 

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
      } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ message: "Internal server error" });
      }   
}; 
export const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0 }).select('firstName lastName email role createdAt image');
    res.status(200).json(users.map(user => ({
        ...user.toObject(),
        createdAt: user.createdAt.toISOString().split('T')[0].replace(/-/g, '/'), // Format join date
    })));
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 

export const uploadProfileImage = async (req, res, next) => {
    try {
      const userId = req.userId;
      const image = req.file;

      const currentUser = await User.findById(userId);
      if (currentUser.image.publicId) {  
        await deleteFromCloudinary(currentUser.image.publicId);
      }

      let imageData = {}
      if(image){
        const results = await uploadToCloudinary(image.path, "my-profile")
        imageData = results
      }
      const user = await User.findByIdAndUpdate(userId, { image: imageData }, { new: true });
        res.status(200).json({ message: "profile updated" });
      } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ message: "Internal server error" });
      }   
}; 
export const updateUserData = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { firstName, email } = req.body;

    if (!firstName || !email) {
      return res.status(400).json({ message: "First name and email are required." });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, { firstName, email }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({ message: "User data updated successfully.", user: updatedUser });
  } catch (error) {
    console.error("Error updating user data:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
export const updateUserPassword = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { oldPass, newPass } = req.body;
    if (!oldPass || !newPass ) {
      return res.status(400).json({ message: "all feilds are required." });
    }

    const updatedUser = await User.findById(userId);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    const isPasswordCorrect = await bcryptjs.compare(oldPass, updatedUser.password);
    if (!isPasswordCorrect){
      return response.status(401).json({ message: "Incorrect credentials" });
    }
    
    const hashedPassword = bcryptjs.hashSync(newPass, 10);

    // Update the user's password with the new hashed password
    updatedUser.password = hashedPassword;
    await updatedUser.save();

    return res.status(200).json({ message: "User password updated successfully."});
  } catch (error) {
    console.error("Error updating user data:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
