import dotenv from 'dotenv';
dotenv.config();
import Admin from "../models/admin.model.js";
import bcryptjs from "bcryptjs"; 
import jwt from "jsonwebtoken";
import { getSocket } from '../services/socket.js';
import Notification from "../models/notification.model.js"
import Subscription from "../models/subscription.model.js"
import ProblemReport from "../models/problem.model.js"
import PropertyReport from "../models/property_report.model.js"
import ReviewReport from "../models/review_report.model.js"
import Property from "../models/property.model.js"
import User from "../models/user.model.js"
import Booking from "../models/booking.model.js"
import Fee from "../models/fee.model.js"


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
export const getDashboard = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find().select('price createdAt');
    const feesRev = await Fee.find().select('price createdAt');
    const tickets = await ProblemReport.find().select('createdAt');
    const reportsProp = await PropertyReport.find().select('createdAt');
    const subsData = await Subscription.find()
  .sort({ _id: -1 })  // Sort by _id in descending order to get the most recent entries
  .limit(4)  
  .populate('userId');  
    const reportsReview = await ReviewReport.find().select('createdAt');
    const reservations = await Booking.aggregate([
      {
        $project: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          status: 1
        }
      },
      {
        $group: {
          _id: "$date",
          confirmed: {
            $sum: {
              $cond: [{ $eq: ["$status", "paid"] }, 1, 0]
            }
          },
          cancelled: {
            $sum: {
              $cond: [{ $eq: ["$status", "canceled"] }, 1, 0]
            }
          }
        }
      },
      {
        $sort: { _id: 1 } // Sort by date
      },{
        $project: {
          _id: 0,
          name: "$_id",
          confirmed: 1,
          cancelled: 1
        }
      }
    ]);

    const subscriptions1 = await Subscription.aggregate([
      {
        $project: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          price: 1
        }
      },
      {
        $group: {
          _id: "$date",
          totalSubscription: { $sum: "$price" }
        }
      }
    ]);
    
    const fees = await Fee.aggregate([
      {
        $project: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          price: 1
        }
      },
      {
        $group: {
          _id: "$date",
          totalFees: { $sum: "$price" }
        }
      }
    ]);
    
    // Merge the results
    const mergedResults = [...subscriptions1, ...fees].reduce((acc, item) => {
      const name = item._id;
      if (!acc[name]) {
        acc[name] = { name, totalSubscription: 0, totalFees: 0 , total: 0};
      }
      if (item.totalSubscription !== undefined) {
        acc[name].totalSubscription = item.totalSubscription;
      }
      if (item.totalFees !== undefined) {
        acc[name].totalFees = item.totalFees;
      }
      
      acc[name].total = acc[name].totalSubscription + acc[name].totalFees; 
      
      return acc;
    }, {});
    
    const finalResults = Object.values(mergedResults).sort((a, b) => new Date(a.name) - new Date(b.name));
    
    
    const properties = await Property.find().select('createdAt');
    let users = await User.find({}, { password: 0 }).select('firstName lastName email role createdAt image');

    const formatDate = (date) => date ? date.toISOString().split('T')[0].replace(/-/g, '/') : 'N/A';

    const formattedSubscriptions = subscriptions.map(subscription => ({
      ...subscription.toObject(),
      createdAt: formatDate(subscription.createdAt),
    }));

    const formattedTickets = tickets.map(ticket => ({
      ...ticket.toObject(),
      createdAt: formatDate(ticket.createdAt),
    }));

    const formattedReportsProp = reportsProp.map(report => ({
      ...report.toObject(),
      createdAt: formatDate(report.createdAt),
    }));

    const formattedReportsReview = reportsReview.map(report => ({
      ...report.toObject(),
      createdAt: formatDate(report.createdAt),
    }));

    const formattedProperties = properties.map(property => ({
      ...property.toObject(),
      createdAt: formatDate(property.createdAt),
    }));

    const formattedUsers = users.map(user => ({
      ...user.toObject(),
      createdAt: formatDate(user.createdAt),
    }));

    const formattedFeesRev = feesRev.map(user => ({
      ...user.toObject(),
      createdAt: formatDate(user.createdAt),
    }));

    const formattedSubsData = subsData.map(user => ({
      ...user.toObject(),
      createdAt: formatDate(user.createdAt),
    }));

    

    res.status(200).json({
      subscriptions: formattedSubscriptions,
      tickets: formattedTickets,
      reportsProp: formattedReportsProp,
      reportsReview: formattedReportsReview,
      properties: formattedProperties,
      users: formattedUsers,
      reservations: reservations,
      revenue: finalResults ,
      feesRev: formattedFeesRev,
      subs:formattedSubsData,
    });
  } catch (error) {
    console.error('Error getting dashboard data:', error);
    res.status(500).json({ message: 'Error getting dashboard data' });
  }
};