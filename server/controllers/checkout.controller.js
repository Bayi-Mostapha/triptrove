import Wallet from '../models/wallet.model.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.MostaphaStripe);

export const hasAccount = async (req, res) => {
    try {
        const { userId } = req;
        const wallet = await Wallet.findOne({ host: userId });
        if (!wallet || !wallet.stripeAccountId) {
            return res.json(false);
        }
        return res.json(true);
    } catch (error) {
        console.error('Error checking account:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const createStripeAccountLink = async (req, res) => {
    const { userId } = req;
    try {
        const account = await stripe.accounts.create({
            type: 'express',
            country: 'US',
            capabilities: {
                card_payments: { requested: true },
                transfers: { requested: true },
            },
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

        if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({ message: 'Invalid amount' });
        }

        let hostWallet = await Wallet.findOne({ host: hostId });
        if (!hostWallet || hostWallet.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        if (!hostWallet.stripeAccountId) {
            return res.status(400).json({ message: 'Host does not have a connected Stripe account' });
        }

        const payout = await stripe.transfers.create({
            amount: Math.round(amount * 100),
            currency: 'mad',
            destination: hostWallet.stripeAccountId,
        });

        hostWallet.balance -= amount;
        await hostWallet.save();

        res.status(200).json({ message: 'Payout successful', payout });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred during the payout process', error: error.message });
    }
};