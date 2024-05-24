import React, { useContext } from 'react';
import { StepperContext } from '@/contexts/StepperContext';

function Price() {
    const { userData, updateUserData } = useContext(StepperContext);

    const handleChange = (event) => {
        const newPrice = parseFloat(event.target.value) || 0;
        updateUserData({ price: newPrice });
    };

    const feePercentage = 5; // Fee percentage

    const calculateEarnings = (price, feePercentage) => {
        return price - (price * feePercentage / 100);
    };

    const earnings = calculateEarnings(userData.price, feePercentage);

    return (
        <div className='flex flex-col justify-center items-center p-4'>
            <div className='text-center mb-4'>
                <h1 className='text-[#222222] text-3xl font-medium'>Now, set your price</h1>
                <h2 className='text-[#6A6A73]'>You can change it anytime</h2>
            </div>
            <div className='flex flex-col items-center mb-4'>
                <div className='flex items-center'>
                    <span className='text-4xl'>MAD</span>
                    <input
                        type='number'
                        value={userData.price}
                        onChange={handleChange}
                        className='text-4xl font-medium w-24 text-center border-b-2 border-gray-400 focus:outline-none'
                        min="0"
                        step="0.01"
                    />
                </div>
                <div className='flex flex-col items-center border rounded p-4 mt-4 w-80'>
                    <div className='flex justify-between w-full mb-2'>
                        <span className='text-gray-500'>Base price</span>
                        <span className='font-medium'>MAD {userData.price.toFixed(2)}</span>
                    </div>
                    <div className='flex justify-between w-full mb-2'>
                        <span className='text-gray-500'>Our fees</span>
                        <span className='font-medium'>{feePercentage}%</span>
                    </div>
                    <div className='flex justify-between w-full mt-4 pt-2 border-t'>
                        <span className='font-medium'>You earn</span>
                        <span className='font-medium'>MAD {earnings.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Price;
