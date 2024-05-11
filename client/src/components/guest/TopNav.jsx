import React,{ useState, useContext, useEffect } from 'react';
import { axiosClient } from "../../api/axios";
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../contexts/AuthWrapper';
import { TiArrowSortedDown } from "react-icons/ti";
import { LOGIN_LINK } from "../../router/index"
import Loading from "../../pages/loading"
import { 
  Pencil,
  Eye, 
  EyeOff, 
  Heart, 
  Bell, 
  ChevronDown,
  LogOut ,
  LogIn ,
} from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

 

export default function TopNav() {
  const userContext = useContext(authContext);
  const [language, setLanguage] = useState("US");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    email: ""
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);
  const [changePassword, setChangePassword] = useState(false);
  const [passwords, setPasswords] = useState({
    oldPass: "",
    newPass: "",
    confirmNewPass: "",
  });
  const navigate = useNavigate()
  useEffect(()=> {
    if(window.location.pathname === "/home"){
     userContext.getUser();
    }
  },[]);

  useEffect(()=> {
      setData({
          firstName: userContext.user.firstName,
          email: userContext.user.email
      });
  },[userContext.user]);

  useEffect(()=> {
    setPasswords({
      oldPass: "",
      newPass: "",
      confirmNewPass: "",
    });
    setData({
      firstName: userContext.user.firstName,
      email: userContext.user.email
    });
  },[changePassword]);

  const logOut = () => {
    userContext.logout();
    navigate("/signin");
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];

    if (file && allowedTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
      setFile(file);
    } else {
      setSelectedImage(null);
      setFile(null);
      toast.error('Please select a valid PNG, JPEG, or JPG file.');
    }
  };

  const handleUpdateProfile = async () => {
    if (!file) {
      toast.error('Please select a file before uploading.');
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
      toast.success('Image uploaded successfully');
      setSelectedImage(null);
      setFile(null);
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Error uploading image. Please try again later.');
    }
  };

  const handleSubmit = async (e) => {
      setLoading(true)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
          toast.error('Please enter a valid email address.');
          return;
      }
      if (data.firstName.trim() === '') {
          toast.error('Please enter your first name.');
          return;
      }
      if(file){
          handleUpdateProfile();
      }
      if(data.email !== userContext.user.email || data.firstName !== userContext.user.firstName){
          try {
              const response = await axiosClient.post('/user/update', data);
              toast.success('Updated successfully:');
              setData({
                  email: "",
                  firstName: ""
              });
              toast.success('user data updated successfully')
            } catch (error) {
              toast.error('error updating user data. Please try again later.');
            }
      }
      setLoading(false);
      setOpen(false);
  };

  const handleSubmitPasswords = async (e) => {
    setLoading(true);
    if(passwords.oldPass.trim() === "" || passwords.newPass.trim() === "" || passwords.confirmNewPass.trim() === "" ){
      toast.error("all feilds are required")
      setLoading(false);
      return;
    }
    if(passwords.newPass.trim() !== passwords.confirmNewPass.trim()){
      toast.error("Confirm password is wrong, please try again")
      setLoading(false);
      return;
    }
    try {
      const response = await axiosClient.post('/user/update-passwords', passwords);
      
      if(response.status === 200){
        toast.success("password updated successfully");
        setOpen(false);
        setChangePassword(false);
      }else{
        toast.error("somethig went wrong, Please try again later.");
      }
    } catch (error) {
      toast.error('Error updating password. Please try again later.');
    }
    setLoading(false);
  }

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setData({ ...data, [field]: value });
  };
  const handlePassword = (e, field) => {
    const value = e.target.value;
    setPasswords({ ...passwords, [field]: value });
  };
  

 const [ showPass, setShowPass ] = useState(false)
  return (
    <>
      {
        userContext.isFetchingUser ?  <Loading /> :
        <div className="w-full border-b-2 border-gray-100 ">
            <ToastContainer />
        <div className='flex items-center justify-between py-3 px-3 xl:px-0 max-w-6xl  mx-auto'>
            <div className='flex items-center basis-2/3    '> 
                <div className='mr-10 lg:mr-3 text-2xl basis-1/1 lg:w-36 '>
                 <img src="/assets/logo.svg" alt="" className='w-full'/>
                </div>
                <ul className='items-center hidden lg:flex text-md font-small'>
                     <li className='mr-5 text-[#222222] cursor-pointer'><Link to="">Home</Link></li>
                     <li className='mr-5 text-[#222222] cursor-pointer'><Link to="">Explore</Link></li>
                     <li className='mr-5 text-[#222222] cursor-pointer'><Link to="">Nearbly</Link></li>
                </ul>
            </div>
             <div className=' basis-1/3 lg:basis-1/2 flex items-center justify-end'>
                {
                    userContext.isLoggedIn ?
                    <>
                        {
                            (!userContext.user || userContext.user.role == "guest") 
                             &&
                            <div className='ml-4 lg:ml-8 cursor-pointer  text-md 0  mr-5 hidden lg:flex'>
                                <Link to="/signup/host">Become a host</Link>
                            </div>
                        }
                        <div className='text-green-800 cursor-pointer mr-5'>
                            <Bell color='#7065F0' size={23}/>
                        </div>
                        <div className='text-green-800 cursor-pointer mr-5'>
                            <Heart color='#7065F0' size={23} />
                        </div>
                        <div className='w-0 h-7 border-[1px] border-[#A7A3A3] mr-3'></div>
                        <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="w-8 h-8 cursor-pointer">
                                    <AvatarImage src={userContext.user.image?.url} alt="@shadcn"  />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 bg-white">
                                <DropdownMenuLabel>{userContext.user.email}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="p-0" >
                                    <div className='w-full h-full rounded hover:bg-slate-200 py-2 px-3 text-md cursor-pointer' onClick={() => setOpen(true)}>
                                       Profile
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem className=""> 
                                    <div className='w-full h-full bg-black text-white py-2 px-3 flex items-center justify-center gap-2 cursor-pointer' onClick={logOut}>
                                      <LogOut color='white' size={18}/>
                                      <p>logout </p>
                                    </div>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        </div>
                        <div className='ml-4 cursor-pointer  flex'>
                            <DropdownMenu >
                                <DropdownMenuTrigger asChild >
                                <div className='flex items-center text-[#222222] rounded-3xl border-2 border-[#dbd9d9] py-0 px-2 lg:py-1 '>
                                    <p className='text-sm'>{language}</p> 
                                    <ChevronDown color='#222222' size={18}/>
                                </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56 bg-white">
                                    <DropdownMenuRadioGroup value={language} onValueChange={setLanguage}>
                                    <DropdownMenuRadioItem value="FR">french</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="US">english</DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </>
                    :
                    <>
                    <div className='ml-4 cursor-pointer  text-md font-small hidden lg:flex'><Link to="/signup/host">Become a host</Link></div>
                    <div className='ml-4 cursor-pointer  flex'>
                        <DropdownMenu >
                            <DropdownMenuTrigger asChild >
                            <div className='flex items-center text-[#222222] rounded-3xl border-2 border-[#dbd9d9] py-0 px-2 lg:py-1 '>
                                <p className='text-sm'>{language}</p> 
                                <ChevronDown color='#222222' size={18}/>
                            </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 bg-white">
                                <DropdownMenuRadioGroup value={language} onValueChange={setLanguage}>
                                <DropdownMenuRadioItem value="FR">french</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="US">english</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className='ml-4 hidden lg:flex'>
                      <Link to={LOGIN_LINK}>
                        <div className='py-1 px-4 bg-[#7065F0] rounded flex items-center justify-center cursor-pointer'>
                            <p className='mr-2 text-white text-lg font-small'>sign in</p> <LogIn color='white' size={18}/>
                        </div>
                      </Link>
                    </div>
                    </>
                }
               <Sheet>
                <SheetTrigger   asChild>
                    <div className='lg:hidden w-7 cursor-pointer ml-4 '>
                        <img src="/assets/menu.png" alt="" className='w-full'/>
                    </div>
                </SheetTrigger>
                <SheetContent className="bg-white pl-1">
                    <SheetHeader>
                    <SheetTitle className='text-2xl font-semibold pl-3'>Welcome to TripTrove</SheetTitle>
                    <SheetDescription >
                        <div className='flex flex-col  text-md font-small mt-6'>
                            <div className='mr-5 text-[#222222] text-lg cursor-pointer py-3 rounded hover:bg-gray-300 px-3 w-full'><Link to="">Home</Link></div>
                            <div className='mr-5 text-[#222222] text-lg cursor-pointer  py-3 rounded hover:bg-gray-300 px-3 w-full'><Link to="">Explore</Link></div>
                            <div className='mr-5 text-[#222222] text-lg cursor-pointer py-3 rounded hover:bg-gray-300 px-3 w-full'><Link to="">Nearbly</Link></div>
                            <div className='mr-5 text-[#222222] text-lg cursor-pointer py-3 rounded hover:bg-gray-300 px-3 w-full'><Link to="">Become a host </Link></div>
                            {
                              userContext.isLoggedIn ? <></> : 
                              <div className='mr-5 text-[#222222] text-lg cursor-pointer py-3 rounded hover:bg-gray-300 px-3 w-full'>
                                <Link to="/signin">
                                  Sign in  <LogIn color='white' size={18}/>
                                </Link>
                              </div>
                            }
                        </div>
                    </SheetDescription>
                    </SheetHeader>
                </SheetContent>
                </Sheet>
             </div>
        </div>
        <Dialog open={open} onOpenChange={()=>{setOpen(false); setChangePassword(false);}}>
        <DialogContent className="bg-white ">
            <DialogHeader>
            <DialogTitle>Edit your password</DialogTitle>
            </DialogHeader>
            {
              changePassword  
                ? 
              <div className='flex flex-col items-center justify-center w-full relative '>
              <div className='flex-col flex w-full px-5 mb-5'>
                <label htmlFor="oldPass">Old Password</label>
                <div className='w-full relative'>
                  <input 
                    type={showPass ? "text" : "password"}  
                    id="oldPass" 
                    placeholder='Your old password' 
                    value={passwords.oldPass} 
                    className='py-2 pl-5 rounded outline-none border-2 border-gray-300 w-full'
                    onChange={(e) => handlePassword(e, 'oldPass')}
                  />
                  {
                    showPass ? 
                    <div className='absolute right-3 top-3 cursor-pointer' onClick={()=>setShowPass(!showPass)}><EyeOff color='#bfbfbf' /></div>
                    :
                    <div className='absolute right-3 top-3 cursor-pointer' onClick={()=>setShowPass(!showPass)}><Eye color='#bfbfbf' /></div>
                  }
                </div>
              </div>
              <div className='flex-col flex w-full px-5 mb-5'>
                <label htmlFor="newPass">New Password</label>
                <div className='w-full relative'>
                <input 
                  type={showPass ? "text" : "password"}    
                  id="newPass" 
                  placeholder='Your new password' 
                  value={passwords.newPass} 
                  className='py-2 pl-5 rounded outline-none border-2 border-gray-300 w-full'
                  onChange={(e) => handlePassword(e, 'newPass')}
                />
                 {
                    showPass ? 
                    <div className='absolute right-3 top-3 cursor-pointer' onClick={()=>setShowPass(!showPass)}><EyeOff color='#bfbfbf' /></div>
                    :
                    <div className='absolute right-3 top-3 cursor-pointer' onClick={()=>setShowPass(!showPass)}><Eye color='#bfbfbf' /></div>
                  }
                </div>
              </div>
              <div className='flex-col flex w-full px-5 mb-1'>
                <label htmlFor="cNewPass">Confirm New Password</label>
                <div className='w-full relative'>
                <input 
                  type={showPass ? "text" : "password"}    
                  id="cNewPass" 
                  placeholder='Confirm your new password' 
                  value={passwords.confirmNewPass} 
                  className='py-2 pl-5 rounded outline-none border-2 border-gray-300 w-full'
                  onChange={(e) => handlePassword(e, 'confirmNewPass')}
                />
                 {
                    showPass ? 
                    <div className='absolute right-3 top-3 cursor-pointer' onClick={()=>setShowPass(!showPass)}><EyeOff color='#bfbfbf' /></div>
                    :
                    <div className='absolute right-3 top-3 cursor-pointer' onClick={()=>setShowPass(!showPass)}><Eye color='#bfbfbf' /></div>
                  }
                </div>
              </div>
            </div>
              :
              <div className='flex flex-col items-center justify-center w-full relative '>
            <div className='w-36 h-36 relative mb-10'>
                {selectedImage ? (
                    <img src={selectedImage} alt="Selected" className='w-full h-full rounded-full'/>
                ) : (
                    <img src={userContext.user.image?.url} alt="" className='w-full h-full rounded-full'/>
                )}
                <label htmlFor="image" className='w-10 h-10 rounded-full bg-[#000000] absolute bottom-1 right-2 flex items-center justify-center cursor-pointer'>
                    <Pencil color='white' size={20}/>
                    {/* Drag area for uploading */}
                    <input type="file" className='hidden' id="image" accept=".png,.jpg,.jpeg" onChange={handleFileUpload} />
                </label>
            </div>
              <div className='flex-col flex w-full px-5 mb-5'>
                <label htmlFor="name">Full Name</label>
                <input 
                   type="text"  
                   id="name" 
                   placeholder='Full Name' 
                   value={data.firstName} 
                   className='py-2 pl-5 rounded outline-none border-2 border-gray-300'
                   onChange={(e) => handleInputChange(e, 'firstName')}
                />
              </div>
              <div className='flex-col flex w-full px-5 mb-1'>
                <label htmlFor="email">Email</label>
                <input 
                   type="text"  
                   id="email" 
                   placeholder='email' 
                   value={data.email} 
                   className='py-2 pl-5 rounded outline-none border-2 border-gray-300'
                   onChange={(e) => handleInputChange(e, 'email')}
                />
              </div>
              <div className='flex-col flex w-full px-5'>
                <p className='text-sm font-semibold cursor-pointer' onClick={()=>setChangePassword(true)}>change password</p>
              </div>
            </div>
            }
            <DialogFooter className="sm:justify-start px-5 flex">
            <DialogClose asChild>
                <button type="button" variant="secondary" onClick={()=>setOpen(false)} className='basis-1/2 border-2 border-black rounded py-2 '>
                 Close
                </button>
            </DialogClose>
                <button type="button"  className='basis-1/2 text-white bg-black rounded py-2' onClick={!changePassword ? handleSubmit : handleSubmitPasswords}>
                    update
                    { loading
                        && 
                        <div className="inline-block h-5 w-5 ml-3 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                        role="status"></div>
                    }
                </button>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    </div>
      }
    </>
  )
}
