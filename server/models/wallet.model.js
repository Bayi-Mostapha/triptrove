import mongoose from "mongoose";

const walletSchema = new mongoose.Schema(
    {
        host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
        balance: { type: Number, default: 0 },
        stripeAccountId: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

const Wallet = mongoose.model('Wallet', walletSchema);

export default Wallet