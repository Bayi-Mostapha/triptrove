import React,{ useState, useContext, useEffect } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuItem,
  } from "@/components/ui/dropdown-menu"
import { Link } from 'react-router-dom';
import { authContext } from '../../contexts/AuthWrapper';
import { TiArrowSortedDown } from "react-icons/ti";
import { LOGIN_LINK } from "../../router/index"
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineFavoriteBorder } from "react-icons/md";
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
 import Loading from "../../pages/loading"

export default function TopNav() {
    const userContext = useContext(authContext);
    const [language, setLanguage] = useState("US");
    // useEffect(()=> {
    //  userContext.getUser();
    // },[]);
    const logOut = () => {
     userContext.logout();
    };
  return (
    <>
      {
        userContext.isFetchingUser ?  <Loading /> :
        <div className="w-full border-b-2 border-gray-100 ">
        <div className='flex items-center justify-between py-3 px-3 xl:px-0 max-w-6xl  mx-auto'>
            <div className='flex items-center basis-1/2  w-full'> 
                <div className='mr-10 lg:mr-3 text-2xl w-full lg:w-36 '>
                 <img src="/assets/logo.svg" alt="" className='w-full'/>
                </div>
                <ul className='items-center hidden lg:flex text-md font-small'>
                     <li className='mr-5 text-[#222222] cursor-pointer'><Link to="">Home</Link></li>
                     <li className='mr-5 text-[#222222] cursor-pointer'><Link to="">Explore</Link></li>
                     <li className='mr-5 text-[#222222] cursor-pointer'><Link to="">Nearbly</Link></li>
                </ul>
            </div>
             <div className='w-full basis-1/2 flex items-center justify-end'>
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
                            <IoNotificationsOutline className=''/>
                        </div>
                        <div className='text-green-800 cursor-pointer mr-5'>
                            <MdOutlineFavoriteBorder className=''/>
                        </div>
                        <div className='w-0 h-7 border-[1px] border-[#A7A3A3] mr-3'></div>
                        <div>
                        
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src={userContext.user.image.url} alt="@shadcn"  />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 bg-white">
                                <DropdownMenuLabel>{userContext.user.email}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="p-0" >
                                    <div className='w-full h-full rounded hover:bg-slate-200 py-2 px-3 text-md cursor-pointer'> Profile</div>
                                </DropdownMenuItem>
                                <DropdownMenuItem className=""> 
                                    <button className='w-full h-full bg-black text-white py-2 px-3' onClick={logOut}>
                                    log out
                                    </button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        </div>
                        <div className='ml-4 cursor-pointer  flex'>
                            <DropdownMenu >
                                <DropdownMenuTrigger asChild >
                                <div className='flex items-center text-[#222222] rounded-3xl border-2 border-[#dbd9d9] py-1 px-4'>
                                    <p className='text-sm'>{language}</p> 
                                    <TiArrowSortedDown/>
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
                            <div className='flex items-center text-[#222222] rounded-3xl border-2 border-[#dbd9d9] py-1 px-4'>
                                <p className='text-sm'>{language}</p> 
                                <TiArrowSortedDown/>
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
                    <div className='ml-4'><button className='py-2 px-5 bg-[#7065F0] text-white text-lg rounded hidden lg:flex'><Link to={LOGIN_LINK}>sign in</Link></button></div>
                    </>
                }
              
               <Sheet>
                <SheetTrigger   asChild>
                    <div className='lg:hidden w-7 cursor-pointer ml-4'>
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
                        </div>
                    </SheetDescription>
                    </SheetHeader>
                </SheetContent>
                </Sheet>

             </div>
        </div>
    </div>
      }
    </>
  )
}
