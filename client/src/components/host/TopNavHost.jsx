import React, { useState, useContext, useEffect } from 'react';
import io from 'socket.io-client';
import { axiosClient } from '../../api/axios';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../contexts/AuthWrapper';
import { LOGIN_LINK } from "../../router/index"
import Loading from "../../pages/loading"
import {
  Pencil,
  Eye,
  EyeOff,
  Heart,
  X,
  Bell,
  ChevronDown,
  LogOut,
  LogIn,
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
const socket = io('http://localhost:5555');




export default function TopNav() {
  const userContext = useContext(authContext);
 
 
  

 
 
  // const [notifications, setNotifications] = useState([]);
  // const getAllNotifications = async () => {
  //   try {
  //     const response = await axiosClient.get('/notification');
  //     setNotifications(response.data);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error)
  //     toast.error('Error getting notifications. Please try again later.');
  //   }
  // };

  // useEffect(() => {
  //   if (userContext.isLoggedIn) {
  //     getAllNotifications();
  //   }
  //   socket.emit('joinRoom', userContext.user?._id);
  //   socket.on('notification', (notification) => {
  //     setNotifications((prevNotifications) => [...prevNotifications, notification.message]);
  //     toast(notification.message.message);
  //     viewNotification(notification.message);
  //   });
  //   return () => {
  //     socket.off('notification');
  //     socket.emit('leaveRoom', userContext.user?._id);
  //   }; 
  // }, [userContext.user]);


  // const viewNotification = async (notification) => {
  //   try {
  //     const response = await axiosClient.post('/notification/read', { notification });
  //     getAllNotifications();
  //     if (notification.link !== null) {
  //       navigate(notification.link)
  //     }
  //   } catch (error) {
  //     toast.error('Error reading notifications. Please try again later.');
  //   }
  // }

  return (
    <div className="flex items-center justify-between w-full max-w-7xl mx-auto h-16">
      <div className='basis-1/3 h-full'>
        <img src="/assets/france.png" alt="logo" className='h-full'/>
      </div>
      <ul className='basis-1/3 flex items-center'>
        <li className='mr-8 text-md text-gray-700'>
          <Link to="/">home</Link>
        </li>
        <li className='mr-8 text-md text-gray-700'>
          <Link to="/">About Us</Link>
        </li>
        <li className='mr-8 text-md text-gray-700'>
          <Link to="/">Services</Link>
        </li>
        <li className='mr-8 text-md text-gray-700'>
          <Link to="/">Contact</Link>
        </li>
      </ul>
    </div>
  )
}
