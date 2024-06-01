import React from 'react';

const StepperControl = ({ loading, handleClick, handlePublish, currentStep, steps }) => {
  const isLastStep = currentStep === steps.length;

  const handleButtonClick = () => {
    if (isLastStep) {
      handlePublish();
    } else {
      handleClick('next');
    }
  };

  return (
    <div className='container flex justify-end gap-2'>
      {/* Back Button */}
      <button
        onClick={() => handleClick()}
        className={`cursor-pointer rounded-xl border-2 border-slate-300 bg-white py-2 px-4 font-semibold uppercase text-slate-400 transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white ${currentStep === 1 ? "cursor-not-allowed opacity-50" : ""}`}
        disabled={currentStep === 1}
      >
        Back
      </button>

      {/* Next / Publish Button */}
      <button
        disabled={loading}
        onClick={handleButtonClick}
        className='bg-[#7065F0] text-white uppercase py-3 px-4 rounded-lg font-semibold cursor-pointer hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out disabled:opacity-60 disabled:hover:cursor-not-allowed'
      >
        {isLastStep ? "Publish" : "Next Step"}
      </button>
    </div>
  );
}

export default StepperControl;
