import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
    {
        stars: {
            type: Number,
            required: true,
        },
        content: String,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        property: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Property",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Review = mongoose.model('Review', reviewSchema);

export default Review;