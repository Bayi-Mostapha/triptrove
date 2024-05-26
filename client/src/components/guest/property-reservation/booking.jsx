import { useContext, useState } from "react";
import { cn } from "@/lib/utils";
import { addDays, differenceInDays, format, startOfDay } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "react-toastify";
import GeustsInput from "@/components/guest/property-reservation/guests-input";
import { axiosClient } from "@/api/axios";
import { ExchangeRateContext } from "@/contexts/exchangeRatesWrapper";

function Booking({ place, disabledDates, maxInfants, maxPets }) {
    const { convert, selectedCurrency } = useContext(ExchangeRateContext)
    // date range 
    const [date, setDate] = useState({
        from: startOfDay(new Date()),
        to: addDays(startOfDay(new Date()), 5),
    });

    const nNights = date.to ? differenceInDays(date.to, date.from) : 0;

    const isDateDisabled = (date) => {
        const today = startOfDay(new Date());
        return disabledDates.some(disabledDate =>
            startOfDay(new Date(disabledDate)).getTime() === date.getTime()
        ) || date < today;
    };

    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);
    const [pets, setPets] = useState(0);

    const handleSubmit = async () => {
        let isDisabledDateSelected = false;
        let currentDate = date.from;
        const toDate = date.to;

        while (currentDate <= toDate) {
            if (isDateDisabled(currentDate)) {
                isDisabledDateSelected = true;
                break;
            }
            currentDate = addDays(currentDate, 1);
        }

        if (isDisabledDateSelected) {
            toast.error('You have selected a disabled date within the range.');
        } else {
            const data = {
                checkIn: addDays(date.from, 1),
                checkOut: addDays(date.to, 1)
            };

            try {
                const res = await axiosClient.post('/book/payment-session/' + place._id, data);
                window.location.href = res.data.url;
            } catch (error) {
                console.error(error);
                toast.error('Failed to create booking session. Please try again.');
            }
        }
    };

    return (
        <div className="h-fit md:px-3 md:py-5 md:shadow-md md:rounded md:bg-[#FDFDFD]">
            <h2 className="mb-2 text-2xl font-semibold md:hidden">Book it now!</h2>
            <h4 className="text-gray-500">
                <span className="text-xl font-medium text-primary">{convert(place.price)} {selectedCurrency}</span>/night
            </h4>
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
                            onSelect={(range) => setDate(range || { from: date.from, to: date.to })}
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
                pets={pets} setPets={setPets} maxPets={place.allowsPets ? maxPets : 0}
            />

            <Button
                className="mt-5 mb-7 w-full p-2 bg-primary rounded-md font-semibold text-white"
                onClick={handleSubmit}
            >
                Reserve
            </Button>

            <div className="flex justify-between items-center text-sm font-thin">
                <p>{convert(place.price)} {selectedCurrency}  * {nNights} nights</p>
                <p>{convert(place.price * nNights)} {selectedCurrency}</p>
            </div>
            <div className="mt-1 flex justify-between items-center text-sm font-thin">
                <p>Cleaning fee</p>
                <p>{convert(place.cleaningFees)} {selectedCurrency}</p>
            </div>

            <div className="my-5 bg-gray-200 w-full h-[1px]"></div>

            <div className="flex justify-between items-center text-xl">
                <p className="font-meduium">Total</p>
                <p>{convert((place.price * nNights + place.cleaningFees))} {selectedCurrency}</p>
            </div>
        </div>
    );
}

export default Booking;