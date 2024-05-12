import React, { useState, useEffect } from 'react'
 import { 
    Pencil,
    Eye, 
    EyeOff, 
    Heart, 
    Bell, 
    ChevronDown,
    LogOut ,
    LogIn ,
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
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Axios } from 'axios';


export default function Admins() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchColumn, setSearchColumn] = useState('default');
    const [searchQuery, setSearchQuery] = useState('');
    const [date, setDate] = useState();
    const [order, setOrder] = useState({
        username: false ,
        email: false,
        joinDate: false,
        role: false,
    });
    // fetch all users 
    const fetchUsers = async () => {
        try {
            const response = await axiosClient.get('/admin/get-all');
            setUsers(response.data);
            setFilteredUsers(response.data);
            console.log(response.data)     
        } catch (error) {
            toast.error('Error fetching users');
        }
    };
    useEffect(() => {
        fetchUsers();
    }, []);
    const filterUsersFunction = () => {
        if(date && date.from !== undefined  && date.to !== undefined){
            if (searchColumn === 'username') {
                const newUsers = users.filter(user => {
                    const joinDate = new Date(user.createdAt);
                    const startDate = new Date(date.from);
                    const endDate = new Date(date.to);
                    return joinDate >= startDate && joinDate <= endDate && (user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) || user.lastName.toLowerCase().includes(searchQuery.toLowerCase()));
                });
                setFilteredUsers(newUsers);
                return ;
            }
            if (searchColumn === 'email') {
                const newUsers = users.filter(user => {
                    const joinDate = new Date(user.createdAt);
                    const startDate = new Date(date.from);
                    const endDate = new Date(date.to);
                    return joinDate >= startDate && joinDate <= endDate && (user.email.toLowerCase().includes(searchQuery.toLowerCase()));
                });
                setFilteredUsers(newUsers);
                return ;
            }
        }else{
            const newUsers = users.filter(user => {
                if (searchColumn === 'username') {
                    return (user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) || user.lastName.toLowerCase().includes(searchQuery.toLowerCase()));
                }
                if (searchColumn === 'email') {
                    return user.email.toLowerCase().includes(searchQuery.toLowerCase());
                }
                return true;
            });
            setFilteredUsers(newUsers);
        }
         
    }

    const filterUsersByOrder = (str) => {
        let sortedUsers = [];
        if (str === "username") {
            if (!order.username) {
                setOrder({ ...order, username: true });
                sortedUsers = filteredUsers.slice().sort((a, b) => {
                    return b.firstName.localeCompare(a.firstName); 
                });
            } else {
                setOrder({ ...order, username: false });
                sortedUsers = filteredUsers.slice().sort((a, b) => {
                    return a.firstName.localeCompare(b.firstName); 
                });
            }
        } else if (str === "email") {
            if (!order.email) {
                setOrder({ ...order, email: true });
                sortedUsers = filteredUsers.slice().sort((a, b) => {
                    return b.email.localeCompare(a.email); 
                });
            } else {
                setOrder({ ...order, email: false });
                sortedUsers = filteredUsers.slice().sort((a, b) => {
                    return a.email.localeCompare(b.email); 
                });
            }
        } else if (str === "joinDate") {
            sortedUsers = filteredUsers.slice().sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                if (!order.joinDate) {
                    return dateB - dateA; 
                } else {
                    return dateA - dateB; 
                }
            });
            if (!order.joinDate) {
                setOrder({ ...order, joinDate: true });
            } else {
                setOrder({ ...order, joinDate: false });
            }
        }else if (str === "role") {
            if (!order.role) {
                setOrder({ ...order, role: true });
                sortedUsers = filteredUsers.slice().sort((a, b) => {
                    return b.role.localeCompare(a.role); 
                });
            } else {
                setOrder({ ...order, role: false });
                sortedUsers = filteredUsers.slice().sort((a, b) => {
                    return a.role.localeCompare(b.role); 
                });
            }
        }
        setFilteredUsers(sortedUsers);
    };

    useEffect(() => {
        setSearchQuery("");
        filterUsersFunction();
    }, [searchColumn]);
    
    useEffect(() => { 
        filterUsersFunction();
    },[date]);

    const handleSearchColumnChange = (e) => {
        setSearchColumn(e.target.value);
        setSelectedUsers([]);
    };

    const handleSearchQueryChange = (e) => {
        setSearchQuery(e.target.value);
        setSelectedUsers([]);
    };
    useEffect(()=>{ 
        filterUsersFunction();
    },[searchQuery])

    const handleCheckboxChange = (userId) => {
        setSelectedUsers(prevSelectedUsers => {
            if (prevSelectedUsers.includes(userId)) {
                return prevSelectedUsers.filter(id => id !== userId);
            } else {
                return [...prevSelectedUsers, userId];
            }
        });
    };

    const checkAll = () => {
        if (selectedUsers.length === filteredUsers.length) {
            setSelectedUsers([]);
        } else {
            const allUserIds = filteredUsers.map(user => user._id);
            setSelectedUsers(allUserIds);
        }
    };
    const [ showPass, setShowPass ] = useState(false)
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false)
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "",
        cpassword: ""
      });
      const [currentSection, setCurrentSection] = useState(1);
    const handleInputChange = (e, field) => {
        const value = e.target.value;
        setData({ ...data, [field]: value });
      };
      const handleNext = () => {
        setCurrentSection(currentSection + 1);
    };

    const handleBack = () => {
        setCurrentSection(currentSection - 1);
    };
    const submitDataNewAdmin = async () => {
        if (
            data.firstName.trim() === '' ||
            data.lastName.trim() === '' ||
            data.email.trim() === '' ||
            data.role.trim() === '' ||
            data.password.trim() === '' ||
            data.cpassword.trim() === ''
        ) {
            toast.error('All fields are required');
            return;
        }

        if (data.password !== data.cpassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            const response = await axiosClient.post("/admin/create",data);
                toast.success('Admin created successfully');
                setData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    role: '',
                    password: '',
                    cpassword: ''
                });
                setOpen(false);
                fetchUsers();
        } catch (error) {
            toast.error("email already exist");
        }
    };
  return (
	<div className="flex flex-col">
    <ToastContainer />
    <div className='mb-3'>
        <button 
            onClick={
                ()=>{setOpen(true);
                setCurrentSection(1); 
                setData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    role: "",
                    cpassword: ""
                });}
            }
            className='py-2 px-3 rounded-sm bg-black text-white'
        >
            add Admin
        </button>
        <Dialog open={open} onOpenChange={()=>{setOpen(false)}}>
        <DialogContent className="bg-white ">
            <DialogHeader>
            <DialogTitle>Add Admin</DialogTitle>
            </DialogHeader>
              <div className='flex flex-col items-center justify-center w-full relative '>
             { (currentSection === 1) && 
             <>
              <div className='flex-col flex w-full px-5 mb-3'>
              <label htmlFor="name">First Name</label>
              <input 
                 type="text"  
                 id="name" 
                 placeholder='First Name' 
                 value={data.firstName} 
                 className='py-2 pl-5 rounded outline-none border-2 border-gray-300'
                 onChange={(e) => handleInputChange(e, 'firstName')}
              />
            </div>
            <div className='flex-col flex w-full px-5 mb-3'>
              <label htmlFor="name">Last Name</label>
              <input 
                 type="text"  
                 id="name" 
                 placeholder='Last Name' 
                 value={data.lastName} 
                 className='py-2 pl-5 rounded outline-none border-2 border-gray-300'
                 onChange={(e) => handleInputChange(e, 'lastName')}
              />
            </div>
            <div className='flex-col flex w-full px-5 mb-3'>
              <label htmlFor="email">Email</label>
              <input 
                 type="text"  
                 id="email" 
                 placeholder='email'
                 name='role' 
                 value={data.email} 
                 className='py-2 pl-5 rounded outline-none border-2 border-gray-300'
                 onChange={(e) => handleInputChange(e, 'email')}
              />
            </div></>
            }
            {currentSection === 2 && <>
                <div className='gap-4 flex w-full px-5 mb-1'>
                <label htmlFor="admin" className='basis-1/2 bg-gray-100 rounded py-2 px-5'>
                    <input 
                    type="radio"  
                    id="admin" 
                    checked={data.role === "admin"}
                    name='role' 
                    value={"admin"} 
                    className='py-2 pl-5 rounded outline-none border-2 border-gray-300'
                    onChange={(e) => handleInputChange(e, 'role')}
                    /> admin
                </label>
                <label htmlFor="sadmin" className='basis-1/2 bg-gray-100 rounded py-2 px-5'>
                    <input 
                    type="radio"  
                    checked={data.role === "superAdmin"}
                    id="sadmin" 
                    value={"superAdmin"} 
                    className='py-2 pl-5 rounded outline-none border-2 border-gray-300 '
                    onChange={(e) => handleInputChange(e, 'role')}
                    /> super admin
                </label>
              
              </div>
              <div className='flex-col flex w-full px-5 mb-1 relative'>
                <label htmlFor="password">password</label>
                <input 
                   type= {
                    showPass ? "text" : "password" } 
                   id="password" 
                   placeholder='password' 
                   value={data.password} 
                   className='py-2 pl-5 rounded outline-none border-2 border-gray-300'
                   onChange={(e) => handleInputChange(e, 'password')}
                />
                 {
                    showPass ? 
                    <div className='absolute right-3 top-3 cursor-pointer' onClick={()=>setShowPass(!showPass)}><EyeOff color='#bfbfbf' /></div>
                    :
                    <div className='absolute right-3 top-3 cursor-pointer' onClick={()=>setShowPass(!showPass)}><Eye color='#bfbfbf' /></div>
                  }
              </div>
              <div className='flex-col flex w-full px-5 mb-1 relative'>
                <label htmlFor="cpassword">confirm password</label>
                <input 
                   type= {
                    showPass ? "text" : "password" }
                   id="cpassword" 
                   placeholder='confirm password' 
                   value={data.cpassword} 
                   className='py-2 pl-5 rounded outline-none border-2 border-gray-300'
                   onChange={(e) => handleInputChange(e, 'cpassword')}
                />
                 {
                    showPass ? 
                    <div className='absolute right-3 top-3 cursor-pointer' onClick={()=>setShowPass(!showPass)}><EyeOff color='#bfbfbf' /></div>
                    :
                    <div className='absolute right-3 top-3 cursor-pointer' onClick={()=>setShowPass(!showPass)}><Eye color='#bfbfbf' /></div>
                  }
              </div>
            </>}
              
             
            </div>
            
            <DialogFooter className="sm:justify-start px-5 flex">
          
               
            <div className="flex justify-between w-full gap-4">
                {currentSection !== 1 ? (
                    <>
                     <button onClick={handleBack} className="basis-1/2 text-white bg-black rounded py-2">
                        Back
                    </button>
                    <button type="button"  className='basis-1/2 text-white bg-black rounded py-2' onClick={submitDataNewAdmin}>
                    update
                    { loading
                        && 
                        <div className="inline-block h-5 w-5 ml-3 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                        role="status"></div>
                    }
                </button>
                </>

                ) : null}
                {currentSection !== 2 ? (
                  <>
                     <button type="button" variant="secondary" onClick={()=>setOpen(false)} className='basis-1/2 border-2 border-black rounded py-2 '>
                     Close
                    </button>
                    <button onClick={handleNext} className="basis-1/2 text-white bg-black rounded py-2">
                        Next
                    </button>
                  </>
                ) : null}
            </div>

            </DialogFooter>
        </DialogContent>
        </Dialog>
    </div>
    <div className='py-5 flex items-center justify-between'>
        <div className='w-48 mr-2'>
            <select
                id="searchColumn"
                className="bg-gray-50 border border-gray-300 py-3 text-gray-900 text-sm rounded-lg outline-none  block w-full p-2.5"
                value={searchColumn}
                onChange={handleSearchColumnChange}
            >
                <option value="default">Search By</option>
                <option value="username" >Full Name</option>
                <option value="email">Email</option>
            </select>
        </div>
            <div className='w-48 mr-2'>
                <input
                    type="text"
                    className='w-full py-2 rounded outline-none border-2 border-gray-300 text-md'
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearchQueryChange}
                />
            </div>
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
              <span>Pick a range</span>
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
    </div>
    {  selectedUsers.length !== 0
        && 
        <div className='flex items-center justify-end mb-3'>
            <div>
                <button className='bg-red-700 rounded py-2 px-5 text-white'>Delete</button>
            </div>
        </div>
    }
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
                                        checked={selectedUsers.length === filteredUsers.length}
                                        onChange={checkAll}
                                    />
                                    <label for="checkbox-all" className="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th className="py-3 px-6 text-sm font-small  text-gray-700">
                               <div className='flex items-center cursor-pointer' onClick={()=>filterUsersByOrder("firstName")}> 
                                    <p className='mr-2 text-[#ffffff] '>first Name</p> 
                                    <ChevronsUpDown size={18} color='#ffffff' />
                                </div>
                            </th>
                            <th className="py-3 px-6 text-sm font-small  text-gray-700">
                               <div className='flex items-center cursor-pointer' onClick={()=>filterUsersByOrder("lastName")}> 
                                    <p className='mr-2 text-[#ffffff] '>last name</p> 
                                    <ChevronsUpDown size={18} color='#ffffff' />
                                </div>
                            </th>
                            <th className="py-3 px-6 text-sm font-small  text-left text-gray-700">
                                <div className='flex items-center cursor-pointer' onClick={()=>filterUsersByOrder("email")}> 
                                    <p className='mr-2 text-[#ffffff] '>Email</p> 
                                    <ChevronsUpDown size={18} color='#ffffff' />
                                </div>
                            </th>
                            <th className="py-3 px-6 text-sm font-small  text-left text-gray-700">
                                <div className='flex items-center cursor-pointer' onClick={()=>filterUsersByOrder("role")}> 
                                    <p className='mr-2 text-[#ffffff]' >role</p> 
                                    <ChevronsUpDown size={18} color='#ffffff' />
                                </div>
                            </th>
                            <th className="py-3 px-6 text-sm font-small  text-left text-gray-700">
                                <div className='flex items-center cursor-pointer' onClick={()=>filterUsersByOrder("joinDate")}> 
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
                        {filteredUsers?.map(user => (
                       <tr className="hover:bg-[#cfcce6] dark:hover:bg-gray-700" key={user._id}>
                       <td className="p-3 w-4">
                           <div className="flex items-center">
                               <input
                                    id="checkbox-table-1" 
                                    type="checkbox" 
                                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300"
                                    checked={selectedUsers.includes(user._id)} 
                                    onChange={() => handleCheckboxChange(user._id)} 
                               />
                               <label for="checkbox-table-1" className="sr-only"></label>
                           </div>
                       </td>
                       <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.firstName}</td>
                       <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white"> {user.lastName}</td>
                       <td className="py-3 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">{user.email}</td>
                       <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <span className={`py-2 px-3 ${(user.role === "host") ? "bg-red-200 text-red-800" : "bg-green-200 text-green-800" }  rounded-lg`}>
                                {user.role}
                            </span>
                        </td>
                       <td className="py-3 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">{user.createdAt}</td>
                       <td className="py-3  text-sm font-medium text-right whitespace-nowrap cursor-pointer pr-12">
                           Delete
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



