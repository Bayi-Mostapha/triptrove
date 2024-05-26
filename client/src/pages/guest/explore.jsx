// Explore.jsx
import React, { useEffect, useState, useContext } from 'react';
import { axiosClient } from '@/api/axios';
import PropertyCard from '@/components/guest/PropertyCard';
import { ExchangeRateContext } from "@/contexts/exchangeRatesWrapper";

export default function Explore() {
    const { convert, selectedCurrency } = useContext(ExchangeRateContext);
    const [properties, setProperties] = useState([]);

    // Dummy data for properties
    const dummyProperties = [
        {
            _id: '1',
            title: 'Luxurious Villa',
            photos: ['/img1.webp'],
            city: 'Marrakech',
            streetAddress: 'Gueliz',
            price: 250,
            amenities: ['WiFi', 'Swimming Pool', 'Air Conditioning']
        },
        {
            _id: '2',
            title: 'Modern Apartment',
            photos: ['/img2.webp'],
            city: 'Casablanca',
            streetAddress: 'Maarif',
            price: 150,
            amenities: ['WiFi', 'Gym', 'Parking']
        },
        // Add more dummy properties here
    ];

    useEffect(() => {
        // Fetch properties data
        // async function fetchProperties() {
        //     try {
        //         const res = await axiosClient.get('/properties');
        //         setProperties(res.data);
        //     } catch (error) {
        //         console.error('Failed to fetch properties');
        //     }
        // }
        // fetchProperties();

        // Use dummy data for now
        setProperties(dummyProperties);
    }, []);

    return (
        <div className=''>
            <div className='search-bar flex gap-4 mt-8 mx-[150px] p-4 rounded-xl bg-[#F8F8F8]'>
                <input type="text" className='p-[6px] rounded-md pl-4' placeholder='Marrakech, Morocco' />
                <input type="date" className='p-[6px] rounded-md pl-4 text-[#4B4949]' placeholder='Check in' />
                <input type="date" className='p-[6px] rounded-md pl-4 text-[#4B4949]' placeholder='Check out' />
                <input type="text" className='w-[90px] rounded-md pl-4' placeholder='Guests' />
                <button className='bg-[#7065F0] px-8 text-white rounded-md'>Search</button>
            </div>

            <div className='category mt-8'>
                {/* Add category filters if needed */}
            </div>

            <div className='properties grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4'>
                {properties.map(property => (
                    <PropertyCard 
                        key={property._id} 
                        property={property} 
                        convert={convert} 
                        selectedCurrency={selectedCurrency} 
                    />
                ))}
            </div>
        </div>
    );
}
