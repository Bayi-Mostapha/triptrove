import Property from '../models/property.model.js';
import Review from '../models/review.model.js';
import Booking from '../models/booking.model.js';
import moment from 'moment';

export const getProperty = async (req, res) => {
    try {
        const propertyId = req.params.id;
        const property = await Property.findById(propertyId).populate('owner', 'fullName image created_at');
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        const reviews = Review.find({ property: propertyId }).populate('author', 'fullName image');

        const bookings = await Booking.find({ property: propertyId, status: 'paid' });
        const reservations = bookings.flatMap((booking) => {
            const checkIn = moment(booking.checkIn);
            const checkOut = moment(booking.checkOut);
            const dates = [];
            while (checkIn.isBefore(checkOut)) {
                dates.push(checkIn.format('YYYY-MM-DD'));
                checkIn.add(1, 'days');
            }
            return dates;
        });

        res.json({ property, reviews, reservations });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const createProperty = async (req, res) => {
    const {
        title,
        description,
        streetAddress,
        city,
        photos,
        price,
        cleaningFees,
        guests,
        bedrooms,
        bathrooms,
        beds,
        hasWifi,
        hasPool,
        hasTv,
        hasWasher,
        hasPark,
        hasKitchen,
        hasDesk,
        allowsPets
    } = req.body;

    try {
        const newProperty = new Property({
            title,
            description,
            owner: req.userId,
            streetAddress,
            city,
            photos,
            price,
            cleaningFees,
            guests,
            bedrooms,
            bathrooms,
            beds,
            hasWifi,
            hasPool,
            hasTv,
            hasWasher,
            hasPark,
            hasKitchen,
            hasDesk,
            allowsPets,
        });

        const savedProperty = await newProperty.save();

        res.status(201).json(savedProperty);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create property', error: error.message });
    }
};
