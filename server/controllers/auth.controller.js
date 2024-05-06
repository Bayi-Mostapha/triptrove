import dotenv from 'dotenv';
dotenv.config();
import User from "../models/user.model.js";
import ResetPass from "../models/resetpass.model.js"
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const signup = async (request, response, next) => {
    const { firstName, lastName, email, password } = request.body;
    const user = await User.findOne({ email });
     
      if (user){
        return response.status(401).json({ message: "email already exist" });
      }
      
    0
    const NewUser = User({firstName,lastName,email,password: hashedPassword});
    try {
        await NewUser.save();
        response.status(201).json({message: "user created succezsfully"});
    } catch (error) {
        next(error);
    }     
}; 

export const signin = async (request, response, next) => {
    const { email, password } = request.body;
    try{
      const user = await User.findOne({ email });
     
      if (!user) {
        return response.status(401).json({ message: "Incorrect credentials" });
      }
      
      const isPasswordCorrect = await bcryptjs.compare(password, user.password);
  
      if (!isPasswordCorrect) {
        return response.status(401).json({ message: "Incorrect credentials" });
      }
      
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      response.status(200).json({ message: "User is logged in", user,token });
    } catch (error) {
        console.error("Error:", error.message);
        return response.status(500).json({ message: "Internal server error" });
    }
  };
 
  export const googleAuth = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password: hashedPassword, ...rest } = user._doc;
        res.status(200).json({ message: "User is logged in", rest,token });
      } else {
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        const newUser = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hashedPassword,
        });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        const { password: hashedPassword2, ...rest } = newUser._doc;
        res.status(200).json({ message: "User is logged in", rest,token });
      }
    } catch (error) {
      next(error);
    }
  };
  export const generateCode = async (req, res, next) => {
      try {
        const { email } = req.body;
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid email" });
        }
        await ResetPass.deleteMany({ email });
        const code = Math.floor(100000 + Math.random() * 900000);
        const Newpass = ResetPass({ email, code });
        await Newpass.save();

      console.log(code)
        // let transporter = nodemailer.createTransport({
        //   service: "gmail", 
        //   host: "smtp.gmail.com", 
        //   auth: {
        //     user: "redaredael2004@gmail.com", 
        //     pass: "", 
        //   },
        // });
        
        // await transporter.sendMail({
        //   from: "redaredael2004@gmail.com", // you email
        //   to: email, // to email
        //   subject: "reset password",
        //   text:  `Your password reset code is: ${code}`,
        //   html: "hey good",
        // });
        res.status(200).json({ message: "Password reset code sent successfully" });
    } catch (error) {
        next(error);
    }       
  };

  export const verifyResetCode = async (req, res, next) => {
    try {
      const { email, code } = req.body;
      const user = await ResetPass.findOne({ email: email });
      if (user && user.code === code) {
        res.status(200).json({ message: "Password reset code is correct "});
      } else {
        res.status(404).json({ message: "Password reset code is incorrect "});
      }
    } catch (error) {
      console.error('Error verifying reset code:', error);
      return false;
    }
  };
  
  export const resetPassword = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const hashedPassword = bcryptjs.hashSync(password, 10);
      await User.updateOne({ email: email }, { password: hashedPassword});
      await ResetPass.deleteMany({ email });
      res.status(200).json({ message: "Password reset code is correct "});
    } catch (error) {
      console.error('Error resetting password:', error);
      return false; 
    }
  };
  
