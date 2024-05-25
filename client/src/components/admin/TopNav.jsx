import io from 'socket.io-client';
import { authContext } from "@/contexts/AuthWrapper";
import { useContext, useEffect, useState } from "react";
import 
{ 
    Bell ,
    X,
 } from 'lucide-react';
 import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuItem,
  } from "@/components/ui/dropdown-menu";
  import { 
    LogOut 
  } from 'lucide-react';
  const socket = io('http://localhost:5555');
  import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { axiosClient } from '../../api/axios'; 



export default function TopNav() {
    const userContext = useContext(authContext);
   
    const logOut = () => {
        userContext.logout();
        navigate("/admin/signin");
    };
    const [ notifications , setNotifications ] = useState([]);
    const getAllNotifications = async () => {
      try {
        const response = await axiosClient.get('/notification/admin');
        setNotifications(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error)
        toast.error('Error getting notifications. Please try again later.');
      }
    };
    
    useEffect(() => {
        getAllNotifications();
        socket.emit('joinRoom', userContext.user._id); 
        socket.on('notification', (notification) => {
            setNotifications((prevNotifications) => [...prevNotifications, notification.message]);
            toast(notification.message.message);
            viewNotification(notification.message);
        });
        return () => {
          socket.off('notification');
          socket.emit('leaveRoom', userContext.user._id);
        };
      }, [userContext.user]);
   
  
   const viewNotification =  async (notification) =>{
    try {
      const response = await axiosClient.post('/notification/read',{notification});
      getAllNotifications();
      if(notification.link !== null){
        navigate(notification.link)
      }
    } catch (error) {
      toast.error('Error reading notifications. Please try again later.');
    }
   }
  return (
    <header >
    <nav className="fixed top-0 left-0 right-0 z-10 pl-6 pr-16 py-3 flex items-center  justify-end border-b-[1px] border-gray-100 shadow-sm bg-white">
        <div className="mr-6 cursor-pointer relative py-1">
        <DropdownMenu >
                <DropdownMenuTrigger asChild >
                 <div className="relative flex items-center justify-between "> 
                    {
                      notifications.length != 0 
                        && 
                        <div className="w-2 h-2 bg-red-500 absolute top-1 right-1 rounded-full"></div>} 
                    <Bell color="#000000" />
                 </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-72 bg-white">
                   {
                    notifications && 
                      notifications?.map((notification)=>(
                        <DropdownMenuItem >
                        <div className='flex items-center justify-between w-full' onClick={()=>viewNotification(notification)}>
                         <p>{notification.message}</p>
                         <div className="cursor-pointer"><X /></div>
                        </div>
                     </DropdownMenuItem>
                      ))
                   }
                   {
                    notifications.length == 0 && 
                      
                        <DropdownMenuItem >
                        <div className='flex items-center justify-between w-full'>
                          <p>no notifications yet </p>
                        </div>
                     </DropdownMenuItem>
                   }
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="w-10 h-10 cursor-pointer">
                    <AvatarImage src={userContext.user.image?.url} alt="@shadcn"  />
                    <AvatarFallback className="bg-[#bdbbdb]">{userContext.user.firstName?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white">
                <DropdownMenuLabel>{userContext.user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="p-0"> 
                    <div className='w-full h-full bg-black text-white py-2 px-3 flex items-center justify-center gap-2 cursor-pointer' onClick={logOut}>
                        <LogOut color='white' size={18}/>
                        <p>logout </p>
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </nav >
</header>
  )
}
