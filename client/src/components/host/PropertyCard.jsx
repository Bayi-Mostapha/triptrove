import React from 'react';
import { Trash } from 'lucide-react';
import { MdOutlineBed } from "react-icons/md";
import { BiBath } from "react-icons/bi";
import { Link } from 'react-router-dom';

const PropertyCard = ({ property, onRemove }) => {
    // Define the list of possible amenities with corresponding property keys and display names
    const amenitiesList = [
        { key: 'hasWifi', label: 'WiFi' },
        { key: 'hasPool', label: 'Swimming Pool' },
        { key: 'hasTv', label: 'TV' },
        { key: 'hasWasher', label: 'Washer' },
        { key: 'hasPark', label: 'Parking' },
        { key: 'hasKitchen', label: 'Kitchen' },
        { key: 'hasDesk', label: 'Desk' },
        { key: 'allowsPets', label: 'Pets Allowed' }
    ];

    // Filter the amenities to include only those that are true
    const amenities = amenitiesList.filter(amenity => property[amenity.key]);

    console.log('Image URL:', property.photos[0]);

    return (
        <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
            <img

                src={property.photos[0] || '/default-image.jpg'}
                alt={property.title}
                className="w-full object-cover aspect-video h-32"
            />
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
                        aria-label="Remove property"
                    >
                        <Trash size={18} color="red" />
                    </button>
                </div>
                <p className='capitalize text-xs text-gray-600 pb-4 border-b'>{property.city}, {property.streetAddress}</p>
                <div className='mt-2 flex gap-4 items-center justify-center'>
                    <h4 className="bathrooms text-xs text-[#000929] font-medium flex items-center gap-1"><MdOutlineBed className='text-xl text-[#7065F0] ' />{property.beds} Beds</h4>
                    <h4 className="bathrooms text-xs text-[#000929] font-medium flex items-center gap-1"><BiBath className='text-xl text-[#7065F0]' /> {property.bathrooms} Bathrooms</h4>

                </div>
            </div>
            <Link to={'/listing-reviews/' + property._id} className='text-sm font-medium text-primary block w-fit mx-auto mb-2'>view reviews</Link>
        </div>
    );
};

export default PropertyCard;
