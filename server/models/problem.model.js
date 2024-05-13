import mongoose from "mongoose";

const problemReportSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        category: String,
        description: String,
        status: { type: String, default: 'open' },
        messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]
    },
    {
        timestamps: true,
    }
);

const ProblemReport = mongoose.model('ProblemReport', problemReportSchema);
 
export default ProblemReport;



