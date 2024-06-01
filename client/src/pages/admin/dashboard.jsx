import React , { useState, useEffect , useContext } from 'react'
import {
   Ellipsis ,
   Wallet   ,
   ChevronDown,
   CalendarDays ,
   MessageSquareWarning  ,
   UserRoundPlus ,
   Megaphone ,
   Home ,
   Users ,
   } from 'lucide-react';
   import {
    Avatar ,
    AvatarFallback ,
    AvatarImage ,
  } from "@/components/ui/avatar"
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
  import {Example1} from "./pieChart";
  import { Example } from "./subscribersChart";
  import { ReserChart } from "./reservationChart";
  import { RevChart } from "./revenueChart";
  import { addDays, format } from "date-fns"

  import { cn } from "@/lib/utils"
  import { Calendar } from "@/components/ui/calendar"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  import { authContext } from "../../contexts/AuthWrapper"

import { axiosClient } from '../../api/axios'; 



export default function Dashboard() {


  const [date, setDate] = useState({});
  
  const [ filter1, setFilter1 ] = useState("lastw");
  const [ filter2, setFilter2 ] = useState("lastw");
  const [notifications, setNotifications] = useState([]);
  const userContext = useContext(authContext)


  const [subsRevenue, setSubsRevenue] = useState([]);
  const [feesRevenue, setFeesRevenue] = useState([]);
  const [properties, setProperties] = useState([]);
  const [users, setUsers] = useState([]);
  const [data, setData] = useState(null);
  const [subscribers, setSubscribers] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [reportP, setReportP] = useState([]);
  const [reportR, setReportR] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [revenue, setRevenue] = useState([])
  const [filteredSubsRevenue, setFilteredSubsRevenue] = useState(0);
  const [filteredSubscribers, setFilteredSubscribers] = useState([]);
  const [filteredRevenue, setFilteredRevenue] = useState([]);
  const [filteredFeesRevenue, setFilteredFeesRevenue] = useState(0);
  const [filteredProperties, setFilteredProperties] = useState(0);
  const [filteredUsers, setFilteredUsers] = useState(0);
  const [filteredTickets, setFilteredTickets] = useState(0);
  const [filteredReportP, setFilteredReportP] = useState(0);
  const [filteredReportR, setFilteredReportR] = useState(0);

  const getSubsRevenue = async () => {
    try {
        const response = await axiosClient.get('/admin/get-dashboard-data');
        setSubsRevenue(response.data.subscriptions);
        setProperties(response.data.properties);
        setUsers(response.data.users);
        setTickets(response.data.tickets);
        setReportP(response.data.reportsProp);
        setReportR(response.data.reportsReview);
        setReservations(response.data.reservations)
        setRevenue(response.data.revenue)
        setFeesRevenue(response.data.feesRev)
        processUserRoles(response.data.users);
     
    } catch (error) {
        console.log(error)
        console.error('something went wrong when getting revenue data');
    }
    const today = new Date(); 
    today.setHours(0,0,0,0);
    setDate({ from: today, to: today });
    filterStats();
};
const processUserRoles = (users) => {
  let hostCount = 0;
  let guestCount = 0;
  let freeCount = 0;
  let premiumCount = 0;
  let businessCount = 0;

  

  users.forEach(user => {
    if (user.role === 'host') {
      hostCount++;
    } else if (user.role === 'guest') {
      guestCount++;
    }
  });
  const updatedData = [
    { name: 'host', value: hostCount },
    { name: 'guest', value: guestCount },
  ];
  setData([...updatedData]);
  
  
  users.forEach(subscription => {
    switch (subscription.subscriptionType) { 
      case 'free':
        freeCount++;
        break;
      case 'premium':
        premiumCount++;
        break;
      case 'business':
        businessCount++;
        break;
      default:
        break;
    }
  });

let subscribersCount = [
  { name: 'free', value: freeCount },
  { name: 'premium', value: premiumCount },
  { name: 'business', value: businessCount },
];
  setSubscribers([...subscribersCount]);
};


 useEffect(()=>{
   getSubsRevenue();
   
 },[])

 
 const filterStats = () => {
  const today = new Date(); 
 
  if(date && date.from !== undefined  && date.to !== undefined){
    let filtered = [];
    filtered = properties.filter(problem => {
        const joinDate = new Date(problem.createdAt);
        const startDate = new Date(date.from);
        const endDate = new Date(date.to);
        return joinDate >= startDate && joinDate <= endDate ;
    });
    setFilteredProperties(filtered.length);


    filtered = users.filter(problem => {
      const joinDate = new Date(problem.createdAt);
      const startDate = new Date(date.from);
      const endDate = new Date(date.to);
      return joinDate >= startDate && joinDate <= endDate ;
    });
    setFilteredUsers(filtered.length);

    filtered = tickets.filter(problem => {
      const joinDate = new Date(problem.createdAt);
      const startDate = new Date(date.from);
      const endDate = new Date(date.to);
      return joinDate >= startDate && joinDate <= endDate ;
    });
    setFilteredTickets(filtered.length);

    filtered = reportP.filter(problem => {
      const joinDate = new Date(problem.createdAt);
      const startDate = new Date(date.from);
      const endDate = new Date(date.to);
      return joinDate >= startDate && joinDate <= endDate ;
    });
    setFilteredReportP(filtered.length);

    filtered = reportR.filter(problem => {
      const joinDate = new Date(problem.createdAt);
      const startDate = new Date(date.from);
      const endDate = new Date(date.to);
      return joinDate >= startDate && joinDate <= endDate ;
    });
    setFilteredReportR(filtered.length);
     
    filtered = subsRevenue.filter(problem => {
      const joinDate = new Date(problem.createdAt);
      const startDate = new Date(date.from);
      const endDate = new Date(date.to);
      return joinDate >= startDate && joinDate <= endDate ;
    });
    setFilteredSubscribers(filtered)
    const totalSubsRevenue = filtered.reduce((sum, item) => sum + item.price, 0);
    setFilteredSubsRevenue(totalSubsRevenue);
    
    filtered = feesRevenue.filter(problem => {
      const joinDate = new Date(problem.createdAt);
      const startDate = new Date(date.from);
      const endDate = new Date(date.to);
      return joinDate >= startDate && joinDate <= endDate ;
    });
    const totalSubsRevenue1 = filtered.reduce((sum, item) => sum + item.price, 0);
    setFilteredFeesRevenue(totalSubsRevenue1)
   
  }
}
useEffect(()=>{
  filterStats();
  console.log(date)
 },[date])
 const [ filteredReservations, setFilteredReservations] = useState([])

 const filterBookings = (str) => {
  const today = new Date(); 
  let filtered = reservations.slice();
  switch (str) {
      case "lastw":
          const startOfLastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
           filtered = filtered.filter(problem => {
              const joinDate = new Date(problem.name);
              return joinDate >= startOfLastWeek && joinDate <= today;
          });
          break;
      case "lastm":
          const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
          const endOfLastMonth = new Date(startOfLastMonth.getFullYear(), startOfLastMonth.getMonth() + 1 , 1);
           filtered = filtered.filter(problem => {
              const joinDate = new Date(problem.name);
              return joinDate >= startOfLastMonth && joinDate <= endOfLastMonth;
          });
          break;
      case "lasty":
          const startOfLastYear = new Date(today.getFullYear()-1, today.getMonth() , 1);
          const endOfLastYear = new Date(startOfLastYear.getFullYear(), startOfLastYear.getMonth() + 1 , 1);
           filtered = filtered.filter(problem => {
              const joinDate = new Date(problem.name);
              return joinDate >= startOfLastYear && joinDate <= endOfLastYear;
          });
          break;
      default:
          break;
  }
  setFilteredReservations(filtered);
}

useEffect(()=>{
   if(filter1 !== "null" && reservations.length !== 0){
    filterBookings(filter1)
   }
},[filter1,reservations])
const filterRevenue = (str) => {
  const today = new Date(); 
  let filtered = revenue.slice();
  switch (str) {
      case "lastw":
          const startOfLastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
           filtered = filtered.filter(problem => {
              const joinDate = new Date(problem.name);
              return joinDate >= startOfLastWeek && joinDate <= today;
          });
          break;
      case "lastm":
          const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
          const endOfLastMonth = new Date(startOfLastMonth.getFullYear(), startOfLastMonth.getMonth() + 1 , 1);
           filtered = filtered.filter(problem => {
              const joinDate = new Date(problem.name);
              return joinDate >= startOfLastMonth && joinDate <= endOfLastMonth;
          });
          break;
      case "lasty":
          const startOfLastYear = new Date(today.getFullYear()-1, today.getMonth() , 1);
          const endOfLastYear = new Date(startOfLastYear.getFullYear(), startOfLastYear.getMonth() + 1 , 1);
           filtered = filtered.filter(problem => {
              const joinDate = new Date(problem.name);
              return joinDate >= startOfLastYear && joinDate <= endOfLastYear;
          });
          break;
      default:
          break;
  }
  setFilteredRevenue(filtered);
}
useEffect(()=>{
   if(filter2 !== "null" && reservations.length !== 0){
    filterRevenue(filter2)
   }
},[filter2,revenue])

  return (
    <div className='bg-[#f8f7ff79]  px-5 pt-16 pl-24 p-3 pr-5'>
      <div className='flex justify-between items-center pt-10 pb-8 px-5'>
       <div className='flex justify-start items-center '>
        <h4 className='text-4xl font-medium'>Hi, Welcome Back </h4>
          <img src="/assets/waving-hand.svg" alt="" className='w-10 ml-3'/>
       </div>
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

     
<div className="flex items-start gap-3">
<div className="basis-2/3 flex flex-col gap-3">
    <div className=' grid grid-cols-1 sm:grid-cols-3  gap-6 '>

    <div className="p-3 py-5 rounded-xl flex items-center  border-[2px] border-gray-100 bg-[#7065F0] text-white">
      <div className='flex items-center '>
        <div className='bg-[#f6f5f8] rounded-xl p-3'><Wallet   color='#7065F0' size={35}/></div>
      </div>
      <div className='flex items-center  gap-2'>
        <div className='flex flex-col ml-3 '> 
            <p className='text-2xl font-medium  '>{filteredSubsRevenue + filteredFeesRevenue}</p>
            <p className='text-ld text-gray-200 font-small'>Revenue</p>
        </div>
      </div>
    </div>

    <div className="p-3 py-5 rounded-xl flex items-center  border-[2px] border-gray-100 bg-white">
      <div className='flex items-center '>
        <div className='bg-[#f6f5f8] rounded-xl p-3'><MessageSquareWarning   color='#7065F0' size={35}/></div>
      </div>
      <div className='flex items-center  gap-2'>
        <div className='flex flex-col ml-3 '> 
            <p className='text-3xl font-medium  '>{filteredTickets}</p>
            <p className='text-ld text-gray-400 font-small'>Tickets</p>
        </div>
      </div>
    </div>
    <div className="p-3 py-5 rounded-xl flex items-center  border-[2px] border-gray-100 bg-white">
      <div className='flex items-center '>
        <div className='bg-[#f6f5f8] rounded-xl p-3'><Megaphone   color='#7065F0' size={35}/></div>
      </div>
      <div className='flex items-center  gap-2'>
        <div className='flex flex-col ml-3 '> 
            <p className='text-3xl font-medium  '>{filteredReportP + filteredReportR}</p>
            <p className='text-ld text-gray-400 font-small'>Reports</p>
        </div>
      </div>
    </div>
    <div className="p-3 py-5 rounded-xl flex items-center  border-[2px] border-gray-100 bg-white">
      <div className='flex items-center '>
        <div className='bg-[#f6f5f8] rounded-xl p-3'><Users   color='#7065F0' size={35}/></div>
      </div>
      <div className='flex items-center  gap-2'>
        <div className='flex flex-col ml-3 '> 
            <p className='text-3xl font-medium  '>{filteredUsers}</p>
            <p className='text-ld text-gray-400 font-small'>New Users</p>
        </div>
      </div>
    </div>
    <div className="p-3 py-5 rounded-xl flex items-center  border-[2px] border-gray-100 bg-white">
      <div className='flex items-center '>
        <div className='bg-[#f6f5f8] rounded-xl p-3'><UserRoundPlus   color='#7065F0' size={35}/></div>
      </div>
      <div className='flex items-center  gap-2'>
        <div className='flex flex-col ml-3 '> 
            <p className='text-3xl font-medium  '>{filteredSubscribers.length != 0 ? filteredSubscribers.length: 0 }</p>
            <p className='text-ld text-gray-400 font-small'>New Subscribers</p>
        </div>
      </div>
    </div>
    <div className="p-3 py-5 rounded-xl flex items-center  border-[2px] border-gray-100 bg-white">
      <div className='flex items-center '>
        <div className='bg-[#f6f5f8] rounded-xl p-3'><Home   color='#7065F0' size={35}/></div>
      </div>
      <div className='flex items-center  gap-2'>
        <div className='flex flex-col ml-3 '> 
            <p className='text-3xl font-medium  '>{filteredProperties}</p>
            <p className='text-ld text-gray-400 font-small'>New Properties</p>
        </div>
      </div>
    </div>
    </div>
    
    
  <div className='p-5 rounded-xl border-[2px] border-gray-100 w-full flex-col flex bg-white'>
  <div className='flex items-center justify-between py-3 px-3 pb-8'>
    <h3 className='text-2xl font-medium text-[#141414]'>reservation:</h3>
    <div className='w-24 mr-3'>
      <DropdownMenu >
          <DropdownMenuTrigger asChild >
              <div className='flex items-center gap-2 text-[#222222] rounded border-2 border-[#dbd9d9]  pl-4 lg:py-2 pr-0 '>
                  <p className='text-sm'>filter</p> 
                  <ChevronDown color='#222222' size={18}/>
              </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-36 bg-white">
              <DropdownMenuRadioGroup value={filter1} onValueChange={setFilter1}>
              <DropdownMenuRadioItem value="lastw" selected>last week</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="lastm">last month</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="lasty">last year</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
          </DropdownMenuContent>
      </DropdownMenu>
      </div>
  </div>
 <div className="flex items-center ">
  <div className='flex items-center justify-center basis-1/1 w-full h-72 '>
      <ReserChart data01={filteredReservations} />
    </div>
   
 </div>
  </div> 
  <div className='basis-2/3 p-5 rounded-xl border-[2px] border-gray-100 w-full flex-col flex bg-white'>
  <div className='flex items-center justify-between py-3 px-3 pb-8'>
    <h3 className='text-2xl font-medium text-[#141414]'>revenue:</h3>
    <div className='w-24 mr-3'>
      <DropdownMenu >
          <DropdownMenuTrigger asChild >
              <div className='flex items-center gap-2 text-[#222222] rounded border-2 border-[#dbd9d9]  pl-4 lg:py-2 pr-0 '>
                  <p className='text-sm'>filter</p> 
                  <ChevronDown color='#222222' size={18}/>
              </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-36 bg-white">
              <DropdownMenuRadioGroup value={filter2} onValueChange={setFilter2}>
              <DropdownMenuRadioItem value="lastw">last weeks</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="lastm">last month</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="lasty">last year</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
          </DropdownMenuContent>
      </DropdownMenu>
      </div>
  </div>
 <div className="flex items-center ">
  <div className='flex items-center justify-center basis-1/1 w-full h-72 '>
      <RevChart data01={filteredRevenue}/>
    </div>
   
 </div>
  </div> 
</div>

<div className="basis-1/3 flex flex-col gap-3">
      <div className=' px-5 py-2 rounded-xl  border-[2px] border-gray-100   w-full flex-col flex bg-white'>
        <div>
        <h3 className='text-2xl font-medium text-[#141414] mt-2'>Users:</h3>
        </div>
      <div className="flex items-center ">
        <div className='flex items-center justify-center basis-1/1 w-2/3 h-64 '>
       <Example data01={data} />
        
          </div>
          <div className='flex flex-col  gap-5'>
            <div className='flex items-center '> 
                <div className="w-4 h-4 rounded-full bg-[#92DE8C] "></div>
                <p className='ml-1 text-sm font-medium'>Host</p>
            </div>
            <div className='flex items-center '> 
                <div className="w-4 h-4 rounded-full bg-[#5AB4FE] "></div>
                <p className='ml-1 text-sm font-medium'>Guest</p>
            </div>
          </div>
      </div>
        </div> 
        <div className='basis-1/3 p-5 rounded-xl border-[2px] border-gray-100 w-full flex-col flex bg-white'>
  <div>
    <h3 className='text-2xl font-medium text-[#141414] mt-2'>Subscribers:</h3>
  </div>
 <div className="flex items-center ">
  <div className='flex items-center justify-center basis-1/1 w-2/3 h-64 '>
      <Example1 data01={subscribers}/>
    </div>
    <div className='flex flex-col  gap-5'>
      <div className='flex items-center '> 
          <div className="w-4 h-4 rounded-full bg-[#0088FE] "></div>
          <p className='ml-1 text-sm font-medium'>Free</p>
      </div>
      <div className='flex items-center '> 
          <div className="w-4 h-4 rounded-full bg-[#00C49F] "></div>
          <p className='ml-1 text-sm font-medium'>Premium</p>
      </div>
      <div className='flex items-center '> 
          <div className="w-4 h-4 rounded-full bg-[#FFBB28] "></div>
          <p className='ml-1 text-sm font-medium'>Business</p>
      </div>
    </div>
 </div>
  </div>
  <div className='basis-1/3 p-5 rounded-xl border-[2px] border-gray-100 w-full flex-col flex bg-white'>
  <div>
    <h3 className='text-2xl font-medium text-[#141414] mt-2'>Last transaction:</h3>
  </div>
 <div className="flex items-center ">
 <table className="min-w-full divide-y divide-gray-200  ">
                    <thead className="">
                        <tr> 
                            <th className="py-3  text-sm font-small  text-gray-700">
                               <div className='flex items-center cursor-pointer'> 
                                    <p className='mr-2  text-center'>user</p> 
                                </div>
                            </th>
                            <th className="py-3  text-sm font-small  text-gray-700">
                               <div className='flex items-center cursor-pointer'> 
                                    <p className='mr-2  '>purpose</p> 
                                </div>
                            </th>
                            <th className="py-3  text-sm font-small  text-gray-700">
                               <div className='flex items-center cursor-pointer'> 
                                    <p className='mr-2  '>amount</p> 
                                </div>
                            </th>
                          </tr>
                      </thead>
                      <tbody className="bg-white   dark:bg-gray-800 dark:divide-gray-700">
                       <tr>
                       <td className="py-3  text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center justify-start gap-2">
                            <Avatar className="w-10 h-10 cursor-pointer">
                                <AvatarImage   alt="@shadcn"  />
                                <AvatarFallback className="bg-[#e0eb4c]">{"R"}</AvatarFallback>
                            </Avatar>
                            <p>reda gggh</p>
                       </td>
                       <td className="py-3  text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">premium</td>
        
                       <td className="py-3  text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">$100</td>
                       </tr>
                       <tr>
                       <td className="py-3  text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center justify-start gap-2">
                            <Avatar className="w-10 h-10 cursor-pointer">
                                <AvatarImage   alt="@shadcn"  />
                                <AvatarFallback className="bg-[#e0eb4c]">{"R"}</AvatarFallback>
                            </Avatar>
                            <p>reda gggh</p>
                       </td>
                       <td className="py-3  text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">premium</td>
        
                       <td className="py-3  text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">$100</td>
                       </tr>
                       <tr>
                       <td className="py-3  text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center justify-start gap-2">
                            <Avatar className="w-10 h-10 cursor-pointer">
                                <AvatarImage   alt="@shadcn"  />
                                <AvatarFallback className="bg-[#e0eb4c]">{"R"}</AvatarFallback>
                            </Avatar>
                            <p>reda gggh</p>
                       </td>
                       <td className="py-3  text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">premium</td>
        
                       <td className="py-3  text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">$100</td>
                       </tr>
                       <tr>
                       <td className="py-3  text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center justify-start gap-2">
                            <Avatar className="w-10 h-10 cursor-pointer">
                                <AvatarImage   alt="@shadcn"  />
                                <AvatarFallback className="bg-[#e0eb4c]">{"R"}</AvatarFallback>
                            </Avatar>
                            <p>reda gggh</p>
                       </td>
                       <td className="py-3  text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">premium</td>
        
                       <td className="py-3  text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">$100</td>
                       </tr>
                      </tbody>
</table>
 </div>
  </div>
</div>
</div>




          </div>
         
   

    
  )
}


 