import { axiosClient } from "@/api/axios";
import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { Eye, Trash } from 'lucide-react';
import { ExchangeRateContext } from "@/contexts/exchangeRatesWrapper";
import { Link } from "react-router-dom";

function Favorites() {
    const { convert, selectedCurrency } = useContext(ExchangeRateContext)
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
        getFavorites();
    }, []);

    async function handleRemoveFavorite(id) {
        try {
            await axiosClient.post(`/favorites/${id}`);
            setFavorites(prev => prev.filter(fav => fav._id !== id));
            toast.success('Favorite removed');
        } catch (error) {
            toast.error('Failed to remove favorite');
        }
    }

    return (
        <div className="px-3">
            <h1 className="text-2xl font-semibold my-4">Favorite properties</h1>
            {
                favorites.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {favorites.map(favorite => (
                            <div key={favorite._id} className="bg-white border rounded-lg overflow-hidden shadow-sm">
                                <img src={favorite.photos[0]} alt={favorite.title} className="w-full object-cover aspect-video h-32" />
                                <div className="py-2 px-3">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h4 className="text-xs text-gray-600">
                                                <span className="text-lg font-medium text-primary">{convert(favorite.price)} {selectedCurrency}</span>/night
                                            </h4>
                                            <h3 className="text-lg font-medium capitalize">{favorite.title}</h3>
                                        </div>
                                        <button
                                            className="bg-white p-2 rounded-full border hover:bg-red-50 transition-all"
                                            onClick={() => handleRemoveFavorite(favorite._id)}
                                        >
                                            <Trash size={18} color="red" />
                                        </button>
                                    </div>
                                    <p className='capitalize text-xs text-gray-600 pb-4 border-b'>{favorite.city}, {favorite.streetAddress}</p>
                                    <Link
                                        to={'/property/' + favorite._id}
                                        className="mt-2 mx-auto w-fit text-sm text-primary flex items-center gap-1 hover:underline"
                                    >
                                        view <Eye size={14} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='flex items-center justify-center font-medium'>You have no favorite properties for now</div>
                )
            }
        </div>
    );
}

export default Favorites;