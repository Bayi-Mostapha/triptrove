import dotenv from 'dotenv';
dotenv.config(); 
import express, { response } from "express";
import mongoose from "mongoose";   
import cors from "cors";
import  authRoutes  from "./routes/auth.route.js"
import  userRoutes  from "./routes/user.route.js"
import paymentRoutes from "./routes/payment.route.js"
import adminRoutes from "./routes/admin.route.js"

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
app.use("/user", userRoutes);  
app.use('/payment', paymentRoutes);
app.use('/admin', adminRoutes);
