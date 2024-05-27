import mongoose from "mongoose";

const bookingSchema = mongoose.Schema(
    {
        guest: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        property: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Property',
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
        },
        status: {
            type: String,
            enum: ['canceled', 'paid'],
            default: 'paid'
        },
    },
    {
        timestamps: true,
    }
);

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;