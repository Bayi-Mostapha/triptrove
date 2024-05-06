import mongoose from "mongoose";

const subscriptionSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        planId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SubscriptionPlan'
        },
        startDate: Date,
        endDate: Date,
    }
);

 const Subscription = mongoose.model('Subscription', subscriptionSchema);
 
export default Subscription;