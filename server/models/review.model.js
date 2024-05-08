import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
    {
        stars: {
            type: Number,
            required: true,
        },
        content: String,
        author: {
            type: String,
            required: true,
        },
        property: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Review = mongoose.model('Review', reviewSchema);

export default Review;