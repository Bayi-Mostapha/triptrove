import React, { useEffect, useState } from 'react'
import { TiArrowSortedDown } from "react-icons/ti";
import { axiosClient } from "../../api/axios"
import { useNavigate } from 'react-router-dom';
import { LOGIN_LINK } from "../../router/index"


export default function ForgetPassword() {
  const [lang, setLang] = useState("french");
  const [formData, setFormData] = useState({
    email: "",
    code: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState("");
  const [disabledFlag, setDisabledFlag] = useState(true);
  const [loading, setLoading] = useState(false);
  const [codeSend, setCodeSend] = useState(false);
  const [newPass, setNewPass] = useState(false);
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
      const { email } = formData; 
      const response = await axiosClient.post('http://localhost:5555/auth/reset-password', { email });
      if (response.status === 200) {
      
        return true;
      } else {
        console.error("Unexpected response:", response);
        return false;
      }
    } catch (error) {
        return false; 
    }
  };

  const sendCode = async (formData) => {
    try {
      const { email, code } = formData; 
      const response = await axiosClient.post('http://localhost:5555/auth/reset-password-code', { email, code });
      if (response.status === 200) {
      
        return true;
      } else {
        console.error("Unexpected response:", response);
        return false;
      }
    } catch (error) {
        return false; 
    }
  };
  
  const sendNewPass = async (formData) => {
    try {
      const { email, password } = formData; 
      const response = await axiosClient.post('http://localhost:5555/auth/reset-newpassword', { email, password });
      if (response.status === 200) {
        return true;
      } else {
        console.error("Unexpected response:", response);
        return false;
      }
    } catch (error) {
        return false; 
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    if( formData.email === "" ){
      setError("all feilds are required")
      setLoading(false);
      return;
    }
    const success = await sendData(formData);
    setLoading(false);
    if (success){
      setCodeSend(true)
    }else{
      setError("invalid email address")
    }
  }

  const handleReset = async () => {
    setLoading(true);
    setError("");
    if( formData.email === "" || formData.code === "" ){
      setError("all feilds are required")
      setLoading(false);
      return;
    }
    const success = await sendCode(formData);
    setLoading(false);
    setFormData({
      ...formData,
      code: "",
      password: "",
      passwordConfirm: "",
    });
    if (success){
      setNewPass(true);
    }else{
      setError("code or email is incorrect")
    }
  }
  const handleNewPass = async () => {
    setLoading(true);
    setError("");
    if( formData.email === "" ||  formData.password === "" || formData.passwordConfirm === ""){
      setError("all feilds are required")
      setLoading(false);
      return;
    }
    if(  formData.password !==  formData.passwordConfirm ){
      setError("password confirmation is not correct")
      setLoading(false);
      return;
    }
    const success = await sendNewPass(formData);
    setLoading(false);
    setFormData({
      email: "",
      code: "",
      password: "",
      passwordConfirm: "",
    });
    if (success){
      setNewPass(false);
      setCodeSend(false);
      navigate(LOGIN_LINK);
    }else{
      setError("something went wrong ")
    }
  }
  useEffect(()=>{
    if(formData.email){
      setDisabledFlag(false);
    }else{
      setDisabledFlag(true);
    }
  },[formData]);
  
  
  return (
    <div className="max-w-6xl  mx-auto">
    <div className='flex items-center justify-center  p-4'>

     <div className='basis-1/2 w-3/4 lg:h-screen justify-end hidden lg:flex'>
       <div className='relative h-full'>
         <img src="/assets/image1.jpg" alt="" className='h-full rounded-xl '/>
         <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center w-full text-white">
            <h3 className='text-4xl  font-semibold px-12'>Welcome to Hostify</h3>
            <p className='text-sm font-medium '>Take your next travel to onother level</p>
         </div>
       </div>
     </div>

     <div className='basis-2/2 w-full md:basis-1/2 lg:ml-16 flex flex-col lg:mr-10 pb-16 lg:pb-0  '>
       <div> 
       
         <h2 className='text-5xl font-medium mb-4'>Reset Password</h2>
          { 
            error
             && 
            <div className='mb-2 text-red-600 bg-red-200 py-2 px-4 rounded-md'>{error}</div>
          }
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
         { codeSend && !newPass && 
         
         <div className=' mb-3'>
            <label htmlFor="code" className='block text-[#6d6c6c] text-md mb-1'>code</label>
            <input 
                type="Number" 
                id="code" 
                placeholder='ex: 120222' 
                className='py-2 pl-5  outline-none border-2 border-gray-200 rounded-xl w-full'
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                value={formData?.code}
            />
         </div>}
         {
          newPass && 
          <div className=' mb-3'>
            <label htmlFor="password" className='block text-[#6d6c6c] text-md mb-1'>new password</label>
            <input 
                type="password" 
                id="password" 
                placeholder='password' 
                className='py-2 pl-5  outline-none border-2 border-gray-200 rounded-xl w-full'
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                value={formData?.password}
            />
         </div>
         }
         {
          newPass && 
          <div className=' mb-3'>
            <label htmlFor="password2" className='block text-[#6d6c6c] text-md mb-1'>confirm password</label>
            <input 
                type="password" 
                id="password2" 
                placeholder='confirm password' 
                className='py-2 pl-5  outline-none border-2 border-gray-200 rounded-xl w-full'
                onChange={(e) => setFormData({ ...formData, passwordConfirm: e.target.value })}
                value={formData?.passwordConfirm}
            />
         </div>
         }
         <div className=' mb-4'>
            <button 
            className={`py-3   outline-none text-white text-xl font-medium rounded-xl w-full bg-[#7065f0] ${disabledFlag ? 'cursor-not-allowed opacity-50' : ""}`}
            onClick={codeSend  ? newPass ? handleNewPass : handleReset : handleSubmit}
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
