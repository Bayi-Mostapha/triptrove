import React from 'react'
import { FcGoogle } from "react-icons/fc"

export default function SignUp() {
  return (
    <div className="max-w-6xl bg-red-400 mx-auto">
      <div className='flex items-center justify-center h-screen p-4'>

       <div className='basis-1/2 h-full flex justify-end '>
         <div className='relative h-full'>
           <img src="/assets/image1.jpg" alt="" className='h-full rounded-xl '/>
           <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center w-full text-white">
              <h3 className='text-4xl  font-semibold px-12'>Welcome to Hostify</h3>
              <p className='text-sm font-medium '>Take your next travel to onather level</p>
           </div>
         </div>
       </div>

       <div className='basis-1/2 ml-16 flex flex-col'>
         <div> 
          <div>
            <p className='cursor-pointer'>
              french f
            </p>
          </div>
           <h2 className='text-4xl font-semibold '>Sign Up</h2>
           <div>
             <p>Already have an account?</p>
             <p>sign In</p>
           </div>
           <div>
              <div>
                <label htmlFor="fname">First Name</label>
                <input type="text" id="fname" placeholder='First Name'/>
              </div>
              <div>
                <label htmlFor="lname">Last Name</label>
                <input type="text" id="lname" placeholder='last Name'/>
              </div>
           </div>
           <div>
              <label htmlFor="email">email</label>
              <input type="email" id="email" placeholder='example@gmail.com'/>
           </div>
           <div>
              <label htmlFor="password">password</label>
              <input type="password" id="password" placeholder='password'/>
           </div>
           <div>
              <button>Sign Up</button>
           </div>
           <div>
              <button><FcGoogle /> Sign Up with google</button>
           </div>
         </div>
       </div>
     </div>
    </div>
  )
}
