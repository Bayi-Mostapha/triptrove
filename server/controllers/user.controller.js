import dotenv from 'dotenv';
dotenv.config();
import User from "../models/user.model.js";


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
