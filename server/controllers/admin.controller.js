import dotenv from 'dotenv';
dotenv.config();
import Admin from "../models/admin.model.js";
import bcryptjs from "bcryptjs"; 
import jwt from "jsonwebtoken";
import { getSocket } from '../services/socket.js';
import Notification from "../models/notification.model.js"

export const signin = async (request, response, next) => {
  const { email, password } = request.body;
  try{
    const user = await Admin.findOne({ email });
    
    if (!user) {
      return response.status(401).json({ message: "Incorrect credentials" });
    }
    
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!isPasswordCorrect) {
      return response.status(401).json({ message: "Incorrect credentials" });
    }
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    response.status(200).json({ message: "admin is logged in", user,token });
  } catch (error) {
      console.error("Error:", error.message);
      return response.status(500).json({ message: "Internal server error" });
  }
};

export const getAdmin = async (req, res, next) => {
  try {
    const user = await Admin.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching admin data:", error);
    res.status(500).json({ message: "Internal server error" });
  }   
}; 

export const getAll = async (req, res, next) => {
  try {
    const admins = await Admin.find({ _id: { $ne: req.userId } }).select('-password');

    res.status(200).json(admins.map(user => ({
      ...user.toObject(),
      createdAt: user.createdAt.toISOString().split('T')[0].replace(/-/g, '/'),
    })));
  } catch (error) {
    console.error("Error fetching admins :", error);
    res.status(500).json({ message: "Internal server error" });
  }   
}; 

export const createAdmin = async (req, res, next) => {
  if (req.role !== "superAdmin") {
    return res.status(402).json({ message: "Admin doesn't have permission to create other admins" });
  }
  const { firstName, lastName, email, password, role } = req.body;
  const user = await Admin.findOne({ email });
    
    if (user){
      return res.status(409).json({ message: "email already exist" });
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const fullName = firstName + " " + lastName;
    const NewUser = Admin({fullName,firstName,lastName,email,password: hashedPassword,role});
  try {
      await NewUser.save();
      res.status(201).json({message: "admin created successfully"});
  } catch (error) {
      next(error);
  }   
}; 

export const deleteAdmin = async (req, res, next) => {
  const { adminIds } = req.body; 
  try {
    for (const adminId of adminIds) {
        await Admin.findByIdAndDelete(adminId);
    }

    res.status(200).json({ message: 'Admins deleted successfully' });
  } catch (error) {
      console.error('Error deleting admins:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
}; 

export const changeAdminRole = async (req, res, next) => {
  const { id } = req.body; 
  const adminId = req.userId;

  try {
    const admin =    await Admin.findById(adminId);
    const user =    await Admin.findById(id);
    if(user.role === "admin"){
      user.role = "superAdmin";
    }else{
      user.role = "admin";
    }
    user.save();
    // start notification
    const notification = new Notification({
      user_id: user._id,
      message: `${admin.fullName} changed your role to ${user.role}`,
      link: null
    });
    await notification.save();

    const io = getSocket();
    io.to(user._id.toString()).emit('notification', {
      message: notification,
    });
    // end notification
    res.status(200).json({ message: 'admin role updated successfulyy' });
  } catch (error) {
      console.error('Error updating admin role', error);
      res.status(500).json({ message: 'Internal server error' });
  }
}; 

export const updateAdmin = async (req, res, next) => {
  const {
       firstName,
       lastName,
       email,
       currentPassword,
       newPassword
     } = req.body; 
  try {
    const updatedAdmin = await Admin.findById(req.userId);
    if (!updatedAdmin) {
      return res.status(404).json({ message: "admin not found." });
    }

    const isPasswordCorrect = await bcryptjs.compare(currentPassword, updatedAdmin.password);
    if (!isPasswordCorrect){
      return response.status(401).json({ message: "Incorrect credentials" });
    }
    
    const hashedPassword = bcryptjs.hashSync(newPassword, 10);

    updatedAdmin.password = hashedPassword;
    if(firstName !== ""){
      updatedAdmin.firstName = firstName;
    }
    if(lastName !== ""){
      updatedAdmin.lastName = lastName;
    }
    if(email !== ""){
      updatedAdmin.email = email;
    }
    await updatedAdmin.save();
    res.status(200).json({ message: 'admin data updated successfulyy' });
  } catch (error) {
      console.error('Error updating admin data', error);
      res.status(500).json({ message: 'Internal server error' });
  }
}; 
