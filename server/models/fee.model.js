import mongoose from "mongoose";

const feeSchema = mongoose.Schema(
    {
        amount: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Fee = mongoose.model('Fee', feeSchema);

export default Fee;