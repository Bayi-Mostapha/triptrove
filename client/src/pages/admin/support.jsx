import React, { useState, useEffect, useContext } from 'react'
import { authContext } from "@/contexts/AuthWrapper";
 import { 
    ArrowDownUp,
    CalendarDays,
    ChevronDown,
    EllipsisVertical ,
    MessageSquareWarning  ,
    ArrowLeft , 
    Trash2,
    SquareX  ,
X,
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
    const [ messages, setMessages] = useState([]);
    const [ actualTicket, setActualTicket] = useState(null);
    const [filteredProblems, setFilteredProblems] = useState([]);
    const [selectedProblems, setSelectedProblems] = useState([]);
   

    const checkAll = () => {
        if (selectedProblems.length === filteredProblems.length) {
            setSelectedProblems([]);
        } else {
            const allTicketsId = filteredProblems.map(elem => elem._id);
            setSelectedProblems(allTicketsId);
        }
    };
    
    // const handleInputChange = (e, field) => {
    //     const value = e.target.value;
    //     setData({ ...data, [field]: value });
    // };
  
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
 
    const handleSetTicket = (id) => {
        problems.forEach(pro => {
            if(pro._id === id){
                setActualTicket(pro);
                setMessages(pro.messages);
            }
        });
    }

    const handleCheckboxChange = (ticketId) => {
        setSelectedProblems(prevSelectedProblems => {
            if (prevSelectedProblems.includes(ticketId)) {
                return prevSelectedProblems.filter(id => id !== ticketId);
            } else {
                return [...prevSelectedProblems, ticketId];
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
   
    const [ filter, setFilter ] = useState();
    const [date, setDate] = useState();
    const [order, setOrder] = useState({
        category: false ,
        title: false,
        createdAt: false,
        status: false,
        email: false,
    });
    
    const filterTicketByDate = () => {
        const today = new Date(); 
        if(date && date.from !== undefined  && date.to !== undefined){
            const newTickets = problems.filter(problem => {
                const joinDate = new Date(problem.createdAt);
                const startDate = new Date(date.from);
                const endDate = new Date(date.to);
                return joinDate >= startDate && joinDate <= endDate ;
            });
            setFilteredProblems(newTickets);
            return ;
        }
        switch (filter) {
            case "all":
                setFilteredProblems(problems);
                break;
            case "today":
                const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
                const todayTickets = problems.filter(problem => {
                    const joinDate = new Date(problem.createdAt);
                    return joinDate >= startOfToday && joinDate < endOfToday;
                });
                setFilteredProblems(todayTickets);
                break;
            case "lastw":
                const endOfLastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
                const startOfLastWeek = new Date(endOfLastWeek.getFullYear(), endOfLastWeek.getMonth(), endOfLastWeek.getDate() - endOfLastWeek.getDay());
                const lastWeekTickets = problems.filter(problem => {
                    const joinDate = new Date(problem.createdAt);
                    return joinDate >= startOfLastWeek && joinDate < endOfLastWeek;
                });
                setFilteredProblems(lastWeekTickets);
                break;
            case "lastm":
                const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
                const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
                const lastMonthTickets = problems.filter(problem => {
                    const joinDate = new Date(problem.createdAt);
                    return joinDate >= startOfLastMonth && joinDate <= endOfLastMonth;
                });
                setFilteredProblems(lastMonthTickets);
                break;
            default:
                break;
        }
    }
    const filterTicketsByOrder = (str) => {
        let sortedTickets = [];
        if (str === "category") {
            if (!order.category) {
                setOrder({ ...order, category: true });
                sortedTickets = filteredProblems.slice().sort((a, b) => {
                    return b.category.localeCompare(a.category); 
                });
            } else {
                setOrder({ ...order, category: false });
                sortedTickets = filteredProblems.slice().sort((a, b) => {
                    return a.category.localeCompare(b.category); 
                });
            }
        } else if (str === "email") {
            if (!order.email) {
                setOrder({ ...order, email: true });
                sortedTickets = filteredProblems.slice().sort((a, b) => {
                    return b.user.email.localeCompare(a.user.email); 
                });
            } else {
                setOrder({ ...order, email: false });
                sortedTickets = filteredProblems.slice().sort((a, b) => {
                    return a.user.email.localeCompare(b.user.email); 
                });
            }
        } else if (str === "title") {
            if (!order.title) {
                setOrder({ ...order, title: true });
                sortedTickets = filteredProblems.slice().sort((a, b) => {
                    return b.title.localeCompare(a.title); 
                });
            } else {
                setOrder({ ...order, title: false });
                sortedTickets = filteredProblems.slice().sort((a, b) => {
                    return a.title.localeCompare(b.title); 
                });
            }
        }else if (str === "createdAt") {
            sortedTickets = filteredProblems.slice().sort((a, b) => {
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
        setFilteredProblems(sortedTickets);
    };

    useEffect(()=>{
        setDate(null);
        filterTicketByDate();
        if(filter === "custom"){
            setFilteredProblems(problems);
        }
    },[filter]);

    useEffect(() => { 
        filterTicketByDate();
    },[date]);
    const [probDelete , setProbDelete] = useState(null)
    const [open, setOpen] = useState(false)
    const deleteProbHandle = async (ProblemIds) => {
        try {
            console.log(ProblemIds)
            const response = await axiosClient.delete('/problem', {
                data: { ProblemIds } 
            });
             return true;
        } catch (error) {
            console.log(error)
        }
    };
    const deleteProblemHandle = async (tickets) => { 
        const isDeleted = await deleteProbHandle(tickets); 
        if (isDeleted) {
            toast.success("ticket is deleted");
            getAllProblems(); 
            setSelectedProblems([]);
        } else {
            toast.error('Error deleting ticket');
        }
    };
    const [openD, setOpenD] = useState(false);
  return (
    <div className='flex w-full pt-16 pl-24 p-3 pr-5'>
    {
        actualTicket == null ? 
            <div className="flex flex-col w-full">
    <div className="flex w-full items-center justify-between pt-12">
        <h4 className='text-4xl font-semibold text-[#141414]'>Tickets</h4>
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
                <div className={`flex items-center pt-5 pb-5 w-full mr-3 justify-end gap-2`}>
                {  selectedProblems.length !== 0
            && 
            <div className='flex items-center justify-start mb-1 ml-3 mt-2'>
                <button className='cursor-pointer flex gap-3 items-center bg-red-50 rounded py-2 px-5 text-[#ff2f2f] font-semibold' onClick={()=>setOpen(true)}>
                    delete
                    <Trash2 color='#ff2f2f' size={20}/>
                </button>
                <Dialog open={open} onOpenChange={()=>{setOpen(false)}}>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                <DialogTitle>Are You sure ? </DialogTitle>
                                <DialogDescription>
                                    Are you sure , you wanna delete those tickets 
                                </DialogDescription>
                                </DialogHeader>
                                <DialogFooter className="sm:justify-start">
                                <DialogClose asChild>
                                    <div className='flex gap-4 w-full'>
                                    <button className="basis-1/2 border-black border-2 bg-white  rounded py-2">
                                                Close
                                        </button> 
                                        <button onClick={()=>{deleteProblemHandle(selectedProblems)}} className="basis-1/2 text-white bg-black rounded py-2 px-5 w-full">
                                                Confirm 
                                            </button>
                                    </div>
                                </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                </Dialog>
            </div>
        }
                <div className='w-24 mr-3'>
                        <DropdownMenu >
                            <DropdownMenuTrigger asChild >
                                <div className='flex items-center gap-2 text-[#222222] rounded border-2 border-[#dbd9d9]  pl-4 lg:py-2 pr-0 '>
                                    <p className='text-sm'>filter</p> 
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
                </div>
                <div className="overflow-x-auto  sm:rounded-lg">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden ">
                            <table className="min-w-full divide-y divide-gray-200  ">
                                <thead className="">
                                    <tr>
                                        <th className="p-4">
                                            <div className="flex items-center">
                                                <input 
                                                    id="checkbox-all" 
                                                    type="checkbox" 
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300"
                                                    checked={selectedProblems.length === filteredProblems.length && selectedProblems.length !== 0 }
                                                    onChange={checkAll}
                                                />
                                                <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                                            </div>
                                        </th>
                                        <th className="py-3 px-6 text-sm font-small  text-gray-700">
                                            <div className='flex items-center cursor-pointer' onClick={()=>filterTicketsByOrder("email")}> 
                                                <p className='mr-2  '>User </p> 
                                                <ArrowDownUp size={18} color='#000000' />
                                            </div>
                                        </th>
                                        <th className="py-3 px-6 text-sm font-small  text-gray-700">
                                            <div className='flex items-center cursor-pointer' onClick={()=>filterTicketsByOrder("category")}> 
                                                <p className='mr-2  '>category</p> 
                                                <ArrowDownUp size={18} color='#000000' />
                                            </div>
                                        </th>
                                        <th className="py-3 px-6 text-sm font-small  text-left text-gray-700">
                                            <div className='flex items-center cursor-pointer' onClick={()=>filterTicketsByOrder("title")}> 
                                                <p className='mr-2  '>title</p> 
                                                <ArrowDownUp size={18} color='#000000' />
                                            </div>
                                        </th>
                                        <th className="py-3 px-6 text-sm font-small  text-left text-gray-700">
                                            <div className='flex items-center cursor-pointer'> 
                                                <p className='mr-2 ' >status</p> 
                                            </div>
                                        </th>
                                        <th className="py-3 px-6 text-sm font-small  text-left text-gray-700">
                                            <div className='flex items-center cursor-pointer' onClick={()=>filterTicketsByOrder("createdAt")} > 
                                                <p className='mr-2  '>created at</p> 
                                                <ArrowDownUp size={18} color='#000000' />
                                            </div>
                                        </th>
                                        <th className="p-4">
                                        <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white   dark:bg-gray-800 dark:divide-gray-700">
                                {filteredProblems?.map(problem => (
                                    <tr className="hover:bg-[#f7f6f6]" key={problem._id}>
                                        <td className="p-4 w-4">
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
                                        <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <div className="flex items-center justify-start gap-1 ">
                                                <div>
                                                    <Avatar className="w-10 h-10 cursor-pointer">
                                                        <AvatarImage src={problem.user?.image?.url} alt="@shadcn"  />
                                                        <AvatarFallback className="bg-[#e0eb4c]">{problem.user?.firstName?.charAt(0).toUpperCase()}</AvatarFallback>
                                                    </Avatar>
                                                </div>
                                                <div>
                                                    <p className='text-md'>{problem.user?.email}</p>
                                                    <p className='text-xs text-gray-700'>{problem.user?.fullName}</p>
                                                </div>
                                            </div>
                                            </td>
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
                                            problem.status === "close" && 
                                            <DropdownMenuItem className="p-0" >
                                            <div className='w-full h-full rounded hover:bg-slate-200 py-2 px-3 text-md cursor-pointer' onClick={()=>{setOpenD(true); setProbDelete(problem._id);}} >
                                            delete
                                            </div>
                                            </DropdownMenuItem>
                                            }
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
                                        <Dialog open={openD} onOpenChange={()=>{setOpenD(false)}}>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                <DialogTitle>Are You sure ? </DialogTitle>
                                <DialogDescription>
                                    Are you sure , you wanna delete this ticket 
                                </DialogDescription>
                                </DialogHeader>
                                <DialogFooter className="sm:justify-start">
                                <DialogClose asChild>
                                    <div className='flex gap-4 w-full'>
                                    <button className="basis-1/2 border-black border-2 bg-white  rounded py-2">
                                                Close
                                        </button> 
                                        <button onClick={()=>{deleteProblemHandle([probDelete]) }} className="basis-1/2 text-white bg-black rounded py-2 px-5 w-full">
                                                Confirm 
                                            </button>
                                    </div>
                                </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            {
                                    filteredProblems.length === 0 && 
                                    <div className="flex items-center justify-center w-full min-h-80 ">
                                        <div className='flex items-center justify-center'>
                                            <MessageSquareWarning  size={50}  fontWeight={2} /> <p className='text-3xl ml-3 font-medium '>no Ticket found</p>
                                        </div>
                                    </div>
                                }
                        </div>
                    </div>
                    </div>
            </div>
:
    <div className='w-full pt-4'>
        <div className='pb-2  '>
           
        </div>
        <div className='flex flex-col rounded bg-[#faf8f8] w-full py-5 px-7 mb-4 min-h-screen relative pt-16'> 
        <div className='cursor-pointer absolute top-3 right-3 z-0' onClick={()=> setActualTicket(null)}>
                <X    size={30} />
            </div>
          <div className="flex item-center justify-between">
            <h3 className='text-3xl font-medium  mb-3 text-violet-950'><span className='text-5xl font-semibold'>Ticket:</span> {actualTicket.title}</h3>
            {
                actualTicket.status === "open" && 
                <button className='rounded py-1 px-4 bg-[#371250] text-white text-md' onClick={()=>{closeTicket(actualTicket._id)}}>Close ticket</button>
            }
            </div>
          <p className='text-sm text-gray-700 '><span className='font-semibold text-lg'>category    :</span> {actualTicket.category}</p>
          <p className='text-sm text-gray-700 '><span className='font-semibold text-lg'>description :</span> {actualTicket.description}</p>
          <p className='text-sm text-gray-700 '><span className='font-semibold text-lg'>Submitted By:</span>{actualTicket.user.fullName}</p>
          <p className='text-sm text-gray-700 '><span className='font-semibold text-lg'>Date        :</span> {actualTicket.createdAt}</p>
           <div className="border-b-[1px] border-[#e0e0e0] w-full mt-6"></div>
           <div className='flex flex-col gap-4 py-5  w-full '>
              {
                messages.map((msg, index)=>(
                <div className='flex flex-col' key={index}>
                    <p className='ml-3 text-lg font-medium text-[#7065F0] '>{(msg.senderRole === "admin" || msg.senderRole === "superAdmin")  ? "Admin" : actualTicket.user.firstName}:</p>
                    <p className='ml-4 text-md text-gray-600'>{msg.content }</p>
                </div>
                ))
              }
           </div>
            {
                actualTicket.status == "open"  &&
                <div className="w-full  p-3">
                    <div className='relative '>
                        <textarea  id="messageArea" onChange={(e)=>handleMessageChange(e)}  className="rounded w-full py-4 px-5 pr-24 outline-none border-[1px] border-gray-300 min-h-24" placeholder='answer ticket'></textarea>
                        <button className='absolute top-6 right-3 py-2 px-5 bg-[#7065F0] text-white rounded' onClick={submitMessage}>send</button>
                    </div>
                </div>
            }
        </div>
    </div>
    }
     </div>
  )
}




