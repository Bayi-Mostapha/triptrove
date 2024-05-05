import dotenv from 'dotenv';
dotenv.config();
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
  

export const signup = async (request, response, next) => {
    const { firstName, lastName, email, password } = request.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
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