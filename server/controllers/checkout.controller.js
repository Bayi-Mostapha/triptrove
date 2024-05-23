import Wallet from '../models/wallet.model.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); 

export const createStripeAccountLink = async (req, res) => {
    const { userId } = req;

    try {
        // Create a new Stripe account for the user
        const account = await stripe.accounts.create({
            type: 'express',
        });

        let wallet = await Wallet.findOne({ host: userId });
        if (!wallet) {
            wallet = new Wallet({
                host: userId,
                balance: 0,
                stripeAccountId: account.id,
            });
            await wallet.save();
        } else {
            wallet.stripeAccountId = account.id;
            await wallet.save();
        }

        const accountLink = await stripe.accountLinks.create({
            account: account.id,
            refresh_url: `${process.env.FRONTEND_URL}/reauth`, 
            return_url: `${process.env.FRONTEND_URL}/success`,
            type: 'account_onboarding',
        });

        res.status(200).json({ url: accountLink.url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create account link' });
    }
};

export const checkoutWallet = async (req, res) => {
    try {
        const { amount } = req.body;
        const hostId = req.userId;

        let hostWallet = await Wallet.findOne({ host: hostId });
        if (!hostWallet || hostWallet.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        if (!hostWallet.stripeAccountId) {
            return res.status(400).json({ message: 'Host does not have a connected Stripe account' });
        }

        const payout = await stripe.transfers.create({
            amount: amount * 100,
            currency: 'mad',
            destination: hostWallet.stripeAccountId,
        });

        hostWallet.balance -= amount;
        await hostWallet.save();

        res.status(200).json({ message: 'Payout successful', payout });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};