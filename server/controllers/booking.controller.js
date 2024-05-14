import Booking from "../models/booking.model.js";
import Property from "../models/property.model.js";
import Stripe from "stripe";

// export const getBookings = async (req, res) => {
//     try {
//         const { userId } = req;

//         const bookings = await Booking.find({ guest: userId });
//         if (!bookings) {
//             return res.status(404).json({ message: 'No bookings found for this user' });
//         }

//         const bookingsWithProperties = await Promise.all(
//             bookings.map(async booking => {
//                 const property = await Property.findById(booking.property);
//                 return { ...booking.toObject(), property };
//             })
//         );

//         res.json(bookingsWithProperties);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

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

        const stripe = new Stripe(process.env.MostaphaStripe);
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [{
                price_data: {
                    currency: 'mad',
                    product_data: {
                        name: property.title
                    },
                    unit_amount: property.price * 100
                },
                quantity: nights
            }],
            success_url: `http://localhost:5173/booking-success?pid=${pid}&checkIn=${checkIn}&checkOut=${checkOut}&totalPrice=${property.price * nights}`,
            cancel_url: 'http://localhost:5173/booking-fail',
        })
        res.json({ url: session.url })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const createBooking = async (req, res) => {
    try {
        const { pid } = req.params;
        const { checkIn, checkOut, totalPrice } = req.body;
        const guest = req.userId;

        const booking = await Booking.create({
            guest,
            property: pid,
            checkIn: new Date(checkIn),
            checkOut: new Date(checkOut),
            totalPrice: totalPrice,
        });

        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};