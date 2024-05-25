import mongoose from "mongoose";

const propertyReportSchema = mongoose.Schema(
    {
        reporter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        property: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Property",
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

const PropertyReport = mongoose.model('PropertyReport', propertyReportSchema);

export default PropertyReport;