import { useState } from "react";
import { cn } from "@/lib/utils"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

function Property() {
    const [date, setDate] = useState({
        from: new Date(2022, 0, 20),
        to: addDays(new Date(2022, 0, 20), 20),
    })

    const [adults, setAdults] = useState(1);
    const maxAdults = 12;
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);
    const [pets, setPets] = useState(0);

    function decrement(toInc) {
        switch (toInc) {
            case 'adults':
                setAdults(prev => {
                    if (prev > 1)
                        return prev - 1
                    return 1
                })
                break;
        }
    }
    function increment(toInc) {
        switch (toInc) {
            case 'adults':
                setAdults(prev => {
                    if (prev < maxAdults)
                        return prev + 1
                    return maxAdults
                })
                break;
        }
    }

    return (
        <>
            <div className="font-medium">Check in and check out</div>
            <div className="grid gap-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            id="date"
                            variant={"outline"}
                            className={cn(
                                "w-[300px] justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
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
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
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
            <div>
                <div className="font-medium">Guests</div>
                <Popover>
                    <PopoverTrigger className="border px-4 py-2 rounded text-sm">
                        {adults + children} Guest(s) {infants > 0 && `, ${infants} infant(s)`} {pets > 0 && `, ${pets} pet(s)`}
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-medium">Adults</p>
                                <p className="text-sm font-thin">Age +16</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button disabled={adults == 1} className="group w-8 h-8 flex justify-center items-center border rounded-full text-lg hover:bg-gray-50 disabled:border-gray-100 disabled:cursor-not-allowed transition-all" onClick={() => decrement('adults')}>
                                    <Minus className="stroke-gray-400 group-disabled:stroke-gray-300" size='14px' />
                                </button>
                                <div>{adults}</div>
                                <button disabled={adults == 12} className="group w-8 h-8 flex justify-center items-center border rounded-full text-lg hover:bg-gray-50 disabled:border-gray-100 disabled:cursor-not-allowed transition-all" onClick={() => increment('adults')}>
                                    <Plus className="stroke-gray-400 group-disabled:stroke-gray-300" size='14px' />
                                </button>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </>
    );
}

export default Property;