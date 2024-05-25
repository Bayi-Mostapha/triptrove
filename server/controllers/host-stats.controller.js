import Property from '../models/property.model.js'
import Booking from '../models/booking.model.js'
import Wallet from '../models/wallet.model.js';

export const getStatistics = async (req, res) => {
    try {
        const hostId = req.userId;

        const properties = await Property.find({ owner: hostId }).select('_id');
        const propertyIds = properties.map(property => property._id);
        const numberOfProperties = properties.length;

        const wallet = await Wallet.findOne({ host: hostId })

        if (numberOfProperties === 0) {
            return res.json({
                properties: 0,
                revenue: {
                    lastDay: 0,
                    lastWeek: 0,
                    lastMonth: 0,
                    lastYear: 0,
                    allTime: 0
                },
                bookings: {
                    lastDay: 0,
                    lastWeek: 0,
                    lastMonth: 0,
                    lastYear: 0,
                    allTime: 0
                },
                balance: wallet ? wallet.balance : 0
            });
        }

        const bookings = await Booking.find({ property: { $in: propertyIds } });

        const filterBookingsByTime = (startDate) => {
            return bookings.filter(booking => booking.createdAt >= startDate);
        };

        const now = new Date();
        const lastDay = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        const lastYear = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);

        const calculateStats = (startDate) => {
            const filteredBookings = startDate ? filterBookingsByTime(startDate) : bookings;
            const totalRevenue = filteredBookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
            const totalBookings = filteredBookings.length;

            return { revenue: totalRevenue, bookings: totalBookings };
        };

        const response = {
            properties: numberOfProperties,
            revenue: {
                lastDay: calculateStats(lastDay).revenue,
                lastWeek: calculateStats(lastWeek).revenue,
                lastMonth: calculateStats(lastMonth).revenue,
                lastYear: calculateStats(lastYear).revenue,
                allTime: calculateStats().revenue
            },
            bookings: {
                lastDay: calculateStats(lastDay).bookings,
                lastWeek: calculateStats(lastWeek).bookings,
                lastMonth: calculateStats(lastMonth).bookings,
                lastYear: calculateStats(lastYear).bookings,
                allTime: calculateStats().bookings
            },
            balance: wallet ? wallet.balance : 0
        };
        res.json(response);
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).json({ message: 'Server error' });
    }
};