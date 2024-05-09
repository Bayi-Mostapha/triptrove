import ReviewReport from "../models/review_report.model.js";

// const getReviews = async (req, res) => {
//     const { pid } = req.params;
//     try {
//         const property = await Property.findOne({ _id: pid });
//         if (!property) {
//             return res.status(404).json({ message: 'property not found' });
//         }

//         const reviews = await Review.find({ property: pid });

//         const reportedReviews = await ReviewReport.find({ review: { $in: reviews.map(review => review._id) } });

//         res.json(reportedReviews);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

module.exports = { getReviews };


export const createReport = async (req, res) => {
    const report = new ReviewReport({
        review: req.params.rid,
        reason: req.body.reason,
    });

    try {
        const newReport = await report.save();
        res.status(201).json({ message: 'Reported successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};