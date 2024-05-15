import Favorite from '../models/favorite-property.model.js';

export const getFavorites = async (req, res) => {
    try {
        const userId = req.userId;
        const favorites = await Favorite.find({ user: userId }).populate('property');
        const properties = favorites.map((favorite) => favorite.property);
        res.json(properties);
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
            return res.json({ message: 'Property removed from favorites' });
        } else {
            const newFavorite = new Favorite({
                user: userId,
                property: pid
            });
            await newFavorite.save();
            return res.json({ message: 'Property added to favorites' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
