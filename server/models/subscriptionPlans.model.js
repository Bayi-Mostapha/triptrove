import mongoose from "mongoose";

const subscriptionPlanSchema = mongoose.Schema(
    {
      title: { type: String, enum: ['free', 'premium', 'business'], unique: true },
      price: { type: Number, required: true },
      priceId: { type: String, required: true },
    }
);

 const SubscriptionPlan = mongoose.model('SubscriptionPlan', subscriptionPlanSchema);
 
export default SubscriptionPlan;