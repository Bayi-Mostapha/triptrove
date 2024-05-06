import dotenv from 'dotenv';
dotenv.config();
import User from "../models/user.model.js";
import Subscription from '../models/subscription.model.js';
import SubscriptionPlan from '../models/subscriptionPlans.model.js';

import Stripe from 'stripe'

export const createSubscription = async (req, res, next) => {
    const priceId = req.body.priceId;
    const stripe = new Stripe(process.env.STRIPE_SECRET);

   
    try {
        // Check if the user already has an active subscription
        const existingSubscription = await Subscription.findOne({ userId: req.userId });
        if (existingSubscription) {
            return res.status(400).json({ error: 'User already has an active subscription' });
        }

        // Create a customer in Stripe
        const customer = await stripe.customers.create({
          name: req.body.name,
          email: req.body.email,
          payment_method: req.body.paymentMethod,
          invoice_settings: {
            default_payment_method: req.body.paymentMethod,
          },
        });
        const isValidCard = await stripe.paymentMethods.retrieve(req.body.paymentMethod);
        if (!isValidCard) {
            return res.status(400).json({ error: 'Invalid card information. Please provide a valid card.' });
        }
        // Create a subscription in Stripe
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
    
        // Save subscription details in your database
        const expirationDate = new Date();
        expirationDate.setMonth(expirationDate.getMonth() + 1);
        const newSubscription = await Subscription.create({
            userId: req.userId, // assuming you have access to the logged-in user's ID
            subscriptionId: subscription.id,
            customerId: customer.id,
            expirationDate: expirationDate, 
        });

        // Optionally, update the user's subscriptionType in the User collection
        const subscriptionPlan = await SubscriptionPlan.findOne({ priceId });

        // Update user's subscription type based on subscription plan title
        await User.findByIdAndUpdate(req.userId, { subscriptionType: subscriptionPlan.title });

        // Send response with subscription details
        res.status(200).json({
            clientSecret: subscription.latest_invoice.payment_intent.client_secret,
            subscriptionId: subscription.id
        });
    } catch (error) {
        if (error.raw && error.raw.code === 'card_declined') {
            // Handle card declined error
            return res.status(400).json({ error: 'Card declined. Please check your card details and try again.' });
        } else {
            console.error('Error creating subscription:', error);
            return res.status(500).json({ error: error.message || 'Failed to create subscription' });
        }
    } 
}; 
