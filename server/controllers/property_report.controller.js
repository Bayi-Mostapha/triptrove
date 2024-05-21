import PropertyReport from "../models/property_report.model.js";

export const getAllReports = async (req, res) => {
    try {
        const reportedProperties = await PropertyReport.find().populate('owner', 'image fullName email');
        res.json(reportedProperties);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getReports = async (req, res) => {
    try {
        const { id } = req.params;
        const reportedProperties = await PropertyReport.find({ property: id }).populate('owner', 'image fullName email');
        res.json(reportedProperties);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const createReport = async (req, res) => {
    const { id } = req.params;
    const { reason } = req.body;
    if (!reason) {
        return res.status(400).json({ message: 'Reason is required' });
    }
    const report = new PropertyReport({
        property: id,
        reason,
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
