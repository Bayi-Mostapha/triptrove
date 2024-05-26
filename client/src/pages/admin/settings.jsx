import React, { useState } from 'react';
import { axiosClient } from '../../api/axios'; // Assuming you're using axios for API requests
import {  toast } from 'react-toastify';


export default function Settings() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });

  };

  const handleUpdate = async () => {
    const { firstName, lastName, email, currentPassword, newPassword, confirmPassword } = formData;
    if ((currentPassword !== '') && (newPassword !== confirmPassword || newPassword == "")) {
      toast.error('New password and confirm password do not match');
      return;
    }

    try {
      const response = await axiosClient.put('/admin', {
        firstName,
        lastName,
        email,
        currentPassword,
        newPassword
      });
      console.log(response.data);
      toast.success('Profile updated successfully');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error(error);
      toast.error('something went wrong');
    }
  };

  return (
    <div className='flex flex-col pt-28 pl-24 p-3 pr-5 px-10'>
        <div className="w-full flex items-center justify-between mb-24">
          <h4 className='text-4xl font-semibold text-[#141414]'>Setting</h4>
          <button 
            onClick={handleUpdate}
            className='py-2 px-3 rounded-sm bg-black text-white'
          >
            Update
          </button>
        </div>
        <div>
          <div className='flex flex-col'>
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
              <div className='w-full mb-3 lg:mb-0 lg:mr-6'>
                  <label htmlFor="firstName" className='block text-[#6d6c6c] text-md mb-1'>First Name</label>
                  <input 
                      type="text" 
                      id="firstName" 
                      placeholder='First Name' 
                      className='py-2 pl-5 w-full outline-none border-2 border-gray-200 rounded-xl'
                      value={formData.firstName}
                      onChange={handleChange}
                  />
              </div>
              <div className='w-full mb-3 lg:mb-0 lg:mr-6'>
                  <label htmlFor="lastName" className='block text-[#6d6c6c] text-md mb-1'>Last Name</label>
                  <input 
                      type="text" 
                      id="lastName" 
                      placeholder='Last Name' 
                      className='py-2 pl-5 w-full outline-none border-2 border-gray-200 rounded-xl'
                      value={formData.lastName}
                      onChange={handleChange}
                  />
              </div>
            </div>
            <div className="flex items-center flex-col md:flex-row justify-between mt-10 gap-3">
              <div className='w-full mb-3 lg:mb-0 lg:mr-6'>
                  <label htmlFor="email" className='block text-[#6d6c6c] text-md mb-1'>Email</label>
                  <input 
                      type="text" 
                      id="email" 
                      placeholder='Email' 
                      className='py-2 pl-5 w-full outline-none border-2 border-gray-200 rounded-xl'
                      value={formData.email}
                      onChange={handleChange}
                  />
              </div>
              <div className='w-full mb-3 lg:mb-0 lg:mr-6'>
                  <label htmlFor="currentPassword" className='block text-[#6d6c6c] text-md mb-1'>Current Password</label>
                  <input 
                      type="password" 
                      id="currentPassword" 
                      placeholder='Current Password' 
                      className='py-2 pl-5 w-full outline-none border-2 border-gray-200 rounded-xl'
                      value={formData.currentPassword}
                      onChange={handleChange}
                  />
              </div>
            </div>
            <div className="flex items-center flex-col md:flex-row justify-between mt-10 ">
              <div className='w-full mb-3 lg:mb-0 lg:mr-6'>
                  <label htmlFor="newPassword" className='block text-[#6d6c6c] text-md mb-1'>New Password</label>
                  <input 
                      type="password" 
                      id="newPassword" 
                      placeholder='New Password' 
                      className='py-2 pl-5 w-full outline-none border-2 border-gray-200 rounded-xl'
                      value={formData.newPassword}
                      onChange={handleChange}
                  />
              </div>
              <div className='w-full mb-3 lg:mb-0 lg:mr-6'>
                  <label htmlFor="confirmPassword" className='block text-[#6d6c6c] text-md mb-1'>Confirm Password</label>
                  <input 
                      type="password" 
                      id="confirmPassword" 
                      placeholder='Confirm Password' 
                      className='py-2 pl-5 w-full outline-none border-2 border-gray-200 rounded-xl'
                      value={formData.confirmPassword}
                      onChange={handleChange}
                  />
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
