import { axiosClient } from "@/api/axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Trash2 } from 'lucide-react';

const pros = [{
    title: 'cozy cabin',
    photos: ['/img1.webg']
}]
function Favorites() {
    const [favorites, setFavorites] = useState([]);

    async function getFavorites() {
        try {
            const res = await axiosClient.get('/favorites');
            setFavorites(res.data);
        } catch (error) {
            toast.error('Failed to fetch favorites');
        }
    }

    useEffect(() => {
        // getFavorites();

    }, []);

    async function handleRemoveFavorite(id) {
        try {
            await axiosClient.delete(`/favorites/${id}`);
            setFavorites(favorites.filter(fav => fav.property._id !== id));
            toast.success('Favorite removed');
        } catch (error) {
            toast.error('Failed to remove favorite');
        }
    }

    return (
        <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map(favorite => (
                <div key={favorite.property._id} className="relative bg-white border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow">
                    <button
                        className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md hover:shadow-lg transition-shadow"
                        onClick={() => handleRemoveFavorite(favorite.property._id)}
                    >
                        <Trash2 size={24} color="red" />
                    </button>
                    <img src={favorite.photos[0]} alt={favorite.title} className="w-full h-48 object-cover" />
                    <h3 className="p-4 text-lg font-semibold">{favorite.title}</h3>
                </div>
            ))}
        </div>
    );
}

export default Favorites;