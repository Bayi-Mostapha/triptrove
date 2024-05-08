import React, { useState } from 'react';
import { axiosClient } from '../../api/axios'; // Import custom Axios instance if needed

export default function Profile() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];

    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setError('');
    } else {
      setFile(null);
      setError('Please select a valid PNG, JPEG, or JPG file.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError('Please select a file before uploading.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axiosClient.post('/user/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      console.log('Image uploaded successfully:', response.data);
      setError('');
      setFile(null);
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Error uploading image. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Upload Profile Image</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".png,.jpg,.jpeg" onChange={handleChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};
