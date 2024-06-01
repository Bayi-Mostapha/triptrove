import React, { useState, useContext, useEffect } from 'react';
import { axiosClient } from '@/api/axios';
import { StepperContext } from '@/contexts/StepperContext';
import { CircleCheckBig } from 'lucide-react';
export default function Photos() {
  const { userData, updateUserData } = useContext(StepperContext);
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const handleFiles = () => {
    if (files.length < 3) {
      alert('Please select at least 3 photos.');
    } else{
      updateUserData({ photos: files });
    }
  };
 useEffect(()=>{
  if (files.length !== 0 ) {
    handleFiles();
  }
 },[files]);
 

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
    const selectedFiles = Array.from(e.dataTransfer.files);
    setFiles(selectedFiles)
   
  };

  const handleChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles)
   
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
          <CircleCheckBig size={70} color='green'/>
          {/* {userData.photos.map((fileURL, index) => (
            <img
              key={index}
              src={fileURL}
              alt={`Preview ${index}`}
              className="h-[100px] w-[100px] m-2 rounded-md object-cover"
            />
          ))} */}
        </div>
      )}
    </div>
  );
}
