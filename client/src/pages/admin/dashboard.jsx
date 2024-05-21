import React , { useState } from 'react'
import {
   Ellipsis ,
   DollarSign  ,
   BedDouble ,
   MessageSquareMore ,
   OctagonAlert  ,
   CalendarDays ,
   MessageSquareWarning  ,
   UserRoundPlus ,
   Megaphone ,
   Home ,
   Users ,
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
  import PieChart from "./pieChart";
  import SubsChart from "./subscribersChart";
  import ReserChart from "./reservationChart";
  import RevChart from "./revenueChart";
  import { addDays, format } from "date-fns"

  import { cn } from "@/lib/utils"
  import { Calendar } from "@/components/ui/calendar"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

export default function Dashboard() {
  const [date, setDate] = useState();
  return (
    <div className='bg-[#e2e0fa79]  px-5'>
      <div className='flex justify-between items-center pt-10 pb-8 px-5'>
       <div className='flex justify-start items-center '>
        <h4 className='text-4xl font-medium'>Hi, Welcome Back </h4>
          <img src="/assets/hand.png" alt="" className='w-10 ml-3'/>
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
        <div className='bg-[#f6f5f8] rounded-xl p-3'><DollarSign  color='#7065F0' size={35}/></div>
      </div>
      <div className='flex items-center  gap-2'>
        <div className='flex flex-col ml-3 '> 
            <p className='text-2xl font-medium  '>$455475</p>
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
            <p className='text-3xl font-medium  '>12</p>
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
            <p className='text-3xl font-medium  '>8</p>
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
            <p className='text-3xl font-medium  '>5</p>
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
            <p className='text-3xl font-medium  '>5</p>
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
            <p className='text-3xl font-medium  '>15</p>
            <p className='text-ld text-gray-400 font-small'>New Properties</p>
        </div>
      </div>
    </div>
    </div>
    
  <div className='p-5 rounded-xl border-[2px] border-gray-100 w-full flex-col flex bg-white'>
  <div>
    <h3 className='text-xl font-medium text-[#141414]'>reservation:</h3>
  </div>
 <div className="flex items-center ">
  <div className='flex items-center justify-center basis-1/1 w-full h-72 '>
      <ReserChart />
    </div>
   
 </div>
  </div> 
  <div className='basis-2/3 p-5 rounded-xl border-[2px] border-gray-100 w-full flex-col flex bg-white'>
  <div>
    <h3 className='text-xl font-medium text-[#141414]'>revenue:</h3>
  </div>
 <div className="flex items-center ">
  <div className='flex items-center justify-center basis-1/1 w-full h-72 '>
      <RevChart />
    </div>
   
 </div>
  </div> 
</div>

<div className="basis-1/3 flex flex-col gap-3">
      <div className=' px-5 py-2 rounded-xl  border-[2px] border-gray-100   w-full flex-col flex bg-white'>
        <div>
        <h3 className='text-xl font-medium text-[#141414]'>Users:</h3>
        </div>
      <div className="flex items-center ">
        <div className='flex items-center justify-center basis-1/1 w-2/3 h-64 '>
        <SubsChart />
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
    <h3 className='text-xl font-medium text-[#141414]'>Subscribers:</h3>
  </div>
 <div className="flex items-center ">
  <div className='flex items-center justify-center basis-1/1 w-2/3 h-72 '>
      <PieChart />
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

</div>
</div>




          </div>
         
   

    
  )
}


 