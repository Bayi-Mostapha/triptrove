import React, { useState } from 'react';
import Stepper from '@/components/host/Stepper';
import StepperControl from '@/components/host/StepperControl';
import { StepperProvider, StepperContext } from '@/contexts/StepperContext';
import Details from '@/components/steps/Details';
import Photos from '@/components/steps/Photos';
import Price from '@/components/steps/Price';
import Additionalinfo from '@/components/steps/Additionalinfo';
import Publish from '@/components/steps/Publish';

export default function Listing() {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    "General Details",
    "Photos",
    "Price",
    "Additional info",
    "Publish",
  ];

  const displayStep = (step) => {
    switch(step) {
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
  }

  const handleClick = (direction) => {
    let newStep = currentStep;
    direction === "next" ? newStep++ : newStep--;
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  return (
    <StepperProvider>
      <h1 className='text-2xl mt-6 font-medium'> List your property</h1>
      <div className='md:w-1/2 mx-auto rounded-2xl pb-2 bg-white'>
        <div className='container horizontal'>
          <Stepper steps={steps} currentStep={currentStep} />
          <div className='p-10'>
            {displayStep(currentStep)}
          </div>
        </div>
        <StepperControl 
          handleClick={handleClick}
          currentStep={currentStep}
          steps={steps}
        />
      </div>
    </StepperProvider>
  );
}
