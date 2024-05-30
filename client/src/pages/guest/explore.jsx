// pages/explore.js
import React, { useEffect, useState, useContext } from 'react';
import { axiosClient } from '@/api/axios';
import PropertyCard from '@/components/guest/PropertyCard';
import { ExchangeRateContext } from "@/contexts/exchangeRatesWrapper";
import { IoSearch } from "react-icons/io5";
import { Minus, Plus } from 'lucide-react';

export default function Explore() {
    const { convert, selectedCurrency } = useContext(ExchangeRateContext);
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        city: '',
        checkInDate: '',
        checkOutDate: '',
        guests: 0,
        hasWifi: false,
        hasPool: false,
        hasTv: false,
        hasWasher: false,
        hasPark: false,
        hasKitchen: false,
        hasDesk: false,
        allowsPets: false
    });

    const fetchProperties = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get('/properties', { params: filters });
            setProperties(response.data);
            console.log(response);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFilters({
            ...filters,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSearch = () => {
        fetchProperties();
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <div className='search-bar flex gap-4 mt-8 mx-[150px] p-4 rounded-xl bg-[#F8F8F8]'>
                <div className='flex rounded-md bg-white justify-center items-center pl-2'>
                    <IoSearch className='text-xl text-[#464545]' />
                    <input
                        type="text"
                        name="city"
                        className='p-[6px] focus:outline-none pl-4'
                        placeholder='Marrakech, Morocco'
                        value={filters.city}
                        onChange={handleFilterChange}
                    />
                </div>

                <input type="date" name="checkInDate" className='p-[6px] rounded-md pl-4 text-[#4B4949]' value={filters.checkInDate} onChange={handleFilterChange} placeholder='Check in' />
                <input type="date" name="checkOutDate" className='p-[6px] rounded-md pl-4 text-[#4B4949]' value={filters.checkOutDate} onChange={handleFilterChange} placeholder='Check out' />

                <button className='bg-[#7065F0] px-8 text-white rounded-md block ml-auto' onClick={handleSearch}>Search</button>
            </div>

            <div className='filter-bar flex gap-4 mt-4 mx-[150px] p-4 rounded-xl bg-[#F8F8F8]'>
                {['hasWifi', 'hasPool', 'hasTv', 'hasWasher', 'hasPark', 'hasKitchen', 'hasDesk', 'allowsPets'].map(amenity => (
                    <div key={amenity} className='flex items-center'>
                        <input
                            type='checkbox'
                            name={amenity}
                            checked={filters[amenity]}
                            onChange={handleFilterChange}
                            className='accent-primary'
                        />
                        <label htmlFor={amenity} className='ml-2'>{amenity.replace('has', '').replace(/([A-Z])/g, ' $1').trim()}</label>
                    </div>
                ))}
                <div className="ml-auto flex items-center gap-2">
                    Guests:
                    <button
                        onClick={() => {
                            setFilters(prev => ({ ...prev, guests: Math.max(0, prev.guests - 1) }));
                        }}
                        disabled={filters.guests <= 0}
                        className="group w-8 h-8 flex justify-center items-center border border-gray-300 rounded-full text-lg hover:bg-gray-200 disabled:border-gray-300 disabled:cursor-not-allowed transition-all"
                    >
                        <Minus className="stroke-gray-500 group-disabled:stroke-gray-300" size='14px' />
                    </button>
                    <div>{filters.guests}</div>
                    <button
                        onClick={() => {
                            setFilters(prev => ({ ...prev, guests: prev.guests + 1 }));
                        }}
                        className="group w-8 h-8 flex justify-center items-center border border-gray-300 rounded-full text-lg hover:bg-gray-200 disabled:border-gray-300 disabled:cursor-not-allowed transition-all"
                    >
                        <Plus className="stroke-gray-500 group-disabled:stroke-gray-300" size='14px' />
                    </button>
                </div>
            </div >

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
        </div >
    );
}
