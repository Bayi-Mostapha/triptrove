import mongoose from "mongoose";

const propertyReportSchema = mongoose.Schema(
    {
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