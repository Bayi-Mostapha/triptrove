import dotenv from 'dotenv';
dotenv.config();
import User from "../models/user.model.js";
import Stripe from 'stripe'

export const createSubscription = async (req, res, next) => {
    const priceId = req.body.priceId;
    const stripe = new Stripe(process.env.STRIPE_SECRET);
    try {
        const customer = await stripe.customers.create({
          name: req.body.name,
          email: req.body.email,
          payment_method: req.body.paymentMethod,
          invoice_settings: {
            default_payment_method: req.body.paymentMethod,
          },
        });
        const subscription = await stripe.subscriptions.create({
          customer: customer.id,
          items: [{ price: priceId }], 
          payment_settings: {
            payment_method_options: {
              card: {
                request_three_d_secure: 'any',
              },
            },
            payment_method_types: ['card'],
            save_default_payment_method: 'on_subscription',
          },
          expand: ['latest_invoice.payment_intent'],
        });
    
        res.json({
            clientSecret: subscription.latest_invoice.payment_intent.client_secret,
            subscriptionId: subscription.id,
          });
      } catch (error) {
        console.error('Error creating subscription:', error);
        res.status(500).json({ error: error.message || 'Failed to create subscription' });
      } 
}; 
