import React, { useState, useContext } from 'react';
import Stepper from '@/components/host/Stepper';
import StepperControl from '@/components/host/StepperControl';
import { StepperProvider, StepperContext } from '@/contexts/StepperContext';
import Details from '@/components/steps/Details';
import Photos from '@/components/steps/Photos';
import Price from '@/components/steps/Price';
import Additionalinfo from '@/components/steps/Additionalinfo';
import Publish from '@/components/steps/Publish';
import { axiosClient } from "../../api/axios"; // Adjust the path as needed
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function ListingComponent() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1);
  const { userData } = useContext(StepperContext); // Access userData from StepperContext

  const steps = [
    "General Details",
    "Photos",
    "Price",
    "Additional info",
    "Publish",
  ];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Details />;
      case 2:
        return <Photos />;
      case 3:
        return <Price />;
      case 4:
        return <Additionalinfo />;
      case 5:
        return <Publish />;
      default:
        return null;
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;
    direction === "next" ? newStep++ : newStep--;
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  const handlePublish = async () => {
    try {
      const response = await axiosClient.post('/properties', userData);
      console.log('Property created successfully:', response.data);
      uploadFiles(response.data._id);
    } catch (error) {
      console.error('Error creating property:', error);
      // Add any error handling
    }
  };
  const uploadFiles = async (id) => {

    const formData = new FormData();
    Array.from(userData.photos).forEach(file => formData.append('image', file));

    try {
      console.log(formData)
      const response = await axiosClient.post(`/properties/images/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Upload successful:', response.data);
      toast.success('created successfully')
      navigate('/listings')
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };
  return (
    <>
      <h1 className='text-2xl mt-6 font-medium'>List your property</h1>
      <div className='md:w-1/2 mx-auto rounded-2xl pb-2 bg-white'>
        <div className='container horizontal'>
          <Stepper steps={steps} currentStep={currentStep} />
          <div className='p-10'>
            {displayStep(currentStep)}
          </div>
        </div>
        <StepperControl
          handleClick={handleClick}
          handlePublish={handlePublish}
          currentStep={currentStep}
          steps={steps}
        />
      </div>
    </>
  );
}

export default function Listing() {
  return (
    <StepperProvider>
      <ListingComponent />
    </StepperProvider>
  );
}
