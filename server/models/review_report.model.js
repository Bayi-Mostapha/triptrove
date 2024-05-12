import mongoose from "mongoose";

const reviewReportSchema = mongoose.Schema(
    {
        review: {
            type: String,
            required: true,
        },
        reason: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const ReviewReport = mongoose.model('ReviewReport', reviewReportSchema);

export default ReviewReport;