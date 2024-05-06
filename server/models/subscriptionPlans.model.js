import mongoose from "mongoose";

const subscriptionPlanSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
          },
          price: {
            type: Number,
            required: true
          },
        }
);

 const SubscriptionPlan = mongoose.model('SubscriptionPlan', subscriptionPlanSchema);
 
export default SubscriptionPlan;