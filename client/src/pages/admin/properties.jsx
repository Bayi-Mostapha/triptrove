import React, { useState, useEffect, useContext } from 'react'
import { authContext } from "@/contexts/AuthWrapper";
 import { 
    ChevronsUpDown,
    CalendarDays,
    ChevronDown,
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

export default function Properties() {
    const userContext = useContext(authContext);
    const [message, setMessage] = useState(null);
    const [properties, setproperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [selectedProperties, setSelectedProperties] = useState([]);
    const [ actualTicket, setActualTicket] = useState(null);
    const [ messages, setMessages] = useState([]);

    const checkAll = () => {
        if (selectedProperties.length === filteredProperties.length) {
            setSelectedProperties([]);
        } else {
            const allTicketsId = filteredProperties.map(elem => elem._id);
            setSelectedProperties(allTicketsId);
        }
    };
    
    const handleInputChange = (e, field) => {
        const value = e.target.value;
        setData({ ...data, [field]: value });
    };
  
    const getAllProperties = async () => {
        try {
            const response = await axiosClient.get('/admin/property/get-all');
            setproperties(response.data);
            setFilteredProperties(response.data)
             console.log(response.data)
        } catch (error) {
            console.log(error)
            toast.error('something went wrong when getting properties');
        }
    };

    useEffect(()=>{
        getAllProperties();
    },[]);
   
    const deletePropHandle = async (Ids) => {
        try {
            const response = await axiosClient.delete('/propeties', {
                data: { Ids } 
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

    const handleCheckboxChange = (propId) => {
        setSelectedProperties(prevSelectedProperties => {
            if (prevSelectedProperties.includes(propId)) {
                return prevSelectedProperties.filter(id => id !== propId);
            } else {
                return [...prevSelectedProperties, propId];
            }
        });
    };

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

    const [ filter, setFilter ] = useState("filter by");
    const [date, setDate] = useState();
    const [order, setOrder] = useState({
        category: false ,
        title: false,
        createdAt: false,
        status: false,
        email: false,
    });
   const [ selectedCity , setSelectedCity ] = useState("null");
   const [ selectedType , setSelectedType ] = useState("null");
   const handleSelectChange = (event) => {
    setSelectedCity(event.target.value);
};
   const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
};
    
    const filterProps = () => {
        const today = new Date(); 
        let filtered = properties.slice();
        switch (filter) {
            case "custom":
                if(date && date.from !== undefined  && date.to !== undefined){
                     filtered = filtered.filter(problem => {
                        const joinDate = new Date(problem.createdAt);
                        const startDate = new Date(date.from);
                        const endDate = new Date(date.to);
                        return joinDate >= startDate && joinDate <= endDate ;
                    });
                   
                }
               
                break;
            case "today":
                const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
                 filtered = filtered.filter(problem => {
                    const joinDate = new Date(problem.createdAt);
                    return joinDate >= startOfToday && joinDate < endOfToday;
                });
               
                break;
            case "lastw":
                const startOfLastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
                 filtered = filtered.filter(problem => {
                    const joinDate = new Date(problem.createdAt);
                    return joinDate >= startOfLastWeek && joinDate < today;
                });
              
                break;
            case "lastm":
                const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
                const endOfLastMonth = new Date(startOfLastMonth.getFullYear(), startOfLastMonth.getMonth() + 1 , 1);
                 filtered = filtered.filter(problem => {
                    const joinDate = new Date(problem.createdAt);
                    return joinDate >= startOfLastMonth && joinDate <= endOfLastMonth;
                });
               
                break;
            default:
                break;
        }
        if (selectedCity !== "null") {
            filtered = filtered.filter(property => property.city.toLowerCase().includes(selectedCity.toLowerCase()));
        }
        if (selectedType !== "null") {
            filtered = filtered.filter(property => property.Type.toLowerCase().includes(selectedType.toLowerCase()));
        }
        
        setFilteredProperties(filtered);
    }
    const filterPropertiesByOrder = (str) => {
        let sortedProperties = [];
        if (str === "category") {
            if (!order.category) {
                setOrder({ ...order, category: true });
                sortedProperties = filteredProperties.slice().sort((a, b) => {
                    return b.Type.localeCompare(a.Type); 
                });
            } else {
                setOrder({ ...order, category: false });
                sortedProperties = filteredProperties.slice().sort((a, b) => {
                    return a.Type.localeCompare(b.Type); 
                });
            }
        } else if (str === "owner") {
            if (!order.owner) {
                setOrder({ ...order, owner: true });
                sortedProperties = filteredProperties.slice().sort((a, b) => {
                    return b.owner.firstName.localeCompare(a.owner.firstName); 
                });
            } else {
                setOrder({ ...order, owner: false });
                sortedProperties = filteredProperties.slice().sort((a, b) => {
                    return a.owner.firstName.localeCompare(b.owner.firstName); 
                });
            }
        } else if (str === "title") {
            if (!order.title) {
                setOrder({ ...order, title: true });
                sortedProperties = filteredProperties.slice().sort((a, b) => {
                    return b.title.localeCompare(a.title); 
                });
            } else {
                setOrder({ ...order, title: false });
                sortedProperties = filteredProperties.slice().sort((a, b) => {
                    return a.title.localeCompare(b.title); 
                });
            }
        }else if (str === "city") {
            if (!order.city) {
                setOrder({ ...order, city: true });
                sortedProperties = filteredProperties.slice().sort((a, b) => {
                    return b.city.localeCompare(a.city); 
                });
            } else {
                setOrder({ ...order, city: false });
                sortedProperties = filteredProperties.slice().sort((a, b) => {
                    return a.city.localeCompare(b.city); 
                });
            }
        }else if (str === "createdAt") {
            sortedProperties = filteredProperties.slice().sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                if (!order.createdAt) {
                    return dateB - dateA; 
                } else {
                    return dateA - dateB; 
                }
            });
            if (!order.createdAt) {
                setOrder({ ...order, createdAt: true });
            } else {
                setOrder({ ...order, createdAt: false });
            }
        }

        // else if (str === "nbrRents") {
        //     if (!order.city) {
        //         setOrder({ ...order, city: true });
        //         sortedProperties = filteredProperties.slice().sort((a, b) => {
        //             return b.city.localeCompare(a.city); 
        //         });
        //     } else {
        //         setOrder({ ...order, city: false });
        //         sortedProperties = filteredProperties.slice().sort((a, b) => {
        //             return a.city.localeCompare(b.city); 
        //         });
        //     }
        // }else if (str === "rating") {
        //     if (!order.rating) {
        //         setOrder({ ...order, rating: true });
        //         sortedProperties = filteredProperties.slice().sort((a, b) => {
        //             return b.rating.localeCompare(a.rating); 
        //         });
        //     } else {
        //         setOrder({ ...order, rating: false });
        //         sortedProperties = filteredProperties.slice().sort((a, b) => {
        //             return a.rating.localeCompare(b.rating); 
        //         });
        //     }
        // }

        setFilteredProperties(sortedProperties);
    };

    // useEffect(()=>{
    //     setDate(null);
    //     filterProps();
    //     if(filter === "custom"){
           
    //         if(selectedCity !== null){
    //             const newsProperties = filteredProperties.filter(property => {
    //                 return (property.city.toLowerCase().includes(selectedCity.toLowerCase()) );
    //             });
    //             setFilteredProperties(newsProperties);
    //             return ;
    //         }else{
    //             setFilteredProperties(properties);
    //         }
    //     }
    // },[filter]);

    // useEffect(() => { 
    //     filterProps();
    //     if(selectedCity !== null){
    //         filterBycity();
    //     }
    // },[date]);
    // useEffect(() => { 
    //     if(selectedCity !== null){
    //         filterBycity();
    //     }
    //     setDate(null);
    // },[selectedCity]);
    // useEffect(() => { 
        
    // },[filteredProperties]);
    const filterByOwner = (id) =>{
      const  filtered = properties.filter(property => property.owner._id === id);
      setFilteredProperties(filtered);
    }
    useEffect(() => {
        filterProps();
    }, [filter, date, selectedCity, selectedType]);
    
  return (
    <div className='flex w-full'>
    {
        actualTicket == null ? 
            <div className="flex flex-col w-full">
                <div className={`flex items-center pt-12 pb-5 w-full mr-3  ${(filter === "custom") ? "justify-between" : "justify-end"}`}>
                    {  
                        filter === "custom" &&
                        <div className='mr-3'>
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
                    }
                    <div  className='mr-3'>
                        <select name="city" id="" onChange={handleSelectChange} value={selectedCity}>
                            <option value="null">choose city</option>
                            <option value="agadir">agadir</option>
                            <option value="casa">casa</option>
                        </select>
                    </div>
                    <div  className='mr-3'>
                        <select name="type" id="" onChange={handleTypeChange} value={selectedType}>
                            <option value="null">choose a Type</option>
                            <option value="villa">villa</option>
                            <option value="appertement">appertement</option>
                        </select>
                    </div>
                    <div className='w-24 mr-3'>
                        <DropdownMenu >
                            <DropdownMenuTrigger asChild >
                                <div className='flex items-center text-[#222222] rounded-3xl border-2 border-[#dbd9d9] py-0 px-2 lg:py-1 '>
                                    <p className='text-sm'>filter by</p> 
                                    <ChevronDown color='#222222' size={18}/>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 bg-white">
                                <DropdownMenuRadioGroup value={filter} onValueChange={setFilter}>
                                <DropdownMenuRadioItem value="all">all</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="today">today</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="lastw">last week</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="lastm">last month</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="custom">custem range</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
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
                                                <input 
                                                    id="checkbox-all" 
                                                    type="checkbox" 
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300"
                                                    checked={selectedProperties.length === filteredProperties.length && selectedProperties !== 0 }
                                                    onChange={checkAll}
                                                />
                                                <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                                            </div>
                                        </th>
                                        <th className="py-3 px-6 text-sm font-small  text-gray-700">
                                            <div className='flex items-center cursor-pointer' onClick={()=>filterPropertiesByOrder("title")}> 
                                                <p className='mr-2 text-[#ffffff] '>title </p> 
                                                <ChevronsUpDown size={18} color='#ffffff' />
                                            </div>
                                        </th>
                                        <th className="py-3 px-6 text-sm font-small  text-gray-700">
                                            <div className='flex items-center cursor-pointer' onClick={()=>filterPropertiesByOrder("category")}> 
                                                <p className='mr-2 text-[#ffffff] '>category</p> 
                                                <ChevronsUpDown size={18} color='#ffffff' />
                                            </div>
                                        </th>
                                        <th className="py-3 px-6 text-sm font-small  text-left text-gray-700">
                                            <div className='flex items-center cursor-pointer' onClick={()=>filterPropertiesByOrder("owner")}> 
                                                <p className='mr-2 text-[#ffffff] '>owner</p> 
                                                <ChevronsUpDown size={18} color='#ffffff' />
                                            </div>
                                        </th>
                                        <th className="py-3 px-6 text-sm font-small  text-left text-gray-700">
                                            <div className='flex items-center cursor-pointer' onClick={()=>filterPropertiesByOrder("city")}> 
                                                <p className='mr-2 text-[#ffffff]' >city</p> 
                                                <ChevronsUpDown size={18} color='#ffffff' />
                                            </div>
                                        </th>
                                        <th className="py-3 px-6 text-sm font-small  text-left text-gray-700">
                                            <div className='flex items-center cursor-pointer' onClick={()=>filterPropertiesByOrder("status")}> 
                                                <p className='mr-2 text-[#ffffff]' >rented times</p> 
                                                <ChevronsUpDown size={18} color='#ffffff' />
                                            </div>
                                        </th>
                                        <th className="py-3 px-6 text-sm font-small  text-left text-gray-700">
                                            <div className='flex items-center cursor-pointer' onClick={()=>filterPropertiesByOrder("status")}> 
                                                <p className='mr-2 text-[#ffffff]' >rating</p> 
                                                <ChevronsUpDown size={18} color='#ffffff' />
                                            </div>
                                        </th>
                                        <th className="py-3 px-6 text-sm font-small  text-left text-gray-700">
                                            <div className='flex items-center cursor-pointer' onClick={()=>filterPropertiesByOrder("createdAt")} > 
                                                <p className='mr-2 text-[#ffffff] '>listed at</p> 
                                                <ChevronsUpDown size={18} color='#ffffff' />
                                            </div>
                                        </th>
                                        <th className="p-4">
                                        <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white   dark:bg-gray-800 dark:divide-gray-700">
                                {filteredProperties?.map(problem => (
                                    <tr className="hover:bg-[#cfcce6] dark:hover:bg-gray-700   w-24 max-h-32 " key={problem._id}>
                                        <td className="p-3 w-4">
                                            <div className="flex items-center">
                                                <input
                                                id="checkbox-table-1" 
                                                type="checkbox" 
                                                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300"
                                                checked={selectedProperties.includes(problem._id)} 
                                                onChange={() => handleCheckboxChange(problem._id)} 
                                                />
                                                <label htmlFor="checkbox-table-1" className="sr-only"></label>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{problem.title}</td>
                                        <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white"> {problem.Type}</td>
                                        <td className="py-3 px-6 text-sm font-medium text-gray-500  ">{problem.owner.firstName}</td>
                                        <td className="py-3 px-6 text-sm font-medium text-gray-500  ">{problem.city}</td>
                                        <td className="py-3 px-6 text-sm font-medium text-gray-500  ">20 </td>
                                        <td className="py-3 px-6 text-sm font-medium text-gray-500  ">4.9</td>
                                        
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
                                            <DropdownMenuItem className="p-0" >
                                            <div className='w-full h-full rounded hover:bg-slate-200 py-2 px-3 text-md cursor-pointer' onClick={()=>filterByOwner(problem.owner._id)}>
                                            view all properties of {problem.owner.firstName}
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




