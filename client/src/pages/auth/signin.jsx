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

export default function SignUp() {
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
      const response = await axiosClient.post('http://localhost:5555/auth/signin', { email, password});
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        userContext.getUser();
        userContext.setIsLoggedIn(true);
        if(userContext.role === "host"){
          navigate("/pay");
        }else{ 
          navigate("/home");
        }
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
  const handleGoogleClick = async (e) => {
    try {
     e.preventDefault();
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
      
      const splitNames = result.user.displayName.split(" "); 
      const firstName = splitNames[0];
      const lastName = splitNames.slice(1).join(" "); 


      const res = await axiosClient.post('http://localhost:5555/auth/google',{
        firstName: firstName,
        lastName: lastName,
        email: result.user.email,
      });   

      localStorage.setItem('token',res.data.token);
      userContext.getUser();
      userContext.setIsLoggedIn(true);
     
      navigate("/home");
    } catch (error) {
       toast.error('something went wrong');
    }
  };
  return (
    <div className="max-w-6xl  mx-auto">
      <div className='flex items-center justify-center  p-4'>
      <ToastContainer />
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
           <h2 className='text-5xl font-medium mb-4'>Sign in</h2>
           <Link to={"/signup/"+userContext.role} className='flex items-center mb-6'>
             <p  className='text-sm text-gray-500'>don't have an account?</p>
             <p className='ml-1 text-xl font-bold cursor-pointer text-green-700'>Sign up</p>
           </Link>
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
              className={`py-3   outline-none text-white text-xl font-medium rounded-xl w-full bg-green-700 ${disabledFlag ? 'cursor-not-allowed opacity-50' : ""}`}
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
           <div className=''>
              <div  onClick={handleGoogleClick} className='border-2 border-gray-200 rounded-xl flex items-center justify-center py-3 w-full cursor-pointer '>
                <FcGoogle /> 
                <p className='ml-2 text-lg'>Sign In with Google</p>
              </div>
           </div>
         </div>
       </div>
     </div>
    </div>
  )
}
