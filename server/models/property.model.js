import mongoose from "mongoose";

const propertySchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const Property = mongoose.model('Property', propertySchema);

export default Property;