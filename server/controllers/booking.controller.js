import mongoose from "mongoose";
import Booking from "../models/booking.model.js";
import Property from "../models/property.model.js";
import User from "../models/user.model.js";
import Wallet from "../models/wallet.model.js";
import Stripe from "stripe";
import Fee from "../models/fee.model.js";

export const getHostBookings = async (req, res) => {
    const userId = req.userId;
    try {
        const properties = await Property.find({ owner: userId }).select('_id');
        const propertyIds = properties.map(property => property._id);
        const bookings = await Booking.find({ property: { $in: propertyIds } })
            .populate([
                { path: 'guest', select: 'fullName email image' },
                { path: 'property', select: 'title' }
            ]);
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getBookings = async (req, res) => {
    try {
        const { userId } = req;
        const bookings = await Booking
            .find({ guest: userId, status: 'paid' })
            .populate('property', '_id title photos');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}

export const cancelBooking = async (req, res) => {
    try {
        const { id } = req.params;

        const booking = await Booking.findByIdAndUpdate(
            id,
            { status: 'canceled' },
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


function calculateNights(checkInDate, checkOutDate) {
    const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
    const firstDate = new Date(checkInDate);
    const secondDate = new Date(checkOutDate);
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    return diffDays;
}
export const createBookingSession = async (req, res) => {
    try {
        const { pid } = req.params;
        const { checkIn, checkOut } = req.body;
        const existingBookings = await Booking.find({
            property: pid,
            $or: [
                { checkIn: { $lt: new Date(checkOut) }, checkOut: { $gt: new Date(checkIn) } },
                { checkIn: new Date(checkIn) },
                { checkOut: new Date(checkOut) },
            ],
        });
        if (existingBookings.length > 0) {
            return res.status(400).json({ message: 'Property is already reserved for the selected dates' });
        }

        const nights = calculateNights(checkIn, checkOut);
        const property = await Property.findOne({ _id: pid });

        const totalAmount = (property.price * nights) + property.cleaningFees;

        const stripe = new Stripe(process.env.STRIPE_SECRET);
        const frontend = process.env.FRONTEND_URL || 'http://localhost:5173'
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [{
                price_data: {
                    currency: 'mad',
                    product_data: {
                        name: property.title
                    },
                    unit_amount: totalAmount * 100
                },
                quantity: 1
            }],
            success_url: frontend + `/booking-success?pid=${pid}&checkIn=${checkIn}&checkOut=${checkOut}&totalPrice=${totalAmount}`,
            cancel_url: frontend + '/booking-fail',
        })
        res.json({ url: session.url })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const createBooking = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { pid } = req.params;
        const { checkIn, checkOut, totalPrice } = req.body;
        const guest = req.userId;

        if (!checkIn || !checkOut || !totalPrice) {
            throw new Error('Missing required fields');
        }

        const booking = await Booking.create([{
            guest,
            property: pid,
            checkIn: new Date(parseInt(checkIn)),
            checkOut: new Date(parseInt(checkOut)),
            totalPrice: totalPrice,
        }], { session });

        const property = await Property.findById(pid).populate('owner').session(session);
        if (!property) {
            throw new Error('Property not found');
        }

        const hostId = property.owner._id;
        const host = await User.findById(hostId).session(session);
        if (!host) {
            throw new Error('Host not found');
        }

        const hostWallet = await Wallet.findOne({ host: hostId }).session(session);

        const getHostEarnings = (subscriptionType) => {
            switch (subscriptionType) {
                case 'premium':
                    return totalPrice * 0.95;
                case 'business':
                    return totalPrice;
                case 'free':
                default:
                    return totalPrice * 0.90;
            }
        };
        const hostEarnings = getHostEarnings(host.subscriptionType);
        if (hostWallet) {
            hostWallet.balance += hostEarnings;
            await hostWallet.save({ session });
        } else {
            await Wallet.create([{
                host: hostId,
                balance: hostEarnings,
            }], { session });
        }

        const getOurEarnings = (subscriptionType) => {
            switch (subscriptionType) {
                case 'premium':
                    return totalPrice * 0.05;
                case 'business':
                    return 0;
                case 'free':
                default:
                    return totalPrice * 0.10;
            }
        };
        const ourEarnings = getOurEarnings(host.subscriptionType);
        await Fee.create([{ price: ourEarnings }], { session: session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json(booking[0]);
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(400).json({ message: error.message });
    }
};