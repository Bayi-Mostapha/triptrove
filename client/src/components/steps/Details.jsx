import React, { useContext } from 'react';
import { Input } from '@/components/ui/input';
import { StepperContext } from '@/contexts/StepperContext';

const Details = () => {
  const { userData, setUserData } = useContext(StepperContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex flex-col gap-2'>
        <label className='text-[#7B7F8E]'>Title</label>
        <Input
          name='title'
          value={userData.title || ''}
          onChange={handleChange}
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label className='text-[#7B7F8E]'>Description</label>
        <Input
          name='description'
          value={userData.description || ''}
          onChange={handleChange}
          className='h-28'
        />
      </div>
      <div className='flex gap-2'>
        <div className='flex flex-col gap-2'>
          <label className='text-[#7B7F8E]'>Street address</label>
          <Input
            name='streetAddress'
            value={userData.streetAddress || ''}
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label className='text-[#7B7F8E]'>City / town</label>
          <Input
            name='city'
            value={userData.city || ''}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Details;
