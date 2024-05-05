import dotenv from 'dotenv';
dotenv.config(); 
import express, { response } from "express";
import mongoose from "mongoose";   
import cors from "cors";
import  authRoutes  from "./routes/auth.route.js"
import { verifyToken } from "./controllers/verifytoken.js";
import  User  from "./models/user.model.js"

const app = express(); 
app.use(express.json()); 
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
     allowedHeaders: ['content-type', 'Authorization'], 
    credentials: true, 
 }));  

mongoose.connect(process.env.MONGODB_URL).then(() => {    
    console.log('connected to database successfully');
    app.listen(process.env.PORT, () => {
        console.log(`server is running on the port ${process.env.PORT}`);
      }); 
}).catch((error) => { 
    console.log(`something went wrong while connecting to databse : ${error}`);
});    
  
app.use("/auth", authRoutes);
app.get("/get/user", verifyToken, async (req, res) => {
  try {
    // Fetch user data based on user ID extracted from token
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});