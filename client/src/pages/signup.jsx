import React, { useEffect, useState } from 'react'
import { FcGoogle } from "react-icons/fc"
import { TiArrowSortedDown } from "react-icons/ti";

export default function SignUp() {
  const [lang, setLang] = useState("french");
  const changeLang = () => {
    if(lang === "french"){
      setLang("english");
    }else{
      setLang("french");
    }
  }
  useEffect(()=>{
    console.log(lang);
  },[lang])
  return (
    <div className="max-w-6xl  mx-auto">
      <div className='flex items-center justify-center  p-4'>

       <div className='basis-1/2 w-3/4 lg:h-screen justify-end hidden lg:flex'>
         <div className='relative h-full'>
           <img src="/assets/image1.jpg" alt="" className='h-full rounded-xl '/>
           <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center w-full text-white">
              <h3 className='text-4xl  font-semibold px-12'>Welcome to Hostify</h3>
              <p className='text-sm font-medium '>Take your next travel to onather level</p>
           </div>
         </div>
       </div>

       <div className='basis-2/2 w-full md:basis-1/2 lg:ml-16 flex flex-col lg:mr-10 pb-16 lg:pb-0  '>
         <div> 
          <div className='flex justify-end mb-5 '>
            <div className='flex items-center cursor-pointer' onClick={changeLang}>
              <p className=' text-sm text-gray-700 font-medium'>
                english 
              </p>
              <TiArrowSortedDown  className='text-gray-700'/>
            </div>
          </div>
           <h2 className='text-5xl font-medium mb-4'>Sign up</h2>
           <div className='flex items-center mb-6'>
             <p className='text-sm text-gray-500'>Already have an account?</p>
             <p className='ml-1 text-xl font-bold cursor-pointer text-green-700'>Sign In</p>
           </div>
           <div className='flex flex-col lg:flex-row items-center lg:mb-3'>
              <div className='w-full mb-3 lg:mb-0 lg:mr-6'>
                <label htmlFor="fname" className='block text-[#6d6c6c] text-md mb-1'>First Name</label>
                <input type="text" id="fname" placeholder='First Name' className='py-2 pl-5 w-full outline-none border-2 border-gray-200 rounded-xl'/>
              </div>
              <div className='w-full mb-3 lg:mb-0'>
                <label htmlFor="lname" className='block text-[#6d6c6c] text-md mb-1'>last Name</label>
                <input type="text" id="lname" placeholder='last Name' className='py-2 pl-5 w-full  outline-none border-2 border-gray-200 rounded-xl'/>
              </div>
           </div>
           <div className=' mb-3'>
              <label htmlFor="email" className='block text-[#6d6c6c] text-md mb-1'>email</label>
              <input type="email" id="email" placeholder='example@gmail.com' className='py-2 pl-5  outline-none border-2 border-gray-200 rounded-xl w-full'/>
           </div>
           <div className='  mb-4'>
              <label htmlFor="password" className='block text-[#6d6c6c] text-md mb-1'>password</label>
              <input type="password" id="password" placeholder='password' className='py-2 pl-5  outline-none border-2 border-gray-200 rounded-xl w-full'/>
           </div>
           <div className=' mb-4'>
              <button className='py-3   outline-none text-white text-xl font-medium rounded-xl w-full bg-green-700'>Sign Up</button>
           </div>
           <div className=''>
              <div className='border-2 border-gray-200 rounded-xl flex items-center justify-center py-3 w-full cursor-pointer '>
                <FcGoogle /> 
                <p className='ml-2 text-lg'>Sign Up with Google</p>
              </div>
           </div>
         </div>
       </div>
     </div>
    </div>
  )
}
