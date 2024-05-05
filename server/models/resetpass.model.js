import mongoose from "mongoose";

const resetPassSchema = mongoose.Schema(
    {
        email: {
            type: String ,
            required: true,
            unique: true,
        },
        code: {
            type: String ,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

 const ResetPass = mongoose.model('ResetPass', resetPassSchema);
 
export default ResetPass;