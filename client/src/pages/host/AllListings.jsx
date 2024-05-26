// AllListings.jsx
import React, { useEffect, useState } from 'react';
import { axiosClient } from '@/api/axios';
import PropertyCard from '@/components/host/PropertyCard';
import { Link } from 'react-router-dom';

const dummyProperties = [
    {
        _id: '1',
        title: 'Riad Loft N\'Joy',
        photos: ['/img1.webp'],
        city: 'Marrakech',
        streetAddress: 'Gueliz',
        price: 900,
        beds: 4,
        bathrooms: 2,
        amenities: ['WiFi', 'Swimming Pool', 'Air Conditioning']
    },
    {
        _id: '2',
        title: 'Riad Loft N\'Joy',
        photos: ['/img1.webp'],
        city: 'Marrakech',
        streetAddress: 'Gueliz',
        price: 900,
        beds: 4,
        bathrooms: 2,
        amenities: ['WiFi', 'Swimming Pool', 'Air Conditioning']
    },
    // Add more dummy properties here
];

function AllListings() {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        // Fetch listings data
        // async function fetchListings() {
        //     try {
        //         const res = await axiosClient.get('/listings');
        //         setListings(res.data);
        //     } catch (error) {
        //         console.error('Failed to fetch listings');
        //     }
        // }
        // fetchListings();

        // Use dummy data for now
        setListings(dummyProperties);
    }, []);

    const handleRemoveListing = (id) => {
        // Handle remove listing logic
        setListings(prevListings => prevListings.filter(listing => listing._id !== id));
    };

    return (
        <div className='p-8'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-3xl font-semibold'>All Listings</h1>
                <div className='flex items-center gap-4'>
                    <input
                        type='text'
                        placeholder='Search property'
                        className='p-2 border rounded-md'
                    />
                    <Link to='/host' className='bg-primary text-white px-4 py-2 rounded-md'>
                        + Add a property
                    </Link>
                </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {listings.map(property => (
                    <PropertyCard
                        key={property._id}
                        property={property}
                        onRemove={handleRemoveListing}
                    />
                ))}
            </div>
        </div>
    );
}

export default AllListings;
