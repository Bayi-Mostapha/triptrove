import React, { useState, useEffect } from 'react'
import { 
    ChevronsUpDown,
    CalendarDays,
 } from 'lucide-react';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { axiosClient } from "../../api/axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { addDays, format } from "date-fns"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function Users() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchColumn, setSearchColumn] = useState('default');
    const [searchQuery, setSearchQuery] = useState('');
    const [date, setDate] = useState({
        from: new Date(2022, 0, 20),
        to: addDays(new Date(2022, 0, 20), 20),
      })
    // fetch all users 
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosClient.get('/user/get-all');
                setUsers(response.data);
                setFilteredUsers(response.data);
                console.log(response.data)     
            } catch (error) {
                toast.error('Error fetching users');
            }
        };

        fetchUsers();
    }, []);
    useEffect(() => {
        setFilteredUsers(users);
        setSearchQuery("");
    }, [searchColumn]);
    useEffect(() => {
        if (date && date.from !== undefined  && date.to !== undefined) {
            const newUsers = users.filter(user => {
                const joinDate = new Date(user.createdAt);
                const startDate = new Date(date.from);
                const endDate = new Date(date.to);
                return joinDate >= startDate && joinDate <= endDate;
            });
            setFilteredUsers(newUsers);
        } else {
            // If either startDate or endDate is not set, reset filteredUsers to all users
            setFilteredUsers(users);
        }
    },[date]);


    const handleSearchColumnChange = (e) => {
        setSearchColumn(e.target.value);
    };

    const handleSearchQueryChange = (e) => {
        setSearchQuery(e.target.value);
   
       
    };
  useEffect(()=>{
    const newUsers = users.filter(user => {
        if (searchColumn === 'username') {
            return (user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) || user.lastName.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        if (searchColumn === 'email') {
            return user.email.toLowerCase().includes(searchQuery.toLowerCase());
        }
        if (searchColumn === 'joinDate') {
            // Assuming `createdAt` is a Date object
            const joinDate = new Date(user.createdAt);
            const startDate = new Date(searchQuery.startDate);
            const endDate = new Date(searchQuery.endDate);
    
            // Check if the user's join date is within the selected range
            return joinDate >= startDate && joinDate <= endDate;
        }
        return true;
    });
    setFilteredUsers(newUsers);
  },[searchQuery])


  return (
	<div className="flex flex-col">
    <ToastContainer />
    <div className='py-5 flex items-center'>
        <div className='w-48 mr-2'>
        <select
                        id="searchColumn"
                        className="bg-gray-50 border border-gray-300 py-3 text-gray-900 text-sm rounded-lg outline-none  block w-full p-2.5"
                        value={searchColumn}
                        onChange={handleSearchColumnChange}
                    >
                        <option value="default">Choose search column</option>
                        <option value="username">Username</option>
                        <option value="email">Email</option>
                    </select>
        </div>
        {searchColumn === 'joinDate' && (
        <>
       <div >
      <Popover>
        <PopoverTrigger asChild>
          <button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] flex items-center justify-start text-left font-normal border-[1px] border-gray-300 rounded p-2.5 py-2",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarDays className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-white" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
        </>
    )}
    {searchColumn !== 'joinDate' && (
        <div className='w-48 mr-2'>
            <input
                type="text"
                className='w-full py-2 rounded outline-none border-2 border-gray-300 text-md'
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchQueryChange}
            />
        </div>
    )}
       
    </div>
    <div className="overflow-x-auto  sm:rounded-lg">
        <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
                <table className="min-w-full divide-y divide-gray-200  ">
                    <thead className="bg-[#7065F0] ">
                        <tr>
                            <th className="p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-all" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label for="checkbox-all" className="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th className="py-3 px-6 text-sm font-small  text-gray-700">
                               <div className='flex items-center cursor-pointer'> 
                                    <p className='mr-2 text-[#ffffff]'>Profile Image</p> 
                                </div>
                            </th>
                            <th className="py-3 px-6 text-sm font-small  text-gray-700">
                               <div className='flex items-center cursor-pointer'> 
                                    <p className='mr-2 text-[#ffffff] '>UserName</p> 
                                    <ChevronsUpDown size={18} color='#ffffff' />
                                </div>
                            </th>
                            <th className="py-3 px-6 text-sm font-small  text-left text-gray-700">
                                <div className='flex items-center cursor-pointer'> 
                                    <p className='mr-2 text-[#ffffff] '>Email</p> 
                                    <ChevronsUpDown size={18} color='#ffffff' />
                                </div>
                            </th>
                            <th className="py-3 px-6 text-sm font-small  text-left text-gray-700">
                                <div className='flex items-center cursor-pointer'> 
                                    <p className='mr-2 text-[#ffffff]' >role</p> 
                                </div>
                            </th>
                            <th className="py-3 px-6 text-sm font-small  text-left text-gray-700">
                                <div className='flex items-center cursor-pointer'> 
                                    <p className='mr-2 text-[#ffffff] '>join at</p> 
                                    <ChevronsUpDown size={18} color='#ffffff' />
                                </div>
                            </th>
                            <th className="p-4">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white   dark:bg-gray-800 dark:divide-gray-700">
                        {filteredUsers.map(user => (
                       <tr className="hover:bg-[#cfcce6] dark:hover:bg-gray-700" key={user._id}>
                       <td className="p-3 w-4">
                           <div className="flex items-center">
                               <input id="checkbox-table-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                               <label for="checkbox-table-1" className="sr-only"></label>
                           </div>
                       </td>
                       <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                           <Avatar className="w-10 h-10 cursor-pointer">
                               <AvatarImage src="/assets/profile.jpg" alt="@shadcn"  />
                               <AvatarFallback>CN</AvatarFallback>
                           </Avatar>
                       </td>
                       <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.firstName} {user.lastName}</td>
                       <td className="py-3 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">{user.email}</td>
                       <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.role}</td>
                       <td className="py-3 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">{user.createdAt}</td>
                       <td className="py-3 px-6 text-sm font-medium text-right whitespace-nowrap cursor-pointer mr-12">
                           Edit
                       </td>
                   </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

	

  )
}



