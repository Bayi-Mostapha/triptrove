import { useState } from "react";
import { cn } from "@/lib/utils"
import { addDays, differenceInDays, format, startOfDay } from "date-fns"
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

function Booking({ place, disabledDates, maxInfants, maxPets }) {
    // date range 
    const [date, setDate] = useState({
        from: startOfDay(new Date()),
        to: addDays(startOfDay(new Date()), 1),
    });
    const nNights = differenceInDays(date.to, date.from)
    const isDateDisabled = date => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return disabledDates.some(disabledDate =>
            new Date(date).toDateString() === disabledDate.toDateString()
        ) || new Date(date) < today;
    };
    // guests input 
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);
    const [pets, setPets] = useState(0);

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
        <div className="px-3 py-5 shadow-md rounded bg-[#FDFDFD]">
            <h3 className="text-xl font-medium">{place.price} MAD/Per Night</h3>
            <h4 className="mt-3">Check-in, check-out days</h4>
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
                adults={adults} setAdults={setAdults} maxAdults={place.guests}
                children={children} setChildren={setChildren}
                infants={infants} setInfants={setInfants} maxInfants={maxInfants}
                pets={pets} setPets={setPets} maxPets={maxPets}
            />

            <Button
                className="mt-5 mb-7 w-full p-2 bg-primary rounded-md font-semibold text-white"
                onClick={handleSubmit}
            >
                Reserve
            </Button>

            <div className="flex justify-between items-center text-sm font-thin">
                <p>{place.price} MAD  * {nNights} nights</p>
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

            <div className="my-5 bg-gray-200 w-full h-[1px]"></div>

            <div className="flex justify-between items-center text-xl">
                <p className="font-meduium">Total</p>
                <p className="font-thin">46790 MAD</p>
            </div>
        </div>
    );
}

export default Booking;