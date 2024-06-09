import PropertyReport from "../models/property_report.model.js";

export const getAllReports = async (req, res) => {
    try {
        const reportedProperties = await PropertyReport.find()
            .populate({
                path: 'property',
                select: 'title',
                populate: {
                    path: 'owner',
                    select: 'image fullName'
                }
            })
            .populate('reporter', 'image fullName email');

        res.json(reportedProperties);
    } catch (error) {
        console.error('Error fetching all reports:', error);
        res.status(500).json({ message: 'Failed to fetch reports' });
    }
};

export const getReports = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Property ID is required' });
        }

        const reportedProperties = await PropertyReport.find({ property: id })
            .populate({
                path: 'property',
                select: 'title',
                populate: {
                    path: 'owner',
                    select: 'image fullName'
                }
            })
            .populate('reporter', 'image fullName email');

        if (reportedProperties.length === 0) {
            return res.status(404).json({ message: 'No reports found for this property' });
        }

        res.json(reportedProperties);
    } catch (error) {
        console.error(`Error fetching reports for property:`, error);
        res.status(500).json({ message: 'Failed to fetch reports' });
    }
};

export const createReport = async (req, res) => {
    const { id } = req.params;
    const { reason } = req.body;
    const reporter = req.userId;
    if (!reason) {
        return res.status(400).json({ message: 'Reason is required' });
    }
    const report = new PropertyReport({
        property: id,
        reason,
        reporter
    });
    try {
        await report.save();
        res.status(201).json({ message: 'Reported successfully' });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
};

export const deleteReport = async (req, res) => {
    try {
        await PropertyReport.findByIdAndDelete(req.params.id);
        res.status(204).json({ message: 'Report deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
};
