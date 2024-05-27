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
    updateUserData({ [name]: checked });
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

      <div className='sec2 flex flex-col gap-4'>
        <div className='flex gap-4 justify-center '>
        <div className='flex gap-2 border pr-4 py-2 items-center justify-left pl-3 rounded-md'>
          <input
            type="checkbox"
            name="hasWifi"
            checked={userData.hasWifi || false}
            onChange={handleCheckboxChange}
            className='cursor-pointer'
          /> 
          Wifi
        </div>
        <div className='flex gap-2 border pr-4 py-2 items-center justify-left pl-3 rounded-md'>
          <input
            type="checkbox"
            name="hasPool"
            checked={userData.hasPool || false}
            onChange={handleCheckboxChange}
            className='cursor-pointer'
          /> 
          Pool
        </div>
        <div className='flex gap-2 border pr-4 py-2 items-center justify-left pl-3 rounded-md'>
          <input
            type="checkbox"
            name="hasTv"
            checked={userData.hasTv || false}
            onChange={handleCheckboxChange}
            className='cursor-pointer'
          /> 
          TV
        </div>
        <div className='flex gap-2 border pr-4 py-2 items-center justify-left pl-3 rounded-md'>
          <input
            type="checkbox"
            name="hasWasher"
            checked={userData.hasWasher || false}
            onChange={handleCheckboxChange}
            className='cursor-pointer'
          /> 
          Washer
        </div>
        </div>
        <div className='flex gap-4 justify-center '>
        <div className='flex gap-2 border pr-4 py-2 items-center justify-left pl-3 rounded-md'>
          <input
            type="checkbox"
            name="hasKitchen"
            checked={userData.hasKitchen || false}
            onChange={handleCheckboxChange}
            className='cursor-pointer'
          /> 
          Kitchen
        </div>
        <div className='flex gap-2 border pr-4 py-2 items-center justify-left pl-3 rounded-md'>
          <input
            type="checkbox"
            name="hasPark"
            checked={userData.hasPark || false}
            onChange={handleCheckboxChange}
            className='cursor-pointer'
          /> 
          Park
        </div>
        <div className='flex gap-2 border pr-4 py-2 items-center justify-left pl-3 rounded-md'>
          <input
            type="checkbox"
            name="hasDesk"
            checked={userData.hasDesk || false}
            onChange={handleCheckboxChange}
            className='cursor-pointer'
          /> 
          Desk
        </div>
        <div className='flex gap-2 border pr-4 py-2 items-center justify-left pl-3 rounded-md'>
          <input
            type="checkbox"
            name="allowsPets"
            checked={userData.allowsPets || false}
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
