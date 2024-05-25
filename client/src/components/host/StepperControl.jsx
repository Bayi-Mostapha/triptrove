import React from 'react'

const StepperControl = ({handleClick, currentStep, steps}) => {
  return (
    <div className='container flex justify-end gap-2  '>
        {/* back btn */}
        <button
        onClick={() => handleClick()}
        className={`cursor-pointer rounded-xl border-2 border-slate-300 bg-white py-2 px-4 font-semibold uppercase text-slate-400 transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white  ${
          currentStep === 1 ? " cursor-not-allowed opacity-0 " : ""
        }`}
      > 
        Back
        </button>  
              
    {/* next btn */}
    <button 
    onClick={() => handleClick("next")}
    className='bg-[#7065F0] text-white uppercase py-3 px-4 rounded-lg font-semibold cursor-pointer  hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out'> 
        {currentStep === steps.length  ? "Publish" : "Next step"}
        </button>  
    </div>
  )
}

export default StepperControl;