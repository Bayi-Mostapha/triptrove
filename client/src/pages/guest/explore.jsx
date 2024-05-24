// src/Explore.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Explore() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:5000/listings');
      setListings(result.data);
    };

    fetchData();
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Marrakech, Morocco"
          className="border rounded-md p-2 mr-2"
        />
        <input type="date" className="border rounded-md p-2 mr-2" />
        <input type="date" className="border rounded-md p-2 mr-2" />
        <select className="border rounded-md p-2 mr-2">
          <option>Guests</option>
          <option>1 Guest</option>
          <option>2 Guests</option>
          <option>3 Guests</option>
          <option>4 Guests</option>
        </select>
        <button className="bg-purple-600 text-white rounded-md px-4 py-2">Search</button>
      </div>

      <div className="flex justify-center mb-6">
        <button className="bg-gray-200 rounded-full px-4 py-2 mx-1">House</button>
        <button className="bg-gray-200 rounded-full px-4 py-2 mx-1">Villa</button>
        <button className="bg-gray-200 rounded-full px-4 py-2 mx-1">Apartment</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <div key={listing._id} className="border rounded-lg overflow-hidden shadow-lg">
            <img src={listing.image} alt={listing.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{listing.name}</h3>
              <p className="text-gray-600">{listing.location}</p>
              <p className="text-purple-600">{listing.price} Mad/night</p>
              <p className="text-gray-600">{listing.beds} Beds, {listing.baths} Bathrooms</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
