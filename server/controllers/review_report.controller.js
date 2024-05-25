import Review from "../models/review.model.js";
import Property from "../models/property.model.js";
import ReviewReport from "../models/review_report.model.js";

export const getAllReports = async (req, res) => {
    try {
        const reportedReviews = await ReviewReport.find()
            .populate({
                path: 'review',
                populate: [
                    {
                        path: 'author',
                        select: 'fullName image email'
                    },
                    {
                        path: 'property',
                        select: 'title owner',
                        populate: {
                            path: 'owner',
                            select: 'fullName image email'
                        }
                    }
                ]
            });

        res.json(reportedReviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getReports = async (req, res) => {
    const { pid } = req.params;
    try {
        const property = await Property.findById(pid);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        const reviews = await Review.find({ property: pid });

        const reportedReviews = await ReviewReport.find({ review: { $in: reviews.map(review => review._id) } })
            .populate({
                path: 'review',
                populate: [
                    {
                        path: 'author',
                        select: 'fullName image email'
                    },
                    {
                        path: 'property',
                        select: 'title owner',
                        populate: {
                            path: 'owner',
                            select: 'fullName image email'
                        }
                    }
                ]
            });

        res.json(reportedReviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const createReport = async (req, res) => {
    const report = new ReviewReport({
        review: req.params.rid,
        reason: req.body.reason,
    });

    try {
        await report.save();
        res.status(201).json({ message: 'Reported successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteReport = async (req, res) => {
    try {
        await ReviewReport.findByIdAndDelete(req.params.id);
        res.status(201).json({ message: 'Report deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};