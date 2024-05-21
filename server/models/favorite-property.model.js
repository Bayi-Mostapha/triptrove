import mongoose from "mongoose";

const favoritePropSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        property: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Property",
            required: true
        }
    }
);

const FavoriteProperty = mongoose.model('FavoriteProperty', favoritePropSchema);

export default FavoriteProperty;