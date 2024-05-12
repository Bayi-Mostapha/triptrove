import mongoose from "mongoose";

const adminSchema = mongoose.Schema(
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
            required: true,
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
        role: { type: String, enum: ['admin', 'superAdmin'], default: 'admin' },
    },
    {
        timestamps: true,
    }
);

 const Admin = mongoose.model('Admin', adminSchema);
 
export default Admin;