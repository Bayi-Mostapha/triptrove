import React, { useState, useContext, useEffect } from 'react';
import { axiosClient } from '@/api/axios';
import { StepperContext } from '@/contexts/StepperContext';

export default function Photos() {
  const { userData, updateUserData } = useContext(StepperContext);
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const handleFiles = () => {
    if (files.length >= 3) {
      uploadFiles();
    } else {
      alert('Please select at least 3 photos.');
    }
  };

  const uploadFiles = async () => {
    console.log(files)
    const formData = new FormData();
    Array.from(files).forEach(file => formData.append('image', file));

    try {
        console.log(formData)
      const response = await axiosClient.post('/properties/images/6654ae79ddc7d1fe890b1c4e', formData, {
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
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles)
   
  };
  useEffect(()=>{
    handleFiles();
  },[files])
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
