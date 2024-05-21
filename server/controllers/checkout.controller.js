// import Wallet from '../models/wallet.model.js';

// const Wallet = require('../models/Wallet');

// export async function createWallet(req, res) {
//     const { userId } = req
//     const { stripeAccountId } = req.body;

//     try {
//         const wallet = await Wallet.create({
//             host: userId,
//             balance: 0,
//             stripeId: stripeAccountId,
//         });

//         return res.status(201).json(wallet);
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'Failed to create wallet' });
//     }
// }

// export const checkoutWallet = async (req, res) => {
//     try {
//         const { amount } = req.body;
//         const hostId = req.userId;

//         const hostWallet = await Wallet.findOne({ host: hostId });
//         if (!hostWallet || hostWallet.balance < amount) {
//             return res.status(400).json({ message: 'Insufficient balance' });
//         }

//         const host = await User.findById(hostId);
//         if (!host.stripeAccountId) {
//             return res.status(400).json({ message: 'Host does not have a connected Stripe account' });
//         }

//         const payout = await stripe.transfers.create({
//             amount: amount,
//             currency: 'mad',
//             destination: host.stripeAccountId,
//         });

//         hostWallet.balance -= amount;
//         await hostWallet.save();

//         res.status(200).json({ message: 'Payout successful', payout });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

import querystring from 'querystring';
import Stripe from 'stripe';
import Wallet from '../models/wallet.model.js';

const stripe = new Stripe(process.env.MostaphaStripe);

export async function initiateConnection(req, res) {
    const state = 'some_random_string';
    const params = {
        client_id: 'acct_1PGLIdP62uniVTox',
        state: state,
        response_type: 'code',
        scope: 'read_write',
        redirect_uri: `${process.env.FRONTEND_URL}/stripe/callback`,
    };
    const url = `https://connect.stripe.com/oauth/authorize?${querystring.stringify(params)}`;
    res.json({ url });
}

export async function connectStripe(req, res) {
    const { code, state } = req.query;

    try {
        const response = await stripe.oauth.token({
            grant_type: 'authorization_code',
            code: code,
        });

        const stripeAccountId = response.stripe_user_id;

        const { userId } = req;

        let wallet = await Wallet.findOne({ host: userId });
        if (!wallet) {
            wallet = await Wallet.create({
                host: userId,
                stripeId: stripeAccountId,
            });
        }

        await wallet.save();

        res.json({ message: 'success' });
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred');
    }
}

export const transferFunds = async (hostStripeAccountId, amount) => {
    await stripe.transfers.create({
        amount: amount,
        currency: 'mad',
        destination: hostStripeAccountId,
    });
};