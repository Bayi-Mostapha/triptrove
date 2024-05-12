import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        fullName: {
            type: String ,
            required: true,
        },
        firstName: {
            type: String ,
            required: true,
        },
        lastName: {
            type: String ,
        }, 
        email: {
            type: String ,
            required: true,
            unique: true,
        },
        password: {
            type: String ,
            required: true,
        },
        subscriptionType: { type: String, enum: ['free', 'premium', 'business'], default: 'free' },
        role: { type: String, enum: ['host', 'guest'], default: 'guest' },
        image:{
            publicId:{
                type: String,
            },
            url: {
                type: String,
            }
        },
    },
    {
        timestamps: true,
    }
);

 const User = mongoose.model('User', userSchema);
 
export default User;