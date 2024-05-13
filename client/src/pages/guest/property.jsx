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
            <button onClick={handleSubmit}>submit</button>
        </>
    );
}

export default Property;