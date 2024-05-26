// PropertyCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Trash } from 'lucide-react';

const PropertyCard = ({ property, onRemove }) => {
    return (
        <div key={property._id} className="bg-white border rounded-lg overflow-hidden shadow-sm">
            <img src={property.photos[0]} alt={property.title} className="w-full object-cover aspect-video h-32" />
            <div className="py-2 px-3">
                <div className="flex justify-between items-center">
                    <div>
                        <h4 className="text-xs text-gray-600">
                            <span className="text-lg font-medium text-primary">{property.price} MAD</span>/night
                        </h4>
                        <h3 className="text-lg font-medium capitalize">{property.title}</h3>
                    </div>
                    <button
                        className="bg-white p-2 rounded-full border hover:bg-red-50 transition-all"
                        onClick={() => onRemove(property._id)}
                    >
                        <Trash size={18} color="red" />
                    </button>
                </div>
                <p className='capitalize text-xs text-gray-600 pb-4 border-b'>{property.city}, {property.streetAddress}</p>
                <div className='mt-2'>
                    <h4 className="text-sm font-semibold">Amenities:</h4>
                    <ul className="list-disc list-inside text-xs text-gray-600">
                        {property.amenities.map((amenity, index) => (
                            <li key={index}>{amenity}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
