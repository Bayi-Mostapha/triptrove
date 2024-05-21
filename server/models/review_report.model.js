import mongoose from "mongoose";

const reviewReportSchema = mongoose.Schema(
    {
        review: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
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