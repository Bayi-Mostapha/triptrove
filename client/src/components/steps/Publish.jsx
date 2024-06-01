import React, { useContext, useState } from 'react';
import { StepperContext } from '@/contexts/StepperContext';

const Publish = () => {
  const { userData } = useContext(StepperContext);
  const [imagePreviews, setImagePreviews] = useState([]);

  const displayImages = () => {
    let promises = [];

    for (let i = 0; i < userData.photos.length; i++) {
      const reader = new FileReader();
      const file = userData.photos[i];

      const promise = new Promise((resolve, reject) => {
        reader.onload = (e) => {
          resolve(e.target.result);
        };
        reader.onerror = (error) => {
          reject(error);
        };
      });

      reader.readAsDataURL(file);
      promises.push(promise);
    }

    Promise.all(promises)
      .then((results) => {
        setImagePreviews(results);
      })
      .catch((error) => {
        console.error('Error loading images:', error);
      });

    return <div className='grid grid-cols-3'>
      {
        imagePreviews.splice(0, 6).map((fileURL, index) => (
          <img
            key={index}
            src={fileURL}
            alt={`Preview ${index}`}
            className="h-[100px] w-[100px] m-2 rounded-md object-cover"
          />
        ))
      }
    </div>
  };
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

        {
          displayImages()
        }
      </div>
    </div>
  );
};

export default Publish;
