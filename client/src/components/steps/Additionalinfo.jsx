import React, { useContext } from 'react';
import { StepperContext } from '@/contexts/StepperContext';

const Additionalinfo = () => {
  const { userData, updateUserData } = useContext(StepperContext);

  const increment = (field) => {
    updateUserData({ [field]: (userData[field] || 0) + 1 });
  };

  const decrement = (field) => {
    updateUserData({ [field]: userData[field] > 0 ? userData[field] - 1 : 0 });
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    updateUserData({
      amenities: {
        ...userData.amenities,
        [name]: checked
      }
    });
  };

  return (
    <div>
      <div className='text-[#222222] mt-5 mb-10'>
        <div className='flex justify-between mb-4 '>
          <label>Guests</label>
          <div className='flex gap-3'>
            <button onClick={() => decrement('guests')} className='decrement-btn border border-[#B6B6B6] rounded-full px-[9.5px]'>
              -
            </button>
            <span className='count'>{userData.guests || 0}</span>
            <button onClick={() => increment('guests')} className='increment-btn border border-[#B6B6B6] rounded-full px-[7.5px]'>
              +
            </button>
          </div>
        </div>
        <hr />
        <div className='flex justify-between my-4'>
          <label>Bedrooms</label>
          <div className='flex gap-3'>
            <button onClick={() => decrement('bedrooms')} className='decrement-btn border border-[#B6B6B6] rounded-full px-[9.5px]'>
              -
            </button>
            <span className='count'>{userData.bedrooms || 0}</span>
            <button onClick={() => increment('bedrooms')} className='increment-btn border border-[#B6B6B6] rounded-full px-[7.5px]'>
              +
            </button>
          </div>
        </div>
        <hr />
        <div className='flex justify-between my-4'>
          <label>Beds</label>
          <div className='flex gap-3'>
            <button onClick={() => decrement('beds')} className='decrement-btn border border-[#B6B6B6] rounded-full px-[9.5px]'>
              -
            </button>
            <span className='count'>{userData.beds || 0}</span>
            <button onClick={() => increment('beds')} className='increment-btn border border-[#B6B6B6] rounded-full px-[7.5px]'>
              +
            </button>
          </div>
        </div>
        <hr />
        <div className='flex justify-between my-4'>
          <label>Bathrooms</label>
          <div className='flex gap-3'>
            <button onClick={() => decrement('bathrooms')} className='decrement-btn border border-[#B6B6B6] rounded-full px-[9.5px]'>
              -
            </button>
            <span className='count'>{userData.bathrooms || 0}</span>
            <button onClick={() => increment('bathrooms')} className='increment-btn border border-[#B6B6B6] rounded-full px-[7.5px]'>
              +
            </button>
          </div>
        </div>
      </div>

      <div className='sec2 flex flex-col gap-4 items-center '>
        <div className='flex gap-6'>
          <div className='flex gap-2 border pr-4 py-2 items-center justify-left pl-3 rounded-md'>
            <input
              type="checkbox"
              name="wifi"
              checked={userData.amenities.wifi}
              onChange={handleCheckboxChange}
              className='cursor-pointer'
            /> 
            Wifi
          </div>
          <div className='flex gap-2 border pr-4 py-2 items-center justify-left pl-3 rounded-md'>
            <input
              type="checkbox"
              name="pool"
              checked={userData.amenities.pool}
              onChange={handleCheckboxChange}
              className='cursor-pointer'
            /> 
            Pool
          </div>
          <div className='flex gap-2 border pr-4 py-2 items-center justify-left pl-3 rounded-md'>
            <input
              type="checkbox"
              name="tv"
              checked={userData.amenities.tv}
              onChange={handleCheckboxChange}
              className='cursor-pointer'
            /> 
            TV
          </div>
          <div className='flex gap-2 border pr-4 py-2 items-center justify-left pl-3 rounded-md'>
            <input
              type="checkbox"
              name="washer"
              checked={userData.amenities.washer}
              onChange={handleCheckboxChange}
              className='cursor-pointer'
            /> 
            Washer
          </div>
        </div>
        <div className='flex gap-6'> 
          <div className='flex gap-2 border pr-4 py-2 items-center justify-left pl-3 rounded-md'>
            <input
              type="checkbox"
              name="kitchen"
              checked={userData.amenities.kitchen}
              onChange={handleCheckboxChange}
              className='cursor-pointer'
            /> 
            Kitchen
          </div>
          <div className='flex gap-2 border pr-4 py-2 items-center justify-left pl-3 rounded-md'>
            <input
              type="checkbox"
              name="park"
              checked={userData.amenities.park}
              onChange={handleCheckboxChange}
              className='cursor-pointer'
            /> 
            Park
          </div>
          <div className='flex gap-2 border pr-4 py-2 items-center justify-left pl-3 rounded-md'>
            <input
              type="checkbox"
              name="desk"
              checked={userData.amenities.desk}
              onChange={handleCheckboxChange}
              className='cursor-pointer'
            /> 
            Desk
          </div>
          <div className='flex gap-2 border pr-4 py-2 items-center justify-left pl-3 rounded-md'>
            <input
              type="checkbox"
              name="pets"
              checked={userData.amenities.pets}
              onChange={handleCheckboxChange}
              className='cursor-pointer'
            /> 
            Pets
          </div>
        </div>
      </div>
    </div>
  );
};

export default Additionalinfo;
