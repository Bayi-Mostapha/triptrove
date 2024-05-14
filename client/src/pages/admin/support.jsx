import React, { useState, useEffect, useContext } from 'react'
import { authContext } from "@/contexts/AuthWrapper";
 import { 
    ChevronsUpDown,
    CalendarDays,
    EllipsisVertical ,
    SquareArrowLeft, 
  } from 'lucide-react';
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
import { axiosClient } from "../../api/axios"
import {  toast } from 'react-toastify';
import { addDays, format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function Support() {
    const userContext = useContext(authContext);
    const [message, setMessage] = useState(null);
    const [problems, setProblems] = useState([]);
    const [filteredProblems, setFilteredProblems] = useState([]);
    const [selectedProblems, setSelectedProblems] = useState([]);
    const [ actualTicket, setActualTicket] = useState(null);
    const [ messages, setMessages] = useState([]);

    const checkAll = () => {
        if (selectedUsers.length === filteredUsers.length) {
            setSelectedUsers([]);
        } else {
            const allUserIds = filteredUsers.map(user => user._id);
            setSelectedUsers(allUserIds);
        }
    };
    
    const handleInputChange = (e, field) => {
        const value = e.target.value;
        setData({ ...data, [field]: value });
    };
  
    const getAllProblems = async () => {
        try {
            const response = await axiosClient.get('/problem/problems');
             setProblems(response.data);
             setFilteredProblems(response.data)
             console.log(response.data)
        } catch (error) {
            console.log(error)
            toast.error('something went wrong when getting tickets');
        }
    };

    useEffect(()=>{
        getAllProblems();
    },[]);
   
    const deleteProblemHandle = async (adminIds) => {
        try {
            const response = await axiosClient.delete('/admin', {
                data: { adminIds } 
            });
            return true;
        } catch (error) {
            return false;
        }
    };

    const handleDelete = (admins) =>{
        if(deleteProblemHandle(admins)){
            toast.success("tickets are deleted");
            fetchUsers();
        }else{
            toast.error('Error deleting tickets');
        }
    }
 
    const handleSetTicket = (id) => {
        problems.forEach(pro => {
            if(pro._id === id){
                setActualTicket(pro);
                setMessages(pro.messages);
            }
        });
    }

    const closeTicket = async (id) => {
        if(!id){
            return;
        }
        try {
            const response = await axiosClient.post(`/problem/${id}/close`);
            getAllProblems();
            setActualTicket(null)
            toast.success("ticket closed successfully");
        } catch (error) {
            console.log(error)
            toast.error('something went wrong when closing ticket');
        }
    }

    const handleMessageChange = (e) => {
        const value = e.target.value;
        setMessage(value);
    };
    const submitMessage = async () => {
        try {
            if(message === "" || message === null){
                toast.error("message is required");
                return ;
            }
            const response = await axiosClient.post(`/problem/${actualTicket._id}/messages`,{
                content: message,
                userType: "admin",
            });
            toast.success("message sent successfully ");
            getAllProblems();
            setMessage(null);
            window.document.getElementById("messageArea").value= "";
        } catch (error) {
            console.log(error)
            toast.error('something went wrong when sending message');
        }
    };
    useEffect(()=>{
        handleSetTicket(actualTicket?._id);
    },[problems]);

  return (
    <div className='flex w-full'>
    {
        actualTicket == null ? 
            <div className="flex flex-col w-full">
                <div className='pb-16'>filteres</div>
                <div className="overflow-x-auto  sm:rounded-lg">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden ">
                            <table className="min-w-full divide-y divide-gray-200  ">
                                <thead className="bg-[#7065F0] ">
                                    <tr>
                                        <th className="p-4">
                                            <div className="flex items-center">
                                                <input 
                                                id="checkbox-all" 
                                                type="checkbox" 
                                                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300"
                                                checked={problems.length === filteredProblems.length}
                                                onChange={checkAll}
                                                />
                                                <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                                            </div>
                                        </th>
                                        <th className="py-3 px-6 text-sm font-small  text-gray-700">
                                            <div className='flex items-center cursor-pointer' > 
                                                <p className='mr-2 text-[#ffffff] '>reported By </p> 
                                                <ChevronsUpDown size={18} color='#ffffff' />
                                            </div>
                                        </th>
                                        <th className="py-3 px-6 text-sm font-small  text-gray-700">
                                            <div className='flex items-center cursor-pointer' > 
                                                <p className='mr-2 text-[#ffffff] '>category</p> 
                                                <ChevronsUpDown size={18} color='#ffffff' />
                                            </div>
                                        </th>
                                        <th className="py-3 px-6 text-sm font-small  text-left text-gray-700">
                                            <div className='flex items-center cursor-pointer' > 
                                                <p className='mr-2 text-[#ffffff] '>description</p> 
                                                <ChevronsUpDown size={18} color='#ffffff' />
                                            </div>
                                        </th>
                                        <th className="py-3 px-6 text-sm font-small  text-left text-gray-700">
                                            <div className='flex items-center cursor-pointer' > 
                                                <p className='mr-2 text-[#ffffff]' >status</p> 
                                                <ChevronsUpDown size={18} color='#ffffff' />
                                            </div>
                                        </th>
                                        <th className="py-3 px-6 text-sm font-small  text-left text-gray-700">
                                            <div className='flex items-center cursor-pointer' > 
                                                <p className='mr-2 text-[#ffffff] '>created at</p> 
                                                <ChevronsUpDown size={18} color='#ffffff' />
                                            </div>
                                        </th>
                                        <th className="p-4">
                                        <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white   dark:bg-gray-800 dark:divide-gray-700">
                                {filteredProblems?.map(problem => (
                                    <tr className="hover:bg-[#cfcce6] dark:hover:bg-gray-700   w-24 max-h-32 " key={problem._id}>
                                        <td className="p-3 w-4">
                                            <div className="flex items-center">
                                                <input
                                                id="checkbox-table-1" 
                                                type="checkbox" 
                                                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300"
                                                checked={selectedProblems.includes(problem._id)} 
                                                onChange={() => handleCheckboxChange(problem._id)} 
                                                />
                                                <label htmlFor="checkbox-table-1" className="sr-only"></label>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{problem.user?.email}</td>
                                        <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white"> {problem.category}</td>
                                        <td className="py-3 px-6 text-sm font-medium text-gray-500  ">{problem.title}</td>
                                        <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <span className={`py-2 px-3 ${(problem.status === "close") ? "bg-red-200 text-red-800" : "bg-green-200 text-green-800" }  rounded-lg`}>
                                                {problem.status}
                                             </span>
                                        </td>
                                        <td className="py-3 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">{problem.createdAt}</td>
                                        <td 
                                            className="py-3  text-sm font-medium text-right whitespace-nowrap cursor-pointer pr-12"
                                            >
                                            <DropdownMenu >
                                            <DropdownMenuTrigger asChild >
                                            <EllipsisVertical />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-42 bg-white">
                                            <DropdownMenuItem className="p-0" >
                                            <div className='w-full h-full rounded hover:bg-slate-200 py-2 px-3 text-md cursor-pointer' onClick={()=>handleSetTicket(problem._id)}>
                                            view ticket
                                            </div>
                                            </DropdownMenuItem>
                                            {
                                            problem.status === "open" && 
                                            <DropdownMenuItem className="p-0"> 
                                            <div className='w-full h-full rounded hover:bg-slate-200 py-2 px-3 text-md cursor-pointer'  onClick={()=>{closeTicket(problem._id)}} >
                                            close ticket
                                            </div>
                                            </DropdownMenuItem>
                                            }
                                            </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    </div>
            </div>
:
    <div className='w-full pt-4'>
        <div className='pb-2 c'>
            <div className='cursor-pointer' onClick={()=> setActualTicket(null)}>
                <SquareArrowLeft size={30} />
            </div>
        </div>
        <div className='flex flex-col rounded bg-violet-100 w-full py-5 px-7 mb-4 min-h-screen'> 
          <div className="flex item-center justify-between">
            <h3 className='text-3xl font-medium  mb-3 text-violet-950'>Ticket: {actualTicket.title}</h3>
            {
                actualTicket.status === "open" && 
                <button className='rounded py-1 px-4 bg-[#371250] text-white text-md' onClick={()=>{closeTicket(actualTicket._id)}}>Close ticket</button>
            }
            </div>
          <p className='text-sm text-gray-700 mb-1'>Description: {actualTicket.description}</p>
          <p className='text-sm text-gray-700 mb-1'>Submitted By:{actualTicket.user.fullName}</p>
          <p className='text-sm text-gray-700 mb-1'>Date: {actualTicket.createdAt}</p>
           <div className="border-b-[1px] border-[#e0e0e0] w-full mt-6"></div>
           <div className='flex flex-col gap-4 py-5  w-full '>
              {
                messages.map((msg, index)=>(
                <div className='flex flex-col w-full' key={index}>
                    <p className='ml-3'>{msg.content }</p>
                </div>
                ))
              }
           </div>
            {
                actualTicket.status === "open" &&
                <div className="w-full  p-3">
                    <div className='relative '>
                        <textarea  id="messageArea" onChange={(e)=>handleMessageChange(e)}  className="rounded w-full py-4 px-5 pr-24 outline-none border-[1px] border-gray-300 min-h-24" placeholder='answer ticket'></textarea>
                        <button className='absolute top-2 right-3 py-2 px-5 bg-black text-white rounded' onClick={submitMessage}>send</button>
                    </div>
                </div>
            }
        </div>
    </div>
    }
     </div>
  )
}




