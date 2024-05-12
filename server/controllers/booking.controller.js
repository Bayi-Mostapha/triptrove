import Booking from "../models/booking.model.js";
// import Property from "../models/property.model.js";

// export const getBookings = async (req, res) => {
//     try {
//         const { userId } = req.body;

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

export const createBooking = async (req, res) => {
    try {
        const { pid } = req.params;
        const { checkIn, checkOut, totalPrice, guest } = req.body;

        const existingBookings = await Booking.find({
            property: pid,
            $or: [
                { checkIn: { $lt: new Date(checkOut) }, checkOut: { $gt: new Date(checkIn) } }, // Check if existing booking overlaps with selected dates
                { checkIn: new Date(checkIn) },
                { checkOut: new Date(checkOut) },
            ],
        });

        if (existingBookings.length > 0) {
            return res.status(400).json({ message: 'Property is already reserved for the selected dates' });
        }

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