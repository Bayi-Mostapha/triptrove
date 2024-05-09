import mongoose from "mongoose";

const bookingSchema = mongoose.Schema(
    {
        guest: {
            type: String,
            required: true
        },
        property: {
            type: String,
            required: true
        },
        checkIn: {
            type: Date,
            required: true,
        },
        checkOut: {
            type: Date,
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;