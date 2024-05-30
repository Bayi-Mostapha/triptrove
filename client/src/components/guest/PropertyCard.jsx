// PropertyCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { MdOutlineBed } from "react-icons/md";
import { BiBath } from "react-icons/bi";


const PropertyCard = ({ property, convert, selectedCurrency }) => {
    return (
        <div key={property._id} className="bg-white border rounded-lg overflow-hidden shadow-sm">
            <img src={property.photos[0]} alt={property.title} className="w-full object-cover aspect-video h-32" />
            <div className="py-2 px-3">
                <div className="flex justify-between items-center">
                    <div>
                        <h4 className="text-xs text-gray-600">
                            <span className="text-lg font-medium text-primary">{convert(property.price)} {selectedCurrency}</span>/night
                        </h4>
                        <h3 className="text-lg font-medium capitalize">{property.title}</h3>
                    </div>
                    <Link
                        className="bg-white p-2 rounded-full border hover:bg-blue-50 transition-all"
                        to={`/property/${property._id}`}
                    >
                        <Eye size={18} color="blue" />
                    </Link>
                </div>
                <p className='capitalize text-xs text-gray-600 pb-4 border-b'>{property.city}, {property.streetAddress}</p>
                <div className='mt-2 flex gap-4 items-center justify-center'>
                    <h4 className="bathrooms text-xs text-[#000929] font-medium flex items-center gap-1"><MdOutlineBed  className='text-xl text-[#7065F0] '/>{property.beds} Beds</h4>
                    <h4 className="bathrooms text-xs text-[#000929] font-medium flex items-center gap-1"><BiBath className='text-xl text-[#7065F0]' /> {property.bathrooms} Bathrooms</h4>
                    
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
