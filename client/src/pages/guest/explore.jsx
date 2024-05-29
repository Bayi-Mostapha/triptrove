import React, { useEffect, useState, useContext } from 'react';
import { axiosClient } from '@/api/axios'; // Using the pre-configured axios client
import PropertyCard from '@/components/guest/PropertyCard';
import { ExchangeRateContext } from "@/contexts/exchangeRatesWrapper";
import { IoSearch } from "react-icons/io5";

export default function Explore() {
    const { convert, selectedCurrency } = useContext(ExchangeRateContext);
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axiosClient.get('/properties'); // Fetch properties using axiosClient
                setProperties(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <div className='search-bar flex gap-4 mt-8 mx-[150px] p-4 rounded-xl bg-[#F8F8F8]'>
                <div className='flex rounded-md bg-white justify-center items-center pl-2'>
                    <IoSearch className='text-xl text-[#464545]' />
                    <input
                        type="text"
                        className='p-[6px] focus:outline-none pl-4'
                        placeholder='Marrakech, Morocco'
                    />
                </div>
                
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
