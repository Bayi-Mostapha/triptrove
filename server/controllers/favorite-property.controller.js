import Favorite from '../models/favorite-property.model.js';

export const getFavorites = async (req, res) => {
    try {
        const userId = req.userId;

        const favorites = await Favorite
            .find({ user: userId })
            .populate('property', 'title photos location city streetAddress price');
        const properties = favorites.map((favorite) => favorite.property);

        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


export const isFavorite = async (req, res) => {
    try {
        const propertyId = req.params.pid
        const existsInFavorite = await FavoriteProperty.find({ property: propertyId, user: req.userId })
        let isUserFavorite = false
        if (existsInFavorite) {
            isUserFavorite = true
        }
        res.send(isUserFavorite)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const toggleFav = async (req, res) => {
    try {
        const { pid } = req.params;
        const userId = req.userId;

        const existingFavorite = await Favorite.findOne({ user: userId, property: pid });

        if (existingFavorite) {
            await Favorite.findOneAndDelete({ user: userId, property: pid });
            return res.json(false);
        } else {
            const newFavorite = new Favorite({
                user: userId,
                property: pid
            });
            await newFavorite.save();
            return res.json(true);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
