import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subscriptionId: { type: String, required: true }, // The ID of the subscription in Stripe
    customerId: { type: String, required: true }, 
    subscriptionItemId: { type: String, required: true },
    expirationDate: { type: Date, required: true },
    price: { type: Number, required: true }, 
    },
    {
      timestamps: true,
    }
  );
  

  const Subscription = mongoose.model('Subscription', subscriptionSchema);
 
  export default Subscription;