import React, { useState, useEffect, useContext } from 'react'
import { authContext } from "@/contexts/AuthWrapper";
 import { 
    ArrowDownUp,
    CalendarDays,
    ChevronDown,
    Filter ,
    FilterX ,
    EllipsisVertical ,
    SquareArrowLeft, 
    Trash2,
    Building2,
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
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
  } from "@/components/ui/dialog"
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



const MoroccanCities = [
    'Casablanca',
    'Rabat',
    'Marrakech',
    'Fes',
    'Tangier',
    'Agadir',
    'Meknes',
    'Oujda',
    'Kenitra',
    'Tetouan',
    'Safi',
    'Khouribga',
    'Beni Mellal',
    'Mohammedia',
    'El Jadida',
    'Nador',
    'Khemisset',
    'Settat',
    'Larache',
    'Ksar El Kebir',
    'Guelmim',
    'Ouarzazate',
    'Al Hoceima',
    'Taza',
    'Errachidia',
    'Essaouira',
    'Berkane',
    'Inezgane',
    'Tiznit',
    'Sidi Kacem',
    'Taroudant'
  ];

  
export default function Properties() {
    const userContext = useContext(authContext);
    const [message, setMessage] = useState(null);
    const [properties, setproperties] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [selectedProperties, setSelectedProperties] = useState([]);
    const [ actualHost, setActualHost] = useState(null);
    const [ messages, setMessages] = useState([]);
    const [ filterComponents, setFilterComponents] = useState(false);
    const [open, setOpen] = useState(false)
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
            setLoading(true);
            const response = await axiosClient.get('/properties/get');
            setproperties(response.data);
            setFilteredProperties(response.data)
            console.log(response.data)
            setLoading(false);
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
            const response = await axiosClient.delete('/properties/admin', {
                data: { Ids } 
            });
            return true;
        } catch (error) {
            return false;
        }
    };

    const handleDelete = async (ids) =>{
        console.log(ids)
        const result = await deletePropHandle(ids);
        if(result){
            toast.success("propeties are deleted");
            getAllProperties();
            setSelectedProperties([]);
        }else{
            toast.error('Error deleting propeties');
        }
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

   

    const [ filter, setFilter ] = useState("filter by");
    const [date, setDate] = useState();
    const [order, setOrder] = useState({
        category: false ,
        title: false,
        createdAt: false,
        status: false,
        email: false,
        rentalCount: false,
    });
   const [ selectedCity , setSelectedCity ] = useState("null");
   const [ selectedType , setSelectedType ] = useState("null");
   const [ selectedOwner , setSelectedOwner ] = useState("null");
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
            case "today":
                setDate(null)
                const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
                 filtered = filtered.filter(problem => {
                    const joinDate = new Date(problem.createdAt);
                    return joinDate >= startOfToday && joinDate < endOfToday;
                });
               
                break;
            case "lastw":
                setDate(null)
                const startOfLastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
                 filtered = filtered.filter(problem => {
                    const joinDate = new Date(problem.createdAt);
                    return joinDate >= startOfLastWeek && joinDate < today;
                });
              
                break;
            case "lastm":
                setDate(null)
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
        if(date && date.from !== undefined  && date.to !== undefined){
            filtered = filtered.filter(problem => {
               const joinDate = new Date(problem.createdAt);
               const startDate = new Date(date.from);
               const endDate = new Date(date.to);
               return joinDate >= startDate && joinDate <= endDate ;
           });
       }
        if (selectedCity !== "null") {
            filtered = filtered.filter(property => property.city.toLowerCase().includes(selectedCity.toLowerCase()));
        }
        if (selectedType !== "null") {
            filtered = filtered.filter(property => property.Type === selectedType);
        }
        if (selectedOwner !== "null") {
            filtered = filtered.filter(property => property.owner._id === selectedOwner);
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
        }else if (str === "rentalCount") {
            if (!order.rentalCount) {
                setOrder({ ...order, rentalCount: true });
                sortedProperties = filteredProperties.slice().sort((a, b) => {
                    return b.rentalCount - a.rentalCount; 
                });
            } else {
                setOrder({ ...order, rentalCount: false });
                sortedProperties = filteredProperties.slice().sort((a, b) => {
                    return a.rentalCount - b.rentalCount; 
                });
            }
        }else if (str === "rating") {
            if (!order.rating) {
                setOrder({ ...order, rating: true });
                sortedProperties = filteredProperties.slice().sort((a, b) => {
                    return b.rating - a.rating; 
                });
            } else {
                setOrder({ ...order, rating: false });
                sortedProperties = filteredProperties.slice().sort((a, b) => {
                    return a.rating - b.rating; 
                });
            }
        }
        setFilteredProperties(sortedProperties);
    };



    
    const resetFilters = (id) =>{
        setFilterComponents(!filterComponents)
        setFilteredProperties(properties);
        setFilter("null");
        setSelectedCity('null');
        setSelectedType("null");
        setSelectedOwner("null");
        setDate(null);
        setActualHost(null);
    }
    
    useEffect(() => {
        filterProps();
    }, [filter, date, selectedCity, selectedType, selectedOwner]);
     
    const handleSetHost = (property) => {
        setActualHost(property.owner);
        const newProperties = properties.filter((elem) => {
            return elem.owner._id === property.owner._id;
        });
        setFilteredProperties(newProperties);
        setFilterComponents(!filterComponents)
    }
    
  return (
    <div className='flex flex-col w-full pt-16 pl-24 p-3 pr-5'>
       <div className="flex w-full items-center justify-between pt-12">
        <h4 className='text-4xl font-semibold text-[#141414]'>Properties</h4>
                        <div className='mr-3 '>
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
            <div className="flex flex-col w-full">
                <div className={`flex items-center pt-5 pb-5 w-full mr-3  ${(filterComponents) ? "justify-between" : "justify-end"}`}>
                {
                    filterComponents && 
                    <div className='flex items-center justify-end gap-2'>
                        <div  className='mr-3'>
                            <select
                                onChange={handleSelectChange} 
                                value={selectedCity} 
                                name="city"
                                className='h-10 w-full  max-w-xs rounded-md border border-[#D7E0ED] bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                            >
                                <option value="null" disabled >Select a city</option>
                                {MoroccanCities.map((city) => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                                ))}
                            </select>
                        </div>
                    </div>
                }
                <div className='flex items-center'>
                 {  selectedProperties.length !== 0
            && 
            <div className='flex items-center justify-end  mr-3 '>
                <button className='cursor-pointer flex gap-3 items-center bg-red-50 rounded py-[8px] px-5 text-[#ff2f2f] font-medium' onClick={()=>setOpen(true)}>
                    delete
                    <Trash2 color='#ff2f2f' size={20}/>
                </button>
                <Dialog open={open} onOpenChange={()=>{setOpen(false)}}>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                <DialogTitle>Are You sure ? </DialogTitle>
                                <DialogDescription>
                                    Are you sure , you wanna delete those proprties 
                                </DialogDescription>
                                </DialogHeader>
                                <DialogFooter className="sm:justify-start">
                                <DialogClose asChild>
                                    <div className='flex gap-4 w-full'>
                                    <button className="basis-1/2 border-black border-2 bg-white  rounded py-2">
                                                Close
                                        </button> 
                                        <button onClick={()=>{handleDelete(selectedProperties)}} className="basis-1/2 text-white bg-black rounded py-2 px-5 w-full">
                                                Confirm 
                                            </button>
                                    </div>
                                </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                </Dialog>
            </div>
        }
        
                    <div className='flex items-center '>
                    <div className='w-24 mr-3'>
                                            <DropdownMenu >
                                                <DropdownMenuTrigger asChild >
                                                    <div className='flex items-center gap-1 text-[#222222] rounded border-2 border-[#dbd9d9]  pl-4 lg:py-[8px] pr-0 '>
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
                                                    </DropdownMenuRadioGroup>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                        <div className="flex items-center justify-end mr-3">
                                        { !filterComponents && 
                                            <div className='cursor-pointer ml-3' onClick={()=>setFilterComponents(!filterComponents)}>
                                                <Filter size={20}/> 
                                            </div>
                                        }
                                        { filterComponents && 
                                            <div className='cursor-pointer ml-3' onClick={resetFilters}>      
                                                <FilterX  size={20}/> 
                                            </div>
                                        }
                                    </div>
                    </div>
                    </div>
                </div>
                
             
                <div className="overflow-x-auto  sm:rounded-lg">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden ">
                            <table className="min-w-full divide-y divide-gray-200  ">
                                <thead className=" ">
                                    <tr>
                                        <th className="p-4">
                                            <div className="flex items-center">
                                                <input 
                                                    id="checkbox-all" 
                                                    type="checkbox" 
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300"
                                                    checked={selectedProperties.length === filteredProperties.length && selectedProperties.length !== 0 }
                                                    onChange={checkAll}
                                                />
                                                <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                                            </div>
                                        </th>
                                        <th className="py-3 px-6 text-sm font-small  text-gray-700">
                                            <div className='flex items-center cursor-pointer' onClick={()=>filterPropertiesByOrder("title")}> 
                                                <p className='mr-2  '>title </p> 
                                                <ArrowDownUp size={18} color='#000000' />
                                            </div>
                                        </th>
                                        <th className="py-3 px-6 text-sm font-small  text-left text-gray-700">
                                            <div className='flex items-center cursor-pointer' onClick={()=>filterPropertiesByOrder("owner")}> 
                                                <p className='mr-2  '>owner</p> 
                                                <ArrowDownUp size={18} color='#000000' />
                                            </div>
                                        </th>
                                        <th className="py-3 px-6 text-sm font-small  text-left text-gray-700">
                                            <div className='flex items-center cursor-pointer' onClick={()=>filterPropertiesByOrder("city")}> 
                                                <p className='mr-2 ' >city</p> 
                                                <ArrowDownUp size={18} color='#000000' />
                                            </div>
                                        </th>
                                        <th className="py-3 px-6 text-sm font-small  text-left text-gray-700">
                                            <div className='flex items-center cursor-pointer justify-center' onClick={()=>filterPropertiesByOrder("rentalCount")}> 
                                                <p className='mr-2 ' >rented times</p> 
                                                <ArrowDownUp size={18} color='#000000' />
                                            </div>
                                        </th>
                                        <th className="py-3 px-6 text-sm font-small  text-left text-gray-700">
                                            <div className='flex items-center cursor-pointer justify-center' onClick={()=>filterPropertiesByOrder("rating")}> 
                                                <p className='mr-2 ' >rating</p> 
                                                <ArrowDownUp size={18} color='#000000' />
                                            </div>
                                        </th>
                                        <th className="py-3 px-6 text-sm font-small  text-left text-gray-700">
                                            <div className='flex items-center cursor-pointer' onClick={()=>filterPropertiesByOrder("createdAt")} > 
                                                <p className='mr-2  '>listed at</p> 
                                                <ArrowDownUp size={18} color='#000000' />
                                            </div>
                                        </th>
                                        <th className="p-4">
                                        <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white   dark:bg-gray-800 dark:divide-gray-700">
                                {filteredProperties?.map(problem => (
                                    <tr className="hover:bg-[#f7f6f6]  w-24 max-h-32 " key={problem._id}>
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
                                        <td className="py-3 px-6 text-sm font-medium text-gray-500  ">{problem.owner.fullName}</td>
                                        <td className="py-3 px-6 text-sm font-medium text-gray-500  ">{problem.city}</td>
                                        <td className="py-3 px-6 text-sm font-medium text-gray-500 text-center">{problem.rentalCount}</td>
                                        <td className="py-3 px-6 text-sm font-medium text-gray-500 text-center">{problem.rating}</td>
                                        <td className="py-3 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">{problem.createdAt}</td>
                                        <td 
                                            className="py-3  text-sm font-medium text-right whitespace-nowrap cursor-pointer pr-12"
                                            >
                                            <DropdownMenu >
                                            <DropdownMenuTrigger asChild >
                                            <EllipsisVertical />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-42 bg-white">
                                           {
                                            actualHost == null &&
                                            <DropdownMenuItem className="p-0" >
                                            <div className='w-full h-full rounded hover:bg-slate-200 py-2 px-3 text-md cursor-pointer' onClick={()=>handleSetHost(problem)}>
                                            view all properties of {problem.owner.fullName}
                                            </div>
                                            </DropdownMenuItem>
                                           }
                                            <DropdownMenuItem className="p-0" >
                                            <div className='w-full h-full rounded hover:bg-slate-200 py-2 px-3 text-md cursor-pointer' onClick={()=>handleDelete([problem._id])}>
                                            delete property
                                            </div>
                                            </DropdownMenuItem>
            
                                            </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            {
                                (filteredProperties.length === 0 && !loading) &&
                                <div className="flex items-center justify-center w-full min-h-80 ">
                                    <div className='flex items-end justify-center'>
                                        <Building2 size={50}  fontWeight={2} /> <p className='text-3xl ml-3 font-medium '>no properties found</p>
                                    </div>
                                </div>
                            }
                            {
                                loading &&
                                <div className='flex items-center justify-center h-96 w-full'>
                                <div role="status">
                                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#7065F0]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                            }
                        </div>
                    </div>
                    </div>
            </div>
     </div>
  )
}




