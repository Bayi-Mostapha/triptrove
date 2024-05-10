import React, { useEffect, useState, useContext } from 'react'
import { FcGoogle } from "react-icons/fc"
import { TiArrowSortedDown } from "react-icons/ti";
import { axiosClient } from "../../api/axios"
import { Link, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../../firebase';
import { RESETPASSWORD_LINK, PAYMENT_LINK, REGISTER_LINK } from "../../router/index";
import { authContext } from '../../contexts/AuthWrapper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignIn() {
  const userContext = useContext(authContext);
  const [lang, setLang] = useState("french");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [disabledFlag, setDisabledFlag] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const changeLang = () => {
    if(lang === "french"){
      setLang("english");
    }else{
      setLang("french");
    }
  }
  const sendData = async (formData) => {
    try {
      const { email, password } = formData; 
      const response = await axiosClient.post('http://localhost:5555/admin/signin', { email, password});
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('admin', true);
        userContext.getUser();
        userContext.setIsLoggedIn(true);
        console.log(userContext.user)
       
        return true;
      } else {
        return false;
      }
    } catch (error) {
        return false; 
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    if( formData.email === "" || formData.password === "" ){
      toast.error("all feilds are required")
      setLoading(false);
      return;
    }
    if(formData.password.trim() === "" ){
      toast.error("password is required");
      setLoading(false);
      return;
    }
    const success = await sendData(formData);
    setLoading(false);
    if (success){
     setFormData({
       firstName: "",
       lastName: "",
       email: "",
       password: "",
     });
     navigate("/admin/dashboard");
    } else {
      toast.error("Incorrect credentials");
     setFormData({ ...formData, password: "" })
    }
  }
  useEffect(()=>{
    if(formData.email && formData.password.trim()){
      setDisabledFlag(false);
    }else{
      setDisabledFlag(true);
    }
  },[formData]);
  
  return (
    <div className="max-w-6xl  mx-auto">
      <div className='flex items-center justify-center  p-4'>
      <ToastContainer />
       <div className='basis-2/2 w-full md:basis-1/2 lg:ml-16 flex flex-col lg:mr-10 py-24 lg:pb-0  '>
         <div> 
           <h2 className='text-3xl font-medium mb-4 text-center text-[#7065F0]'>Welcome Admin</h2>
           <div className=' mb-3'>
              <label htmlFor="email" className='block text-[#6d6c6c] text-md mb-1'>email</label>
              <input 
                  type="email" 
                  id="email" 
                  placeholder='example@gmail.com' 
                  className='py-2 pl-5  outline-none border-2 border-gray-200 rounded-xl w-full'
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  value={formData?.email}
              />
           </div>
           <div className='  mb-4'>
              <label htmlFor="password" className='block text-[#6d6c6c] text-md mb-1'>password</label>
              <input 
                  type="password" 
                  id="password" 
                  placeholder='password' 
                  className='py-2 pl-5  outline-none border-2 border-gray-200 rounded-xl w-full'
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  value={formData?.password}
              />
           </div>
           <div className='mb-3'>
              <Link to={RESETPASSWORD_LINK} className='cursor-pointer'>forget password</Link>  
           </div>
           <div className=' mb-4'>
              <button 
              className={`py-3   outline-none text-white text-xl font-medium rounded-xl w-full bg-[#7065F0] ${disabledFlag ? 'cursor-not-allowed opacity-50' : ""}`}
              onClick={handleSubmit}
              disabled={disabledFlag} 
              >
                Sign In
                { loading
                && 
                <div className="inline-block h-5 w-5 ml-3 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                role="status"></div>
              }
                </button>
           </div>
         </div>
       </div>
     </div>
    </div>
  )
}
