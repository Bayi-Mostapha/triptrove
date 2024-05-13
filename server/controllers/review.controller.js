import Review from "../models/review.model.js";

export const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ property: req.params.pid });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createReview = async (req, res) => {
    const review = new Review({
        stars: req.body.stars,
        content: req.body.content,
        author: req.body.author,
        property: req.params.pid,
    });

    try {
        const newReview = await review.save();
        res.status(201).json(newReview);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteReview = async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.id);
        res.json({ message: 'Review deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateReview = async (req, res) => {
    try {
        const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedReview);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};