import React, { useState, useEffect } from 'react'
import { ChevronsUpDown } from 'lucide-react';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { axiosClient } from "../../api/axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosClient.get('/user/get-all');
                setUsers(response.data);
                console.log(response.data)     
            } catch (error) {
                toast.error('Error fetching users');
            }
        };

        fetchUsers();
    }, []);
  

  return (
	<div className="flex flex-col">
    <ToastContainer />
    <div className='py-5 flex items-center'>
        <div className='w-48 mr-2'>
        <select id="countries" class="bg-gray-50 border border-gray-300 py-3 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Choose search column</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
        </select>
        </div>
        <div className='w-48 mr-2'>
            <input type="text" className='w-full py-2 rounded outline-none border-2 border-gray-300 text-md' />
        </div>
       
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
                        {users.map(user => (
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
