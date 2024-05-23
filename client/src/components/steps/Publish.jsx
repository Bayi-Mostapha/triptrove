import React, { useContext } from 'react';
import { StepperContext } from '@/contexts/StepperContext';

const Publish = () => {
  const { userData } = useContext(StepperContext);

  return (
    <div className='p-6'>
      <h1 className='text-3xl font-medium text-center mb-6'>Preview Your Listing</h1>
      <div className='border rounded-lg p-4'>
        <h2 className='text-2xl font-semibold mb-4'>{userData.title || 'Property Title'}</h2>
        <p className='text-gray-600 mb-6'>{userData.description || 'Property Description'}</p>
        
        <div className='mb-6'>
          <h3 className='text-xl font-semibold'>Location</h3>
          <p>{userData.streetAddress || 'Street Address'}, {userData.city || 'City'}</p>
        </div>

        <div className='mb-6'>
          <h3 className='text-xl font-semibold'>Details</h3>
          <p>Guests: {userData.guests || 0}</p>
          <p>Bedrooms: {userData.bedrooms || 0}</p>
          <p>Beds: {userData.beds || 0}</p>
          <p>Bathrooms: {userData.bathrooms || 0}</p>
        </div>

        <div className='mb-6'>
          <h3 className='text-xl font-semibold'>Amenities</h3>
          <ul>
            {userData.amenities && Object.keys(userData.amenities).map((amenity, index) => (
              <li key={index} className='capitalize'>{amenity}</li>
            ))}
          </ul>
        </div>

        <div className='mb-6'>
          <h3 className='text-xl font-semibold'>Photos</h3>
          <div className='flex flex-wrap'>
            {userData.photos && userData.photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Property Photo ${index}`}
                className='h-[100px] w-[100px] m-2 rounded-md object-cover'
              />
            ))}
          </div>
        </div>

        <div className='mb-6'>
          <h3 className='text-xl font-semibold'>Price</h3>
          <p>Base Price: MAD {userData.price || 0}</p>
          <p>Fees: 2%</p>
          <p>You Earn: MAD {userData.price ? userData.price * 0.98 : 0}</p>
        </div>
      </div>
    </div>
  );
};

export default Publish;
