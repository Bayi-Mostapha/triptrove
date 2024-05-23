import React, { useState, useContext } from 'react';
import { axiosClient } from '@/api/axios';
import { StepperContext } from '@/contexts/StepperContext';

export default function Photos() {
  const { userData, setUserData } = useContext(StepperContext);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (files) => {
    if (files.length >= 3) {
      const fileURLs = files.map(file => URL.createObjectURL(file));
      setUserData({ ...userData, photos: fileURLs });
      // Perform the upload here
      uploadFiles(files);
    } else {
      alert('Please select at least 3 photos.');
    }
  };

  const uploadFiles = async (files) => {
    const formData = new FormData();
    files.forEach(file => formData.append('photos', file));

    try {
      const response = await axiosClient.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Upload successful:', response.data);
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  const handleClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  return (
    <div
      className={`border h-[300px] w-full rounded-xl flex items-center justify-center ${isDragging ? 'bg-gray-200' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        id="fileInput"
        type="file"
        multiple
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      {userData.photos?.length === 0 ? (
        <div className='sec1 flex flex-col items-center text-center'>
          <img src="/assets/upload.png" alt="Upload icon" />
          <h1 className='text-2xl text-[#222222] font-medium mt-4'>Drag your photos here</h1>
          <h1 className='text-[#222C37]'>Choose at least 3 photos</h1>
          <h1 className='underline cursor-pointer' onClick={handleClick}>Upload from your device</h1>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center">
          {userData.photos.map((fileURL, index) => (
            <img
              key={index}
              src={fileURL}
              alt={`Preview ${index}`}
              className="h-[100px] w-[100px] m-2 rounded-md object-cover"
            />
          ))}
        </div>
      )}
    </div>
  );
}
