import React, { useContext } from 'react';
import { StepperContext } from '@/contexts/StepperContext';

const Publish = () => {
  const { userData } = useContext(StepperContext);

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-medium mb-6'>Preview your listing</h1>
      <div className='preview bg-white p-4 rounded-md shadow-md'>
        <h2 className='text-xl font-semibold mb-2'>{userData.title}</h2>
        <p className='text-gray-700 mb-2'>{userData.description}</p>
        <p className='text-gray-600 mb-2'>{userData.streetAddress}, {userData.city}</p>
        <p className='text-gray-800 mb-2'>Price: <span className='font-semibold'>${userData.price}</span> per night</p>
        <p className='text-gray-800 mb-2'>Cleaning Fees: <span className='font-semibold'>${userData.cleaningFees}</span></p>
        <p className='text-gray-800 mb-2'>Guests: <span className='font-semibold'>{userData.guests}</span></p>
        <p className='text-gray-800 mb-2'>Bedrooms: <span className='font-semibold'>{userData.bedrooms}</span></p>
        <p className='text-gray-800 mb-2'>Bathrooms: <span className='font-semibold'>{userData.bathrooms}</span></p>
        <p className='text-gray-800 mb-2'>Beds: <span className='font-semibold'>{userData.beds}</span></p>

        {/* <div className='photos flex overflow-x-auto gap-2 justify-center mt-4'>
          {userData.photos.map((photo, index) => (
            <img key={index} src={photo} alt={`Photo ${index + 1}`} className='w-24 h-24 object-cover rounded-md border border-gray-300' />
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default Publish;
