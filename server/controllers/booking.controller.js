import Booking from "../models/booking.model";

export const createBooking = async (req, res) => {
    try {
        const { pid } = req.params; 
        const { checkIn, checkOut, totalPrice } = req.body; 

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
            property: pid,
            checkIn: new Date(checkIn),
            checkOut: new Date(checkOut),
            totalPrice: totalPrice,
        });

        res.status(201).json({ booking });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};