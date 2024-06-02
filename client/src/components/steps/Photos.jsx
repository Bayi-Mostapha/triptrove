import React, { useState, useContext, useEffect } from 'react';
import { axiosClient } from '@/api/axios';
import { StepperContext } from '@/contexts/StepperContext';
import { CircleCheckBig } from 'lucide-react';
export default function Photos() {
  const { userData, updateUserData } = useContext(StepperContext);
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleFiles = () => {
    if (files.length < 3) {
      alert('Please select at least 3 photos.');
    } else {
      updateUserData({ photos: files });
      console.log(files);
    }
  };
  useEffect(() => {
    if (files.length !== 0) {
      handleFiles();
    }
  }, [files]);


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

  const displayImages = () => {
    let promises = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      const file = files[i];

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

    return imagePreviews.splice(0, 6).map((fileURL, index) => (
      <img
        key={index}
        src={fileURL}
        alt={`Preview ${index}`}
        className="h-[100px] w-[100px] m-2 rounded-md object-cover"
      />
    ));
  };

  return (
    <div
      className={`border p-4 w-full rounded-xl flex items-center justify-center ${isDragging ? 'bg-gray-200' : ''}`}
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
        <div className='flex flex-col items-center'>
          <CircleCheckBig size={60} color='green' />
          <p className='text-green-800 font-medium mb-4'>Images selected</p>
          <div className="grid grid-cols-3 gap-2">
            {
              displayImages()
            }
          </div>
        </div>
      )}
    </div>
  );
}
