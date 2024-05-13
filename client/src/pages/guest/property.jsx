import { useState } from "react";
import { cn } from "@/lib/utils"
import { addDays, format, startOfDay } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "react-toastify";
import GeustsInput from "@/components/guest/property-reservation/guests-input";

function Property() {
    // date range 
    const [date, setDate] = useState({
        from: startOfDay(new Date()),
        to: addDays(startOfDay(new Date()), 1),
    });
    const disabledDates = [new Date('2024-05-15'), new Date('2024-05-20')];
    const isDateDisabled = date => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return disabledDates.some(disabledDate =>
            new Date(date).toDateString() === disabledDate.toDateString()
        ) || new Date(date) < today;
    };
    // guests input 
    const [adults, setAdults] = useState(1);
    const maxAdults = 12;
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);
    const maxInfants = 5;
    const [pets, setPets] = useState(0);
    const maxPets = 3;

    const handleSubmit = () => {
        let isDisabledDateSelected = false;
        let currentDate = new Date(date.from);
        const toDate = new Date(date.to);

        while (currentDate <= toDate) {
            if (isDateDisabled(currentDate)) {
                isDisabledDateSelected = true;
                break;
            }
            currentDate = addDays(currentDate, 1);
        }

        if (isDisabledDateSelected) {
            toast.error('You have selected a disabled date within the range.')
        } else {
            console.log(adults, children, infants, pets);
        }
    };

    return (
        <>
            <div className="w-[400px] px-4 py-2 shadow-md rounded">
                <h3 className="text-xl font-medium">9,228MAD / Per Night</h3>
                <h4 className="mt-3">Check in and check out</h4>
                <div className="grid gap-2">
                    <Popover>
                        <PopoverTrigger asChild className="mt-1 mx-auto">
                            <Button
                                id="date"
                                variant={"outline"}
                                className={cn(
                                    "w-fit justify-start text-left font-normal",
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
                                disabled={isDateDisabled}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <GeustsInput
                    adults={adults} setAdults={setAdults} maxAdults={maxAdults}
                    children={children} setChildren={setChildren}
                    infants={infants} setInfants={setInfants} maxInfants={maxInfants}
                    pets={pets} setPets={setPets} maxPets={maxPets}
                />
                <Button
                    className="mt-4 mb-3 w-full p-2 bg-primary rounded-md font-medium text-white"
                    onClick={handleSubmit}
                >
                    Reserve
                </Button>
                <div className="flex justify-between items-center text-sm font-thin">
                    <p>9228 MAD  * 5 nights</p>
                    <p>46140 MAD</p>
                </div>
                <div className="mt-1 flex justify-between items-center text-sm font-thin">
                    <p>Cleaning fee</p>
                    <p>500 MAD</p>
                </div>
                <div className="mt-1 flex justify-between items-center text-sm font-thin">
                    <p>Service fee</p>
                    <p>150 MAD</p>
                </div>
                <div className="my-3 bg-gray-200 w-full h-[1px]"></div>
                <div className="flex justify-between items-center text-xl">
                    <p className="font-meduium">Total</p>
                    <p className="font-thin">46790 MAD</p>
                </div>
            </div>
        </>
    );
}

export default Property;