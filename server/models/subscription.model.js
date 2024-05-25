import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subscriptionId: { type: String, required: true }, // The ID of the subscription in Stripe
    customerId: { type: String, required: true }, 
    subscriptionItemId: { type: String, required: true },// The ID of the customer in Stripe
    expirationDate: { type: Date, required: true },
    // Other subscription-related fields...
  });
  

  const Subscription = mongoose.model('Subscription', subscriptionSchema);
 
  export default Subscription;