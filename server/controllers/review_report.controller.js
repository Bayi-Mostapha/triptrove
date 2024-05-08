import ReviewReport from "../models/review_report.model.js";

// export const getReports = async (req, res) => {
//     try {
//         const reports = await ReviewReport.find({ review: req.params.pid });
//         res.json(reports);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

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